import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext.jsx'
import { createOrder } from '../../api/orders'
import Loading from '../../components/common/Loading/Loading'
import EmptyState from '../../components/common/EmptyState/EmptyState'
import Button from '../../components/common/Button/Button'
import styles from './Checkout.module.css'

const Checkout = () => {
  const { items, total, itemCount, clearCart } = useCart()
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_phone: '',
    delivery_type: 'pickup',
    address: '',
    comment: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  if (items.length === 0) {
    return (
      <div className={styles.checkout}>
        <div className={styles.container}>
          <EmptyState
            title="Корзина пуста"
            message="Добавьте блюда перед оформлением заказа."
            icon="🛒"
          />
          <Button variant="primary" asChild>
            <Link to="/menu">Перейти в меню</Link>
          </Button>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className={styles.checkout}>
        <div className={styles.container}>
          <EmptyState
            title="Заказ оформлен!"
            message="Спасибо за ваш заказ. Мы свяжемся с вами в ближайшее время."
            icon="✅"
          />
          <Button variant="primary" asChild onClick={() => setSuccess(false)}>
            <Link to="/menu">Вернуться к меню</Link>
          </Button>
        </div>
      </div>
    )
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      const orderData = {
        customer_name: formData.customer_name,
        customer_phone: formData.customer_phone,
        delivery_type: formData.delivery_type,
        address: formData.delivery_type === 'delivery' ? formData.address : '',
        comment: formData.comment,
        items: items.map((item) => ({
          dish: item.id,
          quantity: item.quantity,
        })),
        total_amount: total,
      }
      await createOrder(orderData)
      setSuccess(true)
      clearCart()
    } catch (err) {
      setError(err.message || 'Не удалось оформить заказ')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={styles.checkout}>
      <div className={styles.container}>
        <header className={styles.pageHeader}>
          <h1>Оформление заказа</h1>
          <Link to="/cart" className={styles.backLink}>
            ← Вернуться в корзину
          </Link>
        </header>

        <div className={styles.orderInfo}>
          <h2>Ваш заказ</h2>
          <div className={styles.orderItems}>
            {items.map((item) => (
              <div key={item.id} className={styles.orderItem}>
                <span>{item.name}</span>
                <span>{item.quantity} × {item.price} ₽</span>
              </div>
            ))}
          </div>
          <div className={styles.orderTotal}>
            <span>Итого:</span>
            <span>{total} ₽</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Имя <span>*</span></label>
            <input
              type="text"
              name="customer_name"
              value={formData.customer_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Телефон <span>*</span></label>
            <input
              type="tel"
              name="customer_phone"
              value={formData.customer_phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Способ получения</label>
            <div className={styles.radioGroup}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="delivery_type"
                  value="pickup"
                  checked={formData.delivery_type === 'pickup'}
                  onChange={handleChange}
                />
                Самовывоз
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="delivery_type"
                  value="delivery"
                  checked={formData.delivery_type === 'delivery'}
                  onChange={handleChange}
                />
                Доставка
              </label>
            </div>
          </div>

          {formData.delivery_type === 'delivery' && (
            <div className={styles.formGroup}>
              <label>Адрес доставки <span>*</span></label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          )}

          <div className={styles.formGroup}>
            <label>Комментарий к заказу</label>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className={styles.formGroup}>
            <Button
              variant="primary"
              size="lg"
              disabled={submitting}
              type="submit"
            >
              {submitting ? 'Оформление...' : 'Оформить заказ'}
            </Button>
          </div>

          {error && (
            <div className={styles.errorMsg}>{error}</div>
          )}
        </form>
      </div>
    </div>
  )
}

export default Checkout