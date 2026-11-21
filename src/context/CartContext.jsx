import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const CartContext = createContext(null)

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('maison_cart')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('maison_cart', JSON.stringify(items))
  }, [items])

  const addItem = useCallback((dish) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === dish.id)
      if (existing) {
        return prev.map((item) =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { ...dish, quantity: 1 }]
    })
  }, [])

  const removeItem = useCallback((dishId) => {
    setItems((prev) => prev.filter((item) => item.id !== dishId))
  }, [])

  const updateQuantity = useCallback((dishId, quantity) => {
    if (quantity <= 0) {
      removeItem(dishId)
      return
    }
    setItems((prev) =>
      prev.map((item) =>
        item.id === dishId ? { ...item, quantity } : item
      )
    )
  }, [removeItem])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    total,
    itemCount,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}