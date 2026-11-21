import React from 'react'
import styles from './EmptyState.module.css'

const EmptyState = ({ title, message, icon }) => {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>{icon || '🍽️'}</div>
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  )
}

export default EmptyState