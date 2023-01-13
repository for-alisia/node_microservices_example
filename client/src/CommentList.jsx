import React from 'react';

const CommentList = ({ comments }) => {
  return (
    <div>
      <ul>
        { comments.map(({ id, content, status }) => (
          <li key={id}>
            {status === 'pending' && 'Comment is waiting for approval'}
            {status === 'approved' && content}
            {status === 'rejected' && 'Comment was rejected'}
          </li>
        ))}
      </ul>
    </div>
  )
};

export default CommentList;