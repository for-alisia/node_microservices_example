const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const posts = {};

const updatePostsWithEvent = (type, data) => {
  if (type === 'PostCreated') {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    posts[data.postId].comments.push(data);
  }

  if (type === 'CommentUpdated') {
    const commentIdx = posts[data.postId].comments.findIndex(({ id }) => id === data.id);

    posts[data.postId].comments[commentIdx] = data;
  }
}

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  updatePostsWithEvent(type, data);

  res.send({});
});

app.listen(4002, async () => {
  console.log('Listening on 4002');

  try {
    const { data } = await axios.get('http://event-bus-srv:4005/events');

    data.forEach(({ type, data }) => {
      updatePostsWithEvent(type, data);
    });

  } catch(err) {
    console.log(err);
  }  
});