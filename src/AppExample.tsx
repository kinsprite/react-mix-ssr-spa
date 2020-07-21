import React from 'react';
import {
  NavLink,
} from 'react-router-dom';

function AppExample(): JSX.Element {
  return (
    <>
      <ul>
        <li>
          <NavLink to="/home">Home</NavLink>
        </li>
        <li>
          <NavLink to="/app-example">App Example</NavLink>
        </li>
      </ul>
      <p>App Example</p>
      <div data-spa-render="spaDynamicView1" />
      <div data-spa-render="spaDynamicView2" />
    </>
  );
}

export default AppExample;
