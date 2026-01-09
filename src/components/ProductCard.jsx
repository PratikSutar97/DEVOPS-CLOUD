import React, { useState } from "react";
import ProductModal from "./ProductModal";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const [showModal, setShowModal] = useState(false);

  const imageSrc =
    product.images && product.images.length > 0
      ? product.images[0]
      : product.image;

  return (
    <>
      <div className="product-card">
        <img
          src={imageSrc}
          alt={product.name}
          className="product-image"
        />

        {/* CLICKABLE PRODUCT NAME */}
        <h3
          className="product-name clickable"
          onClick={() => setShowModal(true)}
        >
          {product.name}
        </h3>

        <p className="product-price">₹{product.price}</p>

        {/* BUY BUTTON */}
        <button
          className="buy-btn"
          onClick={() => setShowModal(true)}
        >
          View Details
        </button>
      </div>

      {showModal && (
        <ProductModal
          product={product}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default ProductCard;

