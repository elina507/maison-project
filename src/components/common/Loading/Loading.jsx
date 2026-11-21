import React from 'react'
import styles from './Loading.module.css'

const Loading = ({ message = 'Загрузка...' }) => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
      <p className={styles.message}>{message}</p>
    </div>
  )
}

export default Loading