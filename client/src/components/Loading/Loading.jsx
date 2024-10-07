import React from 'react';
import { BarLoader } from 'react-spinners';
import './Loading.scss';

const Loading = () => {
  return (
    <div className="loading">
            <img src='./img/loading.png' alt='store'/>
      <BarLoader size={20} color={"black"} loading={true} />
    </div>
  );
};

export default Loading;
