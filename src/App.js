import React from 'react';
import ReactDOM from 'react-dom';
import './App.css'

const title = 'My Minimal React Webpack Babel Setup';

ReactDOM.render(
  <h1>{title}</h1>,
  document.getElementById('root')
);

module.hot.accept();