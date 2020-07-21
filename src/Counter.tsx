import React, { useState } from 'react';
import styles from './Counter.module.scss';

function Counter(): JSX.Element {
  const [count, setCount] = useState(0);

  return (
    <div className={styles.row}>
      <span className={styles.label}>
        {' '}
        Count:
        {' '}
        {count}
      </span>
      <button
        type="button"
        className={styles.btn}
        onClick={() => setCount(count - 1)}
      >
        -1
      </button>
      <button
        type="button"
        className={styles.btn}
        onClick={() => setCount(count + 1)}
      >
        +1
      </button>
    </div>
  );
}

export default Counter;
