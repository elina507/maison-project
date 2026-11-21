import React, { useState, useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext.jsx'
import { fetchDishById } from '../../api/dishes'
import Loading from '../../components/common/Loading/Loading'
import ErrorMessage from '../../components/common/ErrorMessage/ErrorMessage'
import Button from '../../components/common/Button/Button'
import styles from './DishDetails.module.css'

const DishDetails = () => {
  const { id } = useParams()
  const [dish, setDish] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { addItem } = useCart()

  useEffect(() => {
    const loadDish = async () => {
      try {
        setLoading(true)
        const data = await fetchDishById(id)
        setDish(data)
      } catch (err) {
        setError(err.message || 'Не удалось загрузить блюдо')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      loadDish()
    }
  }, [id])

  const handleAddToCart = () => {
    if (dish) {
      addItem(dish)
    }
  }

  if (loading) return <Loading message="Загрузка блюда..." />
  if (error) return <ErrorMessage message={error} />
  if (!dish) return <Navigate to="/menu" />

  return (
    <div className={styles.dishDetails}>
      <div className={styles.container}>
        <Link to="/menu" className={styles.backLink}>
          ← Назад к меню
        </Link>

        <div className={styles.content}>
          <div className={styles.imageSection}>
            {dish.image_url ? (
              <img src={dish.image_url} alt={dish.name} className={styles.mainImage} />
            ) : (
              <div className={styles.imagePlaceholder}>
                <span style={{ fontSize: '5rem' }}>🍽️</span>
              </div>
            )}
          </div>

          <div className={styles.infoSection}>
            <div className={styles.category}>
              {dish.category || 'Блюдо'}
            </div>
            <h1 className={styles.title}>{dish.name}</h1>
            <p className={styles.description}>
              {dish.description || 'Описание отсутствует'}
            </p>
            {dish.composition && (
              <div className={styles.composition}>
                <strong>Состав:</strong> {dish.composition}
              </div>
            )}
            <div className={styles.price}>
              {dish.price !== undefined && dish.price !== null ? (
                <span>{dish.price} ₽</span>
              ) : (
                <span>Цена по запросу</span>
              )}
            </div>
            <Button
              variant="primary"
              size="lg"
              onClick={handleAddToCart}
              className={styles.addBtn}
            >
              Добавить в корзину
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DishDetails