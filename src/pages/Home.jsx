import { Link } from 'react-router-dom'

// PAGE 1: Home — Entry point with navigation links and hero section
function Home() {
  // Feature cards data to render dynamically
  const features = [
    {
      icon: '🛒',
      title: 'Browse Products',
      description: 'Explore our curated collection of premium tech products fetched from a live API.',
      link: '/products',
      linkText: 'View Products',
    },
    {
      icon: '🔍',
      title: 'Explore & Filter',
      description: 'Search, filter, and discover products with dynamic rendering and real-time updates.',
      link: '/explore',
      linkText: 'Start Exploring',
    },
    {
      icon: '🛍️',
      title: 'Smart Cart',
      description: 'Add items to your cart powered by Context API — global state management in action.',
      link: '/cart',
      linkText: 'Go to Cart',
    },
  ]

  return (
    <div className="page home-page" id="home-page">
      {/* Hero Section */}
      <section className="hero" id="hero-section">
        <div className="hero-content">
          <div className="hero-badge">⚡ NAVTTC Final Project 2026</div>
          <h1 className="hero-title">
            Welcome to <span className="gradient-text">TechVault</span>
          </h1>
          <p className="hero-subtitle">
            A modern Single Page Application built with React, React Router DOM,
            Axios, and Context API. Explore premium tech products with a
            beautiful, responsive interface.
          </p>
          <div className="hero-actions">
            <Link to="/products" className="btn btn-primary btn-large" id="hero-cta-products">
              Explore Products
            </Link>
            <Link to="/explore" className="btn btn-secondary btn-large" id="hero-cta-explore">
              Browse Collection
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-card hero-card-1">
            <span>🖥️</span>
            <p>Laptops</p>
          </div>
          <div className="hero-card hero-card-2">
            <span>📱</span>
            <p>Phones</p>
          </div>
          <div className="hero-card hero-card-3">
            <span>⌚</span>
            <p>Watches</p>
          </div>
          <div className="hero-card hero-card-4">
            <span>🎧</span>
            <p>Audio</p>
          </div>
        </div>
      </section>

      {/* Features Section — uses map() for dynamic rendering */}
      <section className="features-section" id="features-section">
        <h2 className="section-title">What You Can Do</h2>
        <p className="section-subtitle">
          This app demonstrates key React concepts through a real-world e-commerce interface.
        </p>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index} id={`feature-card-${index}`}>
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <Link to={feature.link} className="feature-link">
                {feature.linkText} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="tech-section" id="tech-section">
        <h2 className="section-title">Built With</h2>
        <div className="tech-grid">
          {[
            { name: 'React', icon: '⚛️', desc: 'Functional Components & Hooks' },
            { name: 'React Router', icon: '🧭', desc: 'SPA Navigation (No Reload)' },
            { name: 'Axios', icon: '🌐', desc: 'API Integration (FakeStore API)' },
            { name: 'Context API', icon: '🔗', desc: 'Global State Management' },
          ].map((tech, i) => (
            <div className="tech-card" key={i} id={`tech-card-${i}`}>
              <span className="tech-icon">{tech.icon}</span>
              <h4>{tech.name}</h4>
              <p>{tech.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
