import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext.jsx'
import { fetchDishes } from '../../api/dishes'
import { fetchCategories } from '../../api/categories'
import Loading from '../../components/common/Loading/Loading'
import ErrorMessage from '../../components/common/ErrorMessage/ErrorMessage'
import EmptyState from '../../components/common/EmptyState/EmptyState'
import Button from '../../components/common/Button/Button'
import styles from './Home.module.css'

const Home = () => {
  const [dishes, setDishes] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { addItem } = useCart()

  useEffect(() => {
    const loadData = async () => {
      try {
        const [dishesData, categoriesData] = await Promise.all([
          fetchDishes({ ordering: '-price', limit: 6 }),
          fetchCategories(),
        ])
        setDishes(dishesData)
        setCategories(categoriesData)
      } catch (err) {
        setError(err.message || 'Не удалось загрузить данные')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const handleAddToCart = (dish) => {
    addItem(dish)
  }

  if (loading) return <Loading message="Загрузка главной страницы..." />
  if (error) return <ErrorMessage message={error} />

  const featuredDishes = dishes.slice(0, 4)

  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.heroBadge}>Ресторан премиум-класса</span>
          <h1 className={styles.heroTitle}>Искусство вкуса в каждой детали</h1>
          <p className={styles.heroSubtitle}>
            Утончённая кухня, изысканные вина и неповторимая атмосфера
          </p>
          <div className={styles.heroActions}>
            <Button variant="primary" size="lg" asChild>
              <Link to="/menu">Наше меню</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/booking">Забронировать стол</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className={styles.welcome}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Вкус, который остаётся с вами</h2>
          <div className={styles.welcomeGrid}>
            <div className={styles.welcomeImage}>
              <div className={styles.imagePlaceholder}>
                <span style={{ fontSize: '4rem' }}>🍷</span>
              </div>
            </div>
            <div className={styles.welcomeText}>
              <p>
                Наш ресторан — это место, где кулинария становится искусством.
                Каждое блюдо создается с любовью и вниманием к деталям.
              </p>
              <p>
                Мы используем только свежие локальные ингредиенты и сезонные
                продукты, чтобы подарить вам неповторимые гастрономические
                впечатления.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className={styles.featured}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Выбранное для вас</h2>
            <Button variant="outline" size="md" asChild>
              <Link to="/menu">Смотреть всё меню</Link>
            </Button>
          </div>

          {featuredDishes.length === 0 ? (
            <EmptyState
              title="Скоро здесь появятся наши блюда"
              message="Мы 열심히 работаем над новым меню. Скоро вы сможете ознакомиться с нашими кулинарными шедеврами."
              icon="🍽️"
            />
          ) : (
            <div className={styles.dishesGrid}>
              {featuredDishes.map((dish) => (
                <div key={dish.id} className={styles.dishItem}>
                  <div className={styles.dishImage}>
                    {dish.image_url ? (
                      <img src={dish.image_url} alt={dish.name} />
                    ) : (
                      <div className={styles.placeholder}>
                        <span style={{ fontSize: '3rem' }}>🍽️</span>
                      </div>
                    )}
                  </div>
                  <div className={styles.dishInfo}>
                    <h3>{dish.name}</h3>
                    <p>{dish.description || ''}</p>
                    <div className={styles.dishPrice}>
                      <span>
                        {dish.price !== undefined ? dish.price : '—'} ₽
                      </span>
                      <button
                        className={styles.addBtn}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleAddToCart(dish)
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Chef Section */}
      <section className={styles.chef}>
        <div className={styles.container}>
          <div className={styles.chefGrid}>
            <div className={styles.chefImage}>
              <div className={styles.imagePlaceholder}>
                <span style={{ fontSize: '5rem' }}>👨‍🍳</span>
              </div>
            </div>
            <div className={styles.chefText}>
              <h2>Вдохновение в каждом блюде</h2>
              <p>
                Наш шеф-повар объединяет традиции европейской кухни с
                современными гастрономическими тенденциями. Каждое блюдо —
                результат многолетнего опыта и вдохновения.
              </p>
              <Button variant="secondary" size="md">
                О шеф-поваре
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Restaurant Story */}
      <section className={styles.story}>
        <div className={styles.container}>
          <div className={styles.storyContent}>
            <h2>Больше, чем просто ужин</h2>
            <p>
              MAISON — это место, где рождаются воспоминания. Элегантный
              интерьер, внимательный сервис и изысканная кухня создают
              идеальную обстановку для важных встреч и романтических вечеров.
            </p>
            <p>
              Мы верим, что еда должна не только насыщать, но и вдохновлять.
              Поэтому каждое наше блюдо рассказывает свою историю.
            </p>
          </div>
        </div>
      </section>

      {/* Moments Gallery */}
      <section className={styles.moments}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>
            Моменты, которыми хочется делиться
          </h2>
          <div className={styles.galleryGrid}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className={styles.galleryItem}>
                <div className={styles.imagePlaceholder}>
                  <span style={{ fontSize: '3rem' }}>📸</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className={styles.quote}>
        <div className={styles.container}>
          <blockquote className={styles.quoteText}>
            «Хорошая еда — это основа настоящего счастья»
          </blockquote>
          <cite className={styles.quoteAuthor}>— MAISON Restaurant</cite>
        </div>
      </section>
    </div>
  )
}

export default Home