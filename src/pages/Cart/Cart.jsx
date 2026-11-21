import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext.jsx'
import { createOrder } from '../../api/orders'
import Loading from '../../components/common/Loading/Loading'
import EmptyState from '../../components/common/EmptyState/EmptyState'
import Button from '../../components/common/Button/Button'
import styles from './Cart.module.css'

const Cart = () => {
  const { items, total, itemCount, removeItem, updateQuantity, clearCart } = useCart()
  const [ordering, setOrdering] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [orderError, setOrderError] = useState(null)

  const handleCheckout = async (e) => {
    e.preventDefault()
    setOrdering(true)
    setOrderError(null)

    try {
      const orderData = {
        items: items.map((item) => ({
          dish: item.id,
          quantity: item.quantity,
        })),
        total_amount: total,
      }
      await createOrder(orderData)
      setOrderSuccess(true)
      clearCart()
    } catch (err) {
      setOrderError(err.message || 'Не удалось оформить заказ')
    } finally {
      setOrdering(false)
    }
  }

  if (orderSuccess) {
    return (
      <div className={styles.cart}>
        <div className={styles.container}>
          <EmptyState
            title="Заказ оформлен!"
            message="Спасибо за ваш заказ. Мы свяжемся с вами в ближайшее время."
            icon="✅"
          />
          <Button variant="primary" asChild onClick={() => setOrderSuccess(false)}>
            <Link to="/menu">Вернуться к меню</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.cart}>
      <div className={styles.container}>
        <header className={styles.pageHeader}>
          <h1>Корзина</h1>
          <Link to="/menu" className={styles.backLink}>
            ← Продолжить покупки
          </Link>
        </header>

        {items.length === 0 ? (
          <EmptyState
            title="Ваша корзина пуста"
            message="Добавьте блюда из меню, чтобы оформить заказ."
            icon="🛒"
          />
        ) : (
          <>
            <div className={styles.itemsGrid}>
              {items.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  <div className={styles.itemImage}>
                    {item.image_url ? (
                      <img src={item.image_url} alt={item.name} />
                    ) : (
                      <div className={styles.placeholder}>
                        <span style={{ fontSize: '3rem' }}>🍽️</span>
                      </div>
                    )}
                  </div>
                  <div className={styles.itemInfo}>
                    <h3>{item.name}</h3>
                    <p className={styles.itemPrice}>
                      {item.price !== undefined ? item.price : '—'} ₽
                    </p>
                    <div className={styles.quantityControl}>
                      <button
                        className={styles.qtyBtn}
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        −
                      </button>
                      <span className={styles.qtyValue}>{item.quantity}</span>
                      <button
                        className={styles.qtyBtn}
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className={styles.removeBtn}
                    onClick={() => removeItem(item.id)}
                  >
                    Удалить
                  </button>
                </div>
              ))}
            </div>

            <div className={styles.orderSummary}>
              <div className={styles.summaryRow}>
                <span>Итого:</span>
                <span>{total} ₽</span>
              </div>
              <button
                className={styles.clearBtn}
                onClick={clearCart}
              >
                Очистить корзину
              </button>
            </div>

            <form onSubmit={handleCheckout} className={styles.checkoutForm}>
              <Button
                variant="primary"
                size="lg"
                disabled={ordering}
                className={styles.checkoutBtn}
              >
                {ordering ? 'Оформление...' : 'Оформить заказ'}
              </Button>
            </form>

            {orderError && (
              <div className={styles.errorMsg}>
                {orderError}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Cart