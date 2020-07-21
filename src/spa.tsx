import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './Counter';

function DynamicView() {
  return (
    <>
      <hr />
      <Counter />
    </>
  );
}

ReactDOM.render(DynamicView(), document.getElementById('spa-dynamic-view'));
