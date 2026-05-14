import { useState } from 'react'
import { useCart } from '../context/CartContext.jsx'
import { Link } from 'react-router-dom'

// PAGE 4: Cart — Context API data sharing + Form with event handling
function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart()

  // Form state for checkout
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
  })
  const [formErrors, setFormErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Event handler — onChange for form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  // Form validation
  const validateForm = () => {
    const errors = {}
    if (!formData.name.trim()) errors.name = 'Name is required'
    if (!formData.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid'
    }
    if (!formData.address.trim()) errors.address = 'Address is required'
    if (!formData.phone.trim()) {
      errors.phone = 'Phone is required'
    } else if (!/^\d{10,}$/.test(formData.phone.replace(/\D/g, ''))) {
      errors.phone = 'Enter a valid phone number'
    }
    return errors
  }

  // Event handler — onClick for form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }
    setIsSubmitted(true)
    clearCart()
  }

  // Event handler — onClick for quantity change
  const handleQuantityChange = (productId, delta) => {
    const item = cartItems.find((i) => i.id === productId)
    if (item) {
      updateQuantity(productId, item.quantity + delta)
    }
  }

  // Show success message after form submission
  if (isSubmitted) {
    return (
      <div className="page cart-page" id="cart-page">
        <div className="success-container" id="order-success">
          <div className="success-animation">✅</div>
          <h2>Order Placed Successfully!</h2>
          <p>
            Thank you, <strong>{formData.name}</strong>! Your order has been
            confirmed.
          </p>
          <p>A confirmation will be sent to <strong>{formData.email}</strong>.</p>
          <Link to="/" className="btn btn-primary btn-large" id="back-to-home">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page cart-page" id="cart-page">
      <header className="page-header">
        <h1 className="page-title">Your Cart</h1>
        <p className="page-subtitle">
          Cart state managed via <strong>Context API</strong>. Checkout form
          demonstrates <strong>event handling</strong> (onChange, onClick) and{' '}
          <strong>form validation</strong>.
        </p>
      </header>

      {cartItems.length === 0 ? (
        /* Empty Cart State */
        <div className="empty-cart" id="empty-cart">
          <span className="empty-cart-icon">🛒</span>
          <h2>Your cart is empty</h2>
          <p>Browse our collection and add some products!</p>
          <Link to="/explore" className="btn btn-primary btn-large" id="shop-now-btn">
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          {/* Cart Items Section */}
          <section className="cart-items-section" id="cart-items-section">
            <div className="cart-header">
              <h2>Cart Items ({totalItems})</h2>
              <button
                className="btn btn-danger btn-sm"
                id="clear-cart-btn"
                onClick={clearCart}
              >
                Clear Cart
              </button>
            </div>

            {/* Dynamic rendering of cart items using map() */}
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div className="cart-item" key={item.id} id={`cart-item-${item.id}`}>
                  <img
                    src={item.image || item.thumbnail}
                    alt={item.title}
                    className="cart-item-image"
                  />
                  <div className="cart-item-info">
                    <h4 className="cart-item-title">{item.title}</h4>
                    <span className="cart-item-price">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                  <div className="cart-item-controls">
                    <button
                      className="qty-btn"
                      id={`qty-minus-${item.id}`}
                      onClick={() => handleQuantityChange(item.id, -1)}
                    >
                      −
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button
                      className="qty-btn"
                      id={`qty-plus-${item.id}`}
                      onClick={() => handleQuantityChange(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                  <span className="cart-item-subtotal">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                  <button
                    className="remove-btn"
                    id={`remove-item-${item.id}`}
                    onClick={() => removeFromCart(item.id)}
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="cart-summary" id="cart-summary">
              <div className="summary-row">
                <span>Total Items:</span>
                <strong>{totalItems}</strong>
              </div>
              <div className="summary-row summary-total">
                <span>Total Price:</span>
                <strong>${totalPrice.toFixed(2)}</strong>
              </div>
            </div>
          </section>

          {/* Checkout Form — demonstrates form event handling */}
          <section className="checkout-section" id="checkout-section">
            <h2>Checkout</h2>
            <form className="checkout-form" id="checkout-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="checkout-name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className={formErrors.name ? 'input-error' : ''}
                />
                {formErrors.name && (
                  <span className="error-text">{formErrors.name}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="checkout-email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className={formErrors.email ? 'input-error' : ''}
                />
                {formErrors.email && (
                  <span className="error-text">{formErrors.email}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="address">Delivery Address</label>
                <textarea
                  id="checkout-address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your delivery address"
                  rows="3"
                  className={formErrors.address ? 'input-error' : ''}
                ></textarea>
                {formErrors.address && (
                  <span className="error-text">{formErrors.address}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="checkout-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  className={formErrors.phone ? 'input-error' : ''}
                />
                {formErrors.phone && (
                  <span className="error-text">{formErrors.phone}</span>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-large checkout-btn"
                id="checkout-submit-btn"
              >
                Place Order — ${totalPrice.toFixed(2)}
              </button>
            </form>
          </section>
        </div>
      )}
    </div>
  )
}

export default Cart
