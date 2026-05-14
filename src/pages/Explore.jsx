import { useState, useEffect } from 'react'
import axios from 'axios'
import ProductCard from '../components/ProductCard.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'

// PAGE 3: Explore — Dynamic rendering (cards with search & filter)
function Explore() {
  const [allProducts, setAllProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch all products and categories from API using Axios
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        // Parallel API calls with Axios
        const [productsRes, categoriesRes] = await Promise.all([
          axios.get('https://fakestoreapi.com/products'),
          axios.get('https://fakestoreapi.com/products/categories'),
        ])
        setAllProducts(productsRes.data)
        setFilteredProducts(productsRes.data)
        setCategories(categoriesRes.data)
        setError(null)
      } catch (err) {
        setError('Failed to load products. Please try again.')
        console.error('API Error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filter products whenever searchTerm or activeCategory changes
  useEffect(() => {
    let result = allProducts

    // Filter by category
    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory)
    }

    // Filter by search term
    if (searchTerm.trim()) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredProducts(result)
  }, [searchTerm, activeCategory, allProducts])

  // Event handler — onChange for search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  // Event handler — onClick for category filter buttons
  const handleCategoryClick = (category) => {
    setActiveCategory(category)
  }

  if (loading) return <LoadingSpinner message="Loading product collection..." />

  if (error) {
    return (
      <div className="page error-page" id="explore-error">
        <div className="error-container">
          <span className="error-icon">⚠️</span>
          <h2>Oops!</h2>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="page explore-page" id="explore-page">
      <header className="page-header">
        <h1 className="page-title">Explore Collection</h1>
        <p className="page-subtitle">
          Dynamic rendering with <strong>search</strong> and{' '}
          <strong>category filters</strong>. All products rendered using{' '}
          <strong>map()</strong> with reusable <strong>ProductCard</strong>{' '}
          components receiving data via <strong>props</strong>.
        </p>
      </header>

      {/* Search & Filter Controls */}
      <section className="explore-controls" id="explore-controls">
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
            id="search-input"
          />
          {searchTerm && (
            <button
              className="search-clear"
              id="search-clear-btn"
              onClick={() => setSearchTerm('')}
            >
              ✕
            </button>
          )}
        </div>

        <div className="category-filters" id="category-filters">
          <button
            className={`filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
            id="filter-all"
            onClick={() => handleCategoryClick('all')}
          >
            All ({allProducts.length})
          </button>
          {/* Dynamic rendering of category buttons using map() */}
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              id={`filter-${cat.replace(/[^a-z]/gi, '-')}`}
              onClick={() => handleCategoryClick(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Results Count */}
      <div className="results-count" id="results-count">
        Showing <strong>{filteredProducts.length}</strong> of{' '}
        <strong>{allProducts.length}</strong> products
      </div>

      {/* Product Cards Grid — dynamic rendering using map() */}
      <section className="products-grid" id="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="no-results" id="no-results">
            <span className="no-results-icon">🔎</span>
            <h3>No products found</h3>
            <p>Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </section>
    </div>
  )
}

export default Explore
