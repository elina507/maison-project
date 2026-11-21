import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.logo}>MAISON</div>
            <p className={styles.tagline}>
              Искусство вкуса в каждой детали
            </p>
          </div>
          <div className={styles.contact}>
            <h4>Контакты</h4>
            <p>г. Москва, ул. Кузнецкий Мост, 12</p>
            <p>+7 (495) 123-45-67</p>
            <p>hello@maison.ru</p>
            <div className={styles.socials}>
              <a href="#" aria-label="Instagram">@maison_restaurant</a>
              <a href="#" aria-label="Telegram">@maison_bot</a>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.links}>
            <Link to="/menu">Меню</Link>
            <Link to="/booking">Бронирование</Link>
            <Link to="/reviews">Отзывы</Link>
            <Link to="/crm">CRM</Link>
          </div>
          <p className={styles.copyright}>
            © {currentYear} MAISON Restaurant. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer