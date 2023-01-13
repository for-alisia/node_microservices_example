const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const posts = {}

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  console.log(type);

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


  res.send({});
});

app.listen(4002, () => {
  console.log('Listening on 4002')
})