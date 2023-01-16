import React, { useState } from 'react';
import axios from 'axios';

const CommentCreate = ({ postId }) => {
  const [comment, setComment] = useState('');

  const onCommentChange = (e) => {
    setComment(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    await axios.post(`http://posts.com/posts/${postId}/comments`, { content: comment });

    setComment('');
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className='form-group' style={{marginBottom: '8px'}}>
          <label>Comment</label>
          <input className='form-control' value={comment} onChange={onCommentChange}/>
        </div>
        <button type='submit' className='btn btn-primary'>Submit</button>
      </form>
    </div>
  )
};

export default CommentCreate;