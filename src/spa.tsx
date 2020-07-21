import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './Counter';

function DynamicView1() {
  return (
    <>
      <Counter />
    </>
  );
}

function DynamicView2() {
  return (
    <>
      <p>Dynamic View 2</p>
    </>
  );
}

const componentsMap = {
  spaDynamicView1: DynamicView1,
  spaDynamicView2: DynamicView2,
};

// render
document.querySelectorAll('div[data-spa-render]').forEach((e) => {
  const key = (e as HTMLElement).dataset.spaRender;

  if (key && componentsMap[key]) {
    ReactDOM.render(componentsMap[key](), e);
  }
});
