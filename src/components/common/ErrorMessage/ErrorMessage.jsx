import React from 'react'
import styles from './ErrorMessage.module.css'

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>⚠</div>
      <h3>Ошибка</h3>
      <p>{message}</p>
      {onRetry && (
        <button className={styles.retryBtn} onClick={onRetry}>
          Попробовать снова
        </button>
      )}
    </div>
  )
}

export default ErrorMessage