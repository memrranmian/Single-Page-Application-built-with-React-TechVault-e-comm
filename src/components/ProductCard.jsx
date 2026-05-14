import { useCart } from '../context/CartContext.jsx'

// Reusable ProductCard component — receives product data via props
function ProductCard({ product }) {
  const { addToCart } = useCart()

  // Event handler for "Add to Cart" button click
  const handleAddToCart = () => {
    addToCart(product)
  }

  return (
    <div className="product-card" id={`product-card-${product.id}`}>
      <div className="product-image-wrapper">
        <img
          src={product.image || product.thumbnail}
          alt={product.title}
          className="product-image"
          loading="lazy"
        />
        <span className="product-category">{product.category}</span>
      </div>

      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-description">
          {product.description?.slice(0, 80)}...
        </p>

        <div className="product-meta">
          <span className="product-price">${product.price?.toFixed(2)}</span>
          {product.rating && (
            <span className="product-rating">
              ⭐ {product.rating?.rate || product.rating}
            </span>
          )}
        </div>

        <button
          className="btn btn-primary add-to-cart-btn"
          id={`add-to-cart-${product.id}`}
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductCard
