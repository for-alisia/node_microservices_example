import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

const PostList = () => {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () =>  {
    const { data } = await axios.get('http://localhost:4000/posts');

    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <h2 style={{textAlign: 'center'}}>Posts</h2>
      <ul style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        { Object.values(posts).map(({ title, id }) => (
          <li key={id} className='card' style={{ width: '45%', margin: '16px', padding: '16px' }}>
            <h5>{title}</h5>
            <div>
              <h6>Comments</h6>
              <CommentList postId={id} />
              <CommentCreate postId={id} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
};

export default PostList;