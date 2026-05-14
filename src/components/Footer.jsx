import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer" id="main-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <span className="brand-icon">⚡</span>
          <span className="brand-text">TechVault</span>
          <p className="footer-tagline">Your premium tech destination.</p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/explore">Explore</Link>
          <Link to="/cart">Cart</Link>
        </div>

        <div className="footer-info">
          <h4>About</h4>
          <p>Built with React, React Router, Axios & Context API.</p>
          <p>NAVTTC Final Project — 2026</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 TechVault. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
