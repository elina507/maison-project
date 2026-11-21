import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext.jsx'
import { fetchDishes } from '../../api/dishes'
import { fetchCategories } from '../../api/categories'
import DishCard from '../../components/dishes/DishCard/DishCard'
import Loading from '../../components/common/Loading/Loading'
import ErrorMessage from '../../components/common/ErrorMessage/ErrorMessage'
import EmptyState from '../../components/common/EmptyState/EmptyState'
import Button from '../../components/common/Button/Button'
import styles from './Menu.module.css'

const Menu = () => {
  const [dishes, setDishes] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    category: '',
    search: '',
    min_price: '',
    max_price: '',
    ordering: '',
  })
  const { addItem } = useCart()

  const loadDishes = useCallback(async () => {
    try {
      setLoading(true)
      const params = { ...filters }
      Object.keys(params).forEach(
        (key) => params[key] === '' && delete params[key]
      )
      const data = await fetchDishes(params)
      setDishes(data)
    } catch (err) {
      setError(err.message || 'Не удалось загрузить блюда')
    } finally {
      setLoading(false)
    }
  }, [filters])

  useEffect(() => {
    loadDishes()
  }, [loadDishes])

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch((err) => console.error('Failed to load categories:', err))
  }, [])

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleAddToCart = (dish) => {
    addItem(dish)
  }

  if (loading) return <Loading message="Загрузка меню..." />
  if (error) return <ErrorMessage message={error} onRetry={loadDishes} />

  return (
    <div className={styles.menu}>
      <div className={styles.container}>
        <header className={styles.pageHeader}>
          <h1>Наше меню</h1>
          <p>Откройте для себя наши кулинарные шедевры</p>
        </header>

        <div className={styles.filters}>
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Поиск блюд..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </div>

          <div className={styles.categoryFilter}>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
            >
              <option value="">Все категории</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.priceFilter}>
            <input
              type="number"
              placeholder="Мин. цена"
              value={filters.min_price}
              onChange={(e) => handleFilterChange('min_price', e.target.value)}
            />
            <input
              type="number"
              placeholder="Макс. цена"
              value={filters.max_price}
              onChange={(e) => handleFilterChange('max_price', e.target.value)}
            />
          </div>

          <div className={styles.sortFilter}>
            <select
              value={filters.ordering}
              onChange={(e) => handleFilterChange('ordering', e.target.value)}
            >
              <option value="">По умолчанию</option>
              <option value="price">По цене (по возрастанию)</option>
              <option value="-price">По цене (по убыванию)</option>
            </select>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setFilters({ category: '', search: '', min_price: '', max_price: '', ordering: '' })
            }}
          >
            Сбросить фильтры
          </Button>
        </div>

        <div className={styles.dishesGrid}>
          {dishes.length === 0 ? (
            <EmptyState
              title="Блюда не найдены"
              message="Попробуйте изменить параметры поиска или фильтры."
              icon="🔍"
            />
          ) : (
            dishes.map((dish) => (
              <DishCard key={dish.id} dish={dish} showAddToCart />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Menu