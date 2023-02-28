const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morganMiddleware = require('./middelware/logger');
const { authenticateUser } = require('./services/user');
const { registerUser } = require('./services/register');

require('dotenv').config({ path: path.join(__dirname, '.env') });

const port = 3002;
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(morganMiddleware);
app.get('/health', (req, res) => (res.send({
  message: 'ok',
})));

app.post('/user', async (req, res) => (res.send({
  message: await authenticateUser(
    req.body.email,
    req.body.password,
  ),
})));

app.post('/register', async (req, res) => (res.send({
  message: await registerUser(
    req.body.firstname,
    req.body.lastname,
    req.body.country,
    req.body.city,
    req.body.phone,
    req.body.email,
    req.body.password,
  ),
})));

const server = app.listen(port, () => {
  console.log(`THM App running on port ${port}.`);
});

module.exports = server;
