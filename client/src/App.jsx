import React from 'react';
import PostCreate from './PostCreate';
import PostList from './PostList';

const App = () => {
  return (
    <div className='container'>
      <div>
        <h1>Create post</h1>
        <PostCreate />
      </div>
      <hr />
      <div>
        <PostList />
      </div>
    </div>
  );
};

export default App;