import React, { useState } from "react";
import "./ProductModal.css";

const ProductModal = ({ product, onClose }) => {
  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () =>
    setCurrentIndex((prev) => (prev + 1) % images.length);

  const prevImage = () =>
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <div className="modal-content">
          <div className="modal-image-section">
            <button className="nav-btn left" onClick={prevImage}>
              ‹
            </button>

            <img
              src={images[currentIndex]}
              alt={product.name}
              className="modal-image"
            />

            <button className="nav-btn right" onClick={nextImage}>
              ›
            </button>
          </div>

          <div className="modal-details">
            <h2>{product.name}</h2>
            <p className="modal-price">₹{product.price}</p>

            <button className="buy-btn modal-buy"
         
          onClick={() => window.open(product.link, "_blank")}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;

