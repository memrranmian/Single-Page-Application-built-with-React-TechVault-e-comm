// Loading spinner component for async operations
function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div className="loading-container" id="loading-spinner">
      <div className="spinner"></div>
      <p className="loading-text">{message}</p>
    </div>
  )
}

export default LoadingSpinner
