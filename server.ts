import 'core-js/stable';
import 'regenerator-runtime/runtime';

import bodyParser from 'body-parser';
import cluster from 'cluster';
import compression from 'compression';
import express, { Response } from 'express';
import os from 'os';
import path from 'path';

import { getModifiers, getTargetModifiers } from './api/controllers/modifiersController';
import { compareUnits, simulateUnits, simulateUnitsForSave } from './api/controllers/statsController';

function addHeaders(res: Response, production = false) {
  if (production) {
    res.set('X-Worker-ID', String(cluster.worker.id));
  }
}

function appServer(production = false) {
  const app = express();
  const port = process.env.PORT || 5000;

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(compression());

  app.get('/status', (req, res) => {
    addHeaders(res, production);
    res.send({ status: 'ok' });
  });

  app.get('/api/modifiers', (req, res) => {
    addHeaders(res, production);
    res.send({ modifiers: getModifiers() });
  });

  app.get('/api/target/modifiers', (req, res) => {
    addHeaders(res, production);
    res.send({ modifiers: getTargetModifiers() });
  });

  app.post('/api/compare', (req, res) => {
    addHeaders(res, production);
    res.send(compareUnits(req.body));
  });

  app.post('/api/simulate', (req, res) => {
    addHeaders(res, production);
    res.send(simulateUnits(req.body));
  });

  app.post('/api/simulate/save', (req, res) => {
    addHeaders(res, production);
    res.send(simulateUnitsForSave(req.body));
  });

  let logMessage = `Listening on port ${port}`;

  if (production) {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));

    // Handle React routing, return all requests to React app
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });

    logMessage = `Worker ${cluster.worker.id}, ${logMessage}`;
  }

  app.listen(port, () => console.log(logMessage));
}

const prod = process.env.NODE_ENV === 'production';
if (prod) {
  if (cluster.isMaster) {
    let numWorkers = 3;
    if (prod) {
      numWorkers = os.cpus().length;
    }
    console.log(`Spawning ${numWorkers} workers ${prod ? 'in production mode' : ''}`);
    // Create a worker for each CPU
    for (let i = 0; i < numWorkers; i += 1) {
      cluster.fork();
    }
  } else {
    appServer(prod);
  }
  cluster.on('exit', worker => {
    // Replace the dead worker, we're not sentimental
    console.log(`Worker ${worker.id} died :(`);
    cluster.fork();
  });
} else {
  appServer(prod);
}
