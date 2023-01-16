const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.post('/posts/create', async (req, res) => {
  const id = randomBytes(4).toString('hex');

  const { title } = req.body;

  posts[id] = { id, title };

  const event = {
    type: 'PostCreated',
    data: { id, title }
  }

  await axios.post('http://event-bus-srv:4005/events', event);

  res.status(201);
  res.send(posts[id]);
});

app.post('/events', (req, res) => {
  console.log('Received Event', req.body.type);

  res.send({});
});

app.listen(4000, () => {
  console.log('Posts service: listening on 4000!')
});