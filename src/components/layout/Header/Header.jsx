import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../../../context/CartContext.jsx'
import styles from './Header.module.css'

const Header = () => {
  const { itemCount } = useCart()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 20)
  }

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { to: '/', label: 'Главная' },
    { to: '/menu', label: 'Меню' },
    { to: '/booking', label: 'Бронирование' },
    { to: '/reviews', label: 'Отзывы' },
    { to: '/crm', label: 'CRM' },
  ]

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <Link to="/" className={styles.logo}>
            MAISON
          </Link>

          <div className={styles.desktopMenu}>
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`${styles.navLink} ${location.pathname === link.to ? styles.active : ''}`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/cart" className={styles.cartLink}>
              🛒
              <span className={styles.cartCount}>{itemCount}</span>
            </Link>
          </div>

          <button
            className={styles.mobileMenuBtn}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Открыть меню"
          >
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </button>
        </nav>

        {isMobileMenuOpen && (
          <div className={styles.mobileMenu}>
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={styles.mobileLink}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)} className={styles.mobileLink}>
              🛒 Корзина ({itemCount})
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header