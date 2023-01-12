import React from 'react';

const CommentList = ({ comments }) => {
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