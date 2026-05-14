import { useState, useEffect } from 'react'
import axios from 'axios'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import { useCart } from '../context/CartContext.jsx'

// PAGE 2: Products — Displays structured information fetched from API using Axios
function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const { addToCart } = useCart()

  // Fetch products from FakeStore API using Axios
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await axios.get('https://fakestoreapi.com/products?limit=8')
        setProducts(response.data)
        setError(null)
      } catch (err) {
        setError('Failed to fetch products. Please try again later.')
        console.error('API Error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Event handler — onClick to select a product for detailed view
  const handleProductClick = (product) => {
    setSelectedProduct(product)
  }

  // Event handler — close the detail modal
  const handleCloseDetail = () => {
    setSelectedProduct(null)
  }

  // Event handler — add to cart
  const handleAddToCart = (product) => {
    addToCart(product)
  }

  if (loading) return <LoadingSpinner message="Fetching products from API..." />

  if (error) {
    return (
      <div className="page error-page" id="products-error">
        <div className="error-container">
          <span className="error-icon">⚠️</span>
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="page products-page" id="products-page">
      <header className="page-header">
        <h1 className="page-title">Our Products</h1>
        <p className="page-subtitle">
          Structured product data fetched from the{' '}
          <strong>FakeStore API</strong> using <strong>Axios</strong>.
          Click any product to view detailed information.
        </p>
      </header>

      {/* Products displayed in a structured table layout */}
      <section className="products-table-section" id="products-table-section">
        <h2 className="section-title">📊 Product Overview Table</h2>
        <div className="table-wrapper">
          <table className="products-table" id="products-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Price</th>
                <th>Rating</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Dynamic rendering using map() */}
              {products.map((product, index) => (
                <tr key={product.id} id={`table-row-${product.id}`}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={product.image}
                      alt={product.title}
                      className="table-product-img"
                    />
                  </td>
                  <td className="table-title">{product.title}</td>
                  <td>
                    <span className="category-badge">{product.category}</span>
                  </td>
                  <td className="table-price">${product.price.toFixed(2)}</td>
                  <td>
                    <span className="table-rating">
                      ⭐ {product.rating.rate} ({product.rating.count})
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary"
                      id={`view-detail-${product.id}`}
                      onClick={() => handleProductClick(product)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Product Detail Modal — displays structured information */}
      {selectedProduct && (
        <div className="modal-overlay" id="product-modal" onClick={handleCloseDetail}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              id="modal-close-btn"
              onClick={handleCloseDetail}
            >
              ✕
            </button>
            <div className="modal-body">
              <div className="modal-image">
                <img src={selectedProduct.image} alt={selectedProduct.title} />
              </div>
              <div className="modal-info">
                <span className="category-badge">{selectedProduct.category}</span>
                <h2>{selectedProduct.title}</h2>
                <p className="modal-description">{selectedProduct.description}</p>
                <div className="modal-meta">
                  <span className="modal-price">
                    ${selectedProduct.price.toFixed(2)}
                  </span>
                  <span className="modal-rating">
                    ⭐ {selectedProduct.rating.rate} / 5
                    <small> ({selectedProduct.rating.count} reviews)</small>
                  </span>
                </div>
                <button
                  className="btn btn-primary btn-large"
                  id="modal-add-to-cart"
                  onClick={() => {
                    handleAddToCart(selectedProduct)
                    handleCloseDetail()
                  }}
                >
                  🛒 Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Products
