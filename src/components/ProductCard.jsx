import { useState } from "react";

export default function ProductCard({ product }) {
  const images = product.images || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="product-card">
      <div className="product-image-carousel">
        {images.length > 1 && (
          <button className="carousel-btn carousel-prev" onClick={handlePrev}>
            ‹
          </button>
        )}
        <div className="carousel-images">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${product.name} - ${idx + 1}`}
              className={idx === currentIndex ? "active" : ""}
              style={{ display: idx === currentIndex ? "block" : "none" }}
            />
          ))}
        </div>
        {images.length > 1 && (
          <button className="carousel-btn carousel-next" onClick={handleNext}>
            ›
          </button>
        )}
        {images.length > 1 && (
          <div className="carousel-dots">
            {images.map((_, idx) => (
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

