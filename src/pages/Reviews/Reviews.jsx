import React, { useState, useEffect } from 'react'
import { fetchReviews } from '../../api/reviews'
import { createReview } from '../../api/reviews'
import Loading from '../../components/common/Loading/Loading'
import ErrorMessage from '../../components/common/ErrorMessage/ErrorMessage'
import EmptyState from '../../components/common/EmptyState/EmptyState'
import Button from '../../components/common/Button/Button'
import styles from './Reviews.module.css'

const Reviews = () => {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    text: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    loadReviews()
  }, [])

  const loadReviews = async () => {
    try {
      setLoading(true)
      const data = await fetchReviews()
      setReviews(data)
    } catch (err) {
      setError(err.message || 'Не удалось загрузить отзывы')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      await createReview({
        name: formData.name,
        rating: parseInt(formData.rating, 10),
        text: formData.text,
      })
      setSuccess(true)
      setFormData({ name: '', rating: 5, text: '' })
      await loadReviews()
    } catch (err) {
      setError(err.message || 'Не удалось добавить отзыв')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <Loading message="Загрузка отзывов..." />
  if (error) return <ErrorMessage message={error} onRetry={loadReviews} />

  return (
    <div className={styles.reviews}>
      <div className={styles.container}>
        <header className={styles.pageHeader}>
          <h1>Отзывы</h1>
          <p>Что говорят наши гости</p>
        </header>

        {reviews.length === 0 ? (
          <EmptyState
            title="Отзывов пока нет"
            message="Будьте первым, кто поделится своими впечатлениями!"
            icon="💬"
          />
        ) : (
          <div className={styles.reviewsGrid}>
            {reviews.map((review) => (
              <div key={review.id} className={styles.reviewCard}>
                <div className={styles.reviewHeader}>
                  <span className={styles.reviewName}>{review.name}</span>
                  <div className={styles.reviewRating}>
                    {Array.from(
                      { length: review.rating },
                      () => '★'
                    ).join('')}
                    {Array.from(
                      { length: 5 - review.rating },
                      () => '☆'
                    ).join('')}
                  </div>
                </div>
                <p className={styles.reviewText}>{review.text}</p>
              </div>
            ))}
          </div>
        )}

        <div className={styles.addReview}>
          <h2>Оставьте ваш отзыв</h2>
          {success && (
            <div className={styles.successMsg}>
              Спасибо за ваш отзыв! Он будет опубликован после проверки.
            </div>
          )}
          <form onSubmit={handleSubmit} className={styles.reviewForm}>
            <div className={styles.formGroup}>
              <label>Имя <span>*</span></label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Оценка <span>*</span></label>
              <select
                name="rating"
                value={formData.rating}
                onChange={handleChange}
              >
                <option value="5">5 звёзд</option>
                <option value="4">4 звезды</option>
                <option value="3">3 звезды</option>
                <option value="2">2 звезды</option>
                <option value="1">1 звезда</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Текст отзыва <span>*</span></label>
              <textarea
                name="text"
                value={formData.text}
                onChange={handleChange}
                rows={4}
                required
              />
            </div>
            <Button
              variant="primary"
              size="lg"
              disabled={submitting}
              type="submit"
            >
              {submitting ? 'Отправка...' : 'Оставить отзыв'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Reviews