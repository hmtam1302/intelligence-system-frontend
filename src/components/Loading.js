import React from 'react';
import '../assets/scss/Loading.scss';

const Loading = () => {
  return <div id='wrapper'>
    <div id='loading'>
      <div className='bulletouter'>
        <div className='bulletinner'></div>
        <div className='mask'></div>
        <div className='dot'></div>
      </div>
      <p>loading!</p>
    </div>
  </div>;
};

export default Loading;