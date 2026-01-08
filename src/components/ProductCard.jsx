export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.images[0]} alt={product.name} />
      </div>

      <div className="product-info">
        <p className="product-title">{product.name}</p>
        <p className="product-price">₹{product.price}</p>

        <button
          className="buy-btn"
          onClick={() => window.open(product.link, "_blank")}
        >
          View Details & Buy
        </button>
      </div>
    </div>
  );
}

