import React, { useState } from 'react'
import { createBooking } from '../../api/bookings'
import Loading from '../../components/common/Loading/Loading'
import EmptyState from '../../components/common/EmptyState/EmptyState'
import Button from '../../components/common/Button/Button'
import styles from './Booking.module.css'

const Booking = () => {
  const [formData, setFormData] = useState({
    guest_name: '',
    phone: '',
    date: '',
    time: '',
    guests: '1',
    comment: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const bookingData = {
        guest_name: formData.guest_name,
        phone: formData.phone,
        date: formData.date,
        time: formData.time,
        guests: parseInt(formData.guests, 10),
        comment: formData.comment || null,
      }
      await createBooking(bookingData)
      setSuccess(true)
    } catch (err) {
      setError(err.message || 'Не удалось создать бронирование')
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className={styles.booking}>
        <div className={styles.container}>
          <div className={styles.successCard}>
            <div className={styles.successIcon}>✅</div>
            <h2>Бронирование подтверждено!</h2>
            <p>
              Спасибо, {formData.guest_name}. Ваш стол забронирован на
              {formData.date} в {formData.time} на
              {formData.guests} гостей.
            </p>
            <Button variant="primary" onClick={() => setSuccess(false)}>
              Создать новое бронирование
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.booking}>
      <div className={styles.container}>
        <header className={styles.pageHeader}>
          <h1>Бронирование стола</h1>
          <p>Зарезервируйте столик в нашем ресторане</p>
        </header>

        <div className={styles.bookingImage}>
          <div className={styles.imagePlaceholder}>
            <span style={{ fontSize: '5rem' }}>🍽️</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Имя <span>*</span></label>
              <input
                type="text"
                name="guest_name"
                value={formData.guest_name}
                onChange={handleChange}
                required
                placeholder="Иван Иванов"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Телефон <span>*</span></label>
              <input
                type="tel"
                name="phone"
                value={formData.customer_phone}
                onChange={handleChange}
                required
                placeholder="+7 (999) 123-45-67"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Дата <span>*</span></label>
              <input
                type="date"
                name="date"
                value={formData.booking_date}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Время <span>*</span></label>
              <input
                type="time"
                name="time"
                value={formData.booking_time}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Количество гостей <span>*</span></label>
              <select
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                required
              >
                <option value="1">1 гость</option>
                <option value="2">2 гостя</option>
                <option value="3">3 гостя</option>
                <option value="4">4 гостя</option>
                <option value="5">5 гостей</option>
                <option value="6">6 гостей</option>
                <option value="8">8 гостей</option>
                <option value="10">10 гостей</option>
              </select>
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label>Комментарий</label>
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                rows={3}
                placeholder="Пожелания по столику, праздники и т.д."
              />
            </div>
          </div>

          <Button
            variant="primary"
            size="lg"
            disabled={submitting}
            type="submit"
            className={styles.submitBtn}
          >
            {submitting ? 'Оформление...' : 'Забронировать стол'}
          </Button>

          {error && (
            <div className={styles.errorMsg}>{error}</div>
          )}
        </form>
      </div>
    </div>
  )
}

export default Booking