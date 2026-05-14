import { createContext, useContext, useState } from 'react'

// Create the Cart Context
const CartContext = createContext()

// Custom hook to use the Cart Context
export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

// Cart Provider component — wraps the app and provides global cart state
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  // Add item to cart (or increase quantity if already exists)
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  // Remove item from cart entirely
  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId))
  }

  // Update quantity of a specific item
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  // Clear all items from the cart
  const clearCart = () => {
    setCartItems([])
  }

  // Calculate total number of items
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  // Value object shared globally via Context
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
