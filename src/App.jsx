import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import Layout from './components/layout/Layout.jsx'
import Home from './pages/Home/Home.jsx'
import Menu from './pages/Menu/Menu.jsx'
import DishDetails from './pages/DishDetails/DishDetails.jsx'
import Cart from './pages/Cart/Cart.jsx'
import Checkout from './pages/Checkout/Checkout.jsx'
import Booking from './pages/Booking/Booking.jsx'
import Reviews from './pages/Reviews/Reviews.jsx'
import CRMLogin from './pages/CRM/Login.jsx'
import CRMProfile from './pages/CRM/Profile.jsx'
import ProtectedRoute from './components/layout/ProtectedRoute.jsx'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="menu" element={<Menu />} />
              <Route path="dish/:id" element={<DishDetails />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="booking" element={<Booking />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="crm/login" element={<CRMLogin />} />
              <Route path="crm" element={<ProtectedRoute><CRMProfile /></ProtectedRoute>} />
            </Route>
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  )
}

export default App