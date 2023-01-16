import React, { useState } from 'react';
import axios from 'axios';

const PostCreate = () => {
  const [title, setTitle] = useState('');

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    await axios.post('http://posts.com/posts', { title });

    setTitle('');
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group" style={{ marginBottom: '8px' }}>
          <label>Title</label>
          <input className="form-control" value={title} onChange={onTitleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
};

export default PostCreate;