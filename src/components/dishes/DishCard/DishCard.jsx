import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../../context/CartContext.jsx'
import styles from './DishCard.module.css'

const DishCard = ({ dish, showAddToCart = true }) => {
  const { addItem } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(dish)
  }

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        {dish.image_url ? (
          <img src={dish.image_url} alt={dish.name} className={styles.image} />
        ) : (
          <div className={styles.placeholder}>Фото</div>
        )}
        <div className={styles.favorite}>
          <span>♡</span>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.category}>{dish.category || 'Блюдо'}</div>
        <Link to={`/dish/${dish.id}`} className={styles.titleLink}>
          <h3 className={styles.title}>{dish.name}</h3>
        </Link>
        <p className={styles.description}>{dish.description || ''}</p>
        <div className={styles.price}>
          {dish.price !== undefined && dish.price !== null ? (
            <span>{dish.price} ₽</span>
          ) : (
            <span>Цена по запросу</span>
          )}
        </div>
        {showAddToCart && (
          <button
            className={styles.addBtn}
            onClick={handleAddToCart}
          >
            Добавить
          </button>
        )}
      </div>
    </article>
  )
}

export default DishCard