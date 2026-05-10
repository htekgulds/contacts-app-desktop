const express = require('express');
const cors = require('cors');
const data = require('./data.json');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get('/api/data', (req, res) => {
  res.json(data);
});

app.get('/api/personnel', (req, res) => {
  res.json(data.personnel);
});

app.get('/api/departments', (req, res) => {
  res.json(data.departments);
});

app.get('/api/useful-numbers', (req, res) => {
  res.json(data.useful_numbers);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});