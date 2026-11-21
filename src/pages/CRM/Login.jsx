import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import Button from '../../components/common/Button/Button'
import styles from './Login.module.css'

const CRMLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      await login(formData.email, formData.password)
      navigate('/crm')
    } catch (err) {
      setError(err.message || 'Неверный email или пароль')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={styles.login}>
      <div className={styles.container}>
        <div className={styles.loginCard}>
          <div className={styles.loginHeader}>
            <h1>Вход в CRM</h1>
            <p>Панель управления рестораном MAISON</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label>Email <span>*</span></label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="user@example.com"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Пароль <span>*</span></label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
              />
            </div>

            <Button
              variant="primary"
              size="lg"
              disabled={submitting}
              type="submit"
            >
              {submitting ? 'Вход...' : 'Войти'}
            </Button>
          </form>

          {error && (
            <div className={styles.errorMsg}>{error}</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CRMLogin