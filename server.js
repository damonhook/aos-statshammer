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

app.listen(port, () => console.log(`Listening on port ${port}`));
