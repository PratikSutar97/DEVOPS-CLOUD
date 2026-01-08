import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProducts } from "../firebase/products";

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
        ))}
      </div>
    </div>
  );
}

