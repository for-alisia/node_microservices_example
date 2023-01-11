import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    const { data } = await axios.get(`http://localhost:4001/posts/${postId}/comments`);

    setComments(data);
  };

  useEffect(() => {
    fetchComments();
  }, []);
  
  return (
    <div>
      <ul>
        { comments.map(({ id, content }) => (
          <li key={id}>
            {content}
          </li>
        ))}
      </ul>
    </div>
  )
};

export default CommentList;