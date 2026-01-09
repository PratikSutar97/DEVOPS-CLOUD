import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProducts } from "../firebase/products";
import { CategoryProductCardSkeleton } from "../components/Skeleton";

function ProductImageCarousel({ images, productName }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageList = images || [];

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === imageList.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="product-image-carousel">
      {imageList.length > 1 && (
        <button className="carousel-btn carousel-prev" onClick={handlePrev}>
          ‹
        </button>
      )}
      <div className="carousel-images">
        {imageList.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`${productName} - ${idx + 1}`}
            style={{ display: idx === currentIndex ? "block" : "none" }}
          />
        ))}
      </div>
      {imageList.length > 1 && (
        <button className="carousel-btn carousel-next" onClick={handleNext}>
          ›
        </button>
      )}
      {imageList.length > 1 && (
        <div className="carousel-dots">
          {imageList.map((_, idx) => (
            <span
              key={idx}
              className={`dot ${idx === currentIndex ? "active" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(idx);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CategoryPage() {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("default");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchProducts()
      .then(all => setProducts(all.filter(p => p.category === categoryName)))
      .finally(() => setLoading(false));
  }, [categoryName]);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === "low-to-high") {
      return (parseFloat(a.price) || 0) - (parseFloat(b.price) || 0);
    }
    if (sortOrder === "high-to-low") {
      return (parseFloat(b.price) || 0) - (parseFloat(a.price) || 0);
    }
    return 0;
  });

  return (
    <div className="category-page">
      <button className="back-btn" onClick={() => navigate("/")}>
        ← Back to Home
      </button>

      <div className="category-header">
        <h2 className="category-title">{categoryName}</h2>
        <div className="sort-filter">
          <label htmlFor="sort-select">Sort by Price:</label>
          <select
            id="sort-select"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="low-to-high">Low to High</option>
            <option value="high-to-low">High to Low</option>
          </select>
        </div>
      </div>

      {/* ✅ GRID CONTAINER */}
      <div className="products-grid">
        {loading ? (
          [...Array(6)].map((_, i) => (
            <CategoryProductCardSkeleton key={i} />
          ))
        ) : (
          sortedProducts.map(p => (
            <div key={p.id} className="category-product-card">
              <ProductImageCarousel images={p.images} productName={p.name} />
              <h3>{p.name}</h3>
              <p className="price">₹{p.price}</p>
              <button
                className="buy-btn"
                onClick={() => window.open(p.link, "_blank")}
              >
                View Details & Buy
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

