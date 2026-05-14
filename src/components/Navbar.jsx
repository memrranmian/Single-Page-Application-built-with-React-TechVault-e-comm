import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const { totalItems } = useCart()

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Products' },
    { path: '/explore', label: 'Explore' },
    { path: '/cart', label: 'Cart' },
  ]

  return (
    <nav className="navbar" id="main-navbar">
      <div className="navbar-container">
        {/* Logo / Brand */}
        <Link to="/" className="navbar-brand" id="navbar-brand">
          <span className="brand-icon">⚡</span>
          <span className="brand-text">TechVault</span>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className={`navbar-links ${menuOpen ? 'active' : ''}`} id="navbar-links">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                id={`nav-link-${link.label.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
                {link.label === 'Cart' && totalItems > 0 && (
                  <span className="cart-badge">{totalItems}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger */}
        <button
          className={`hamburger ${menuOpen ? 'active' : ''}`}
          id="hamburger-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
