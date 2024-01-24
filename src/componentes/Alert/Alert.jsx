import React from 'react';
import styles from './Alert.module.css';

const Alert = ({ message }) => {
  return (
    <div className={styles.container}>
    <div className={styles.alert}>
      <p>⛔ {message}</p>
    </div>
    </div>
  );
};

export default Alert;