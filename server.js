import express from 'express';
import bodyParser from 'body-parser';

import { getModifiers } from './api/controllers/modifiersController';
import { compareUnits } from "./api/controllers/statsController";


const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/modifiers', (req, res) => {
  res.send({ modifiers: getModifiers() });
});

app.post('/api/compare', (req, res) => {
  res.send(compareUnits(req.body));
})

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
    
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
