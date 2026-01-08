import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProducts } from "../firebase/products";

export default function CategoryPage() {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then(all =>
      setProducts(all.filter(p => p.category === categoryName))
    );
  }, [categoryName]);

  return (
    <div className="category-page">
      <button className="back-btn" onClick={() => navigate("/")}>
        ← Back to Home
      </button>

      <h2 className="category-title">{categoryName}</h2>

      {/* ✅ GRID CONTAINER */}
      <div className="products-grid">
        {products.map(p => (
          <div key={p.id} className="category-product-card">
            <img src={p.images[0]} alt={p.name} />
            <h3>{p.name}</h3>
            <p className="price">₹{p.price}</p>
            <button
              className="buy-btn"
              onClick={() => window.open(p.link, "_blank")}
            >
              View Details & Buy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

