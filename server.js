import 'core-js/stable';
import 'regenerator-runtime/runtime';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import cluster from 'cluster';
import os from 'os';
import compression from 'compression';

import { getModifiers } from './api/controllers/modifiersController';
import { compareUnits, simulateUnits, simulateUnitsForSave } from './api/controllers/statsController';

if (cluster.isMaster) {
  const numWorkers = os.cpus().length;
  const prod = process.env.NODE_ENV === 'production';
  console.log(`Spawning ${numWorkers} workers ${prod ? 'in production mode' : ''}`);
  // Create a worker for each CPU
  for (let i = 0; i < numWorkers; i += 1) {
    cluster.fork();
  }
} else {
  const app = express();
  const port = process.env.PORT || 5000;

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(compression());

  app.get('/status', (req, res) => {
    res.set('X-Worker-ID', cluster.worker.id);
    res.send({ status: 'ok' });
  });

  app.get('/api/modifiers', (req, res) => {
    res.set('X-Worker-ID', cluster.worker.id);
    res.send({ modifiers: getModifiers() });
  });

  app.post('/api/compare', (req, res) => {
    res.set('X-Worker-ID', cluster.worker.id);
    res.send(compareUnits(req.body));
  });

  app.post('/api/simulate', (req, res) => {
    res.set('X-Worker-ID', cluster.worker.id);
    res.send(simulateUnits(req.body));
  });

  app.post('/api/simulate/save', (req, res) => {
    res.set('X-Worker-ID', cluster.worker.id);
    res.send(simulateUnitsForSave(req.body));
  });

  if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));

    // Handle React routing, return all requests to React app
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
  }

  app.listen(port, () => console.log(`Worker ${cluster.worker.id}, Listening on port ${port}`));
}

cluster.on('exit', (worker) => {
  // Replace the dead worker,
  // we're not sentimental
  console.log(`Worker ${worker.id} died :(`);
  cluster.fork();
});
