const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const commentsByPostId = {};

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex');

  const { content } = req.body;

  comments = commentsByPostId[req.params.id] || [];

  const newComment = { id: commentId, content, status: 'pending' };

  comments.push(newComment);

  commentsByPostId[req.params.id] = comments;

  const event = {
    type: 'CommentCreated',
    data: { ...newComment, postId: req.params.id },
  }

  await axios.post('http://localhost:4005/events', event);

  res.status(201).send(comments)
});

app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  if (type === 'CommentModerated') {

    const comment = commentsByPostId[data.postId].find(({ id }) => id === data.id);

    comment.status = data.status;

    const event = {
      type: 'CommentUpdated',
      data: { ...comment, postId: data.postId }
    }

    await axios.post('http://localhost:4005/events', event);
  }

  res.send({});
});

app.listen(4001, () => {
  console.log('Listen on 4001')
})