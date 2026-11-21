import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'
import { fetchProfile } from '../../api/auth'
import styles from './Profile.module.css'

const CRMProfile = () => {
  const { user, isAuthenticated, loading, logout } = useAuth()
  const [profile, setProfile] = useState(null)
  const [profileLoading, setProfileLoading] = useState(false)

  useEffect(() => {
    if (isAuthenticated && !profile) {
      loadProfile()
    }
  }, [isAuthenticated, profile])

  const loadProfile = async () => {
    setProfileLoading(true)
    try {
      const data = await fetchProfile()
      setProfile(data)
    } catch (err) {
      console.error('Failed to load profile:', err)
    } finally {
      setProfileLoading(false)
    }
  }

  if (loading || (!isAuthenticated && !user)) {
    return null
  }

  return (
    <div className={styles.crm}>
      <div className={styles.container}>
        <header className={styles.pageHeader}>
          <h1>CRM Панель</h1>
          <button
            className={styles.logoutBtn}
            onClick={logout}
          >
            Выход
          </button>
        </header>

        <div className={styles.profileCard}>
          <div className={styles.profileAvatar}>
            <span style={{ fontSize: '4rem' }}>👤</span>
          </div>
          <h2 className={styles.profileName}>
            {profile?.name || user?.name || 'Пользователь'}
          </h2>
          <p className={styles.profileEmail}>
            {profile?.email || user?.email || 'Email не указан'}
          </p>
          <div className={styles.profileInfo}>
            <p><strong>Роль:</strong> {profile?.role || 'Клиент'}</p>
            <p><strong>Статус:</strong> Активен</p>
          </div>
        </div>

        <div className={styles.crmStats}>
          <div className={styles.statCard}>
            <h3>Заказов всего</h3>
            <p className={styles.statValue}>—</p>
          </div>
          <div className={styles.statCard}>
            <h3>Бронирований</h3>
            <p className={styles.statValue}>—</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CRMProfile