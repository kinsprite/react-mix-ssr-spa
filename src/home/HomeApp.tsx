import React from 'react';
import {
  Link,
} from 'react-router-dom';

import LoginAsTester from './LoginAsTester';

import logo from './logo.svg';
import styles from './HomeApp.module.css';

function HomeApp(): JSX.Element {
  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <LoginAsTester />
        <img src={logo} className={styles.AppLogo} alt="logo" />
        <p>
          <code>React Micro Frontends @ 2020</code>
        </p>
        <ul>
          <li>
            <Link to="/home" className={styles.AppLink}>Home</Link>
          </li>
          <li>
            <Link to="/app-example" className={styles.AppLink}>App Example</Link>
          </li>
          <li>
            <Link to="/app-example/sub" className={styles.AppLink}>{'App Example\'s Sub'}</Link>
          </li>
          <li>
            <Link to="/sub-at-root" className={styles.AppLink}>Sub at Root</Link>
          </li>
        </ul>
        <div id="spa-dynamic-view" />
      </header>
      <footer className={styles.AppFooter}>
        <a
          className={styles.FooterLink}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <a
          className={styles.FooterLink}
          href="https://qinzhiqiang.cn"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Micro Frontends
        </a>
      </footer>
    </div>
  );
}

export default HomeApp;
