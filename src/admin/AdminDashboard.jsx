import { useEffect, useState } from "react";
import {
  fetchProducts,
  fetchCategories
} from "../firebase/products";
import ProductForm from "./ProductForm";
import { logoutAdmin } from "../firebase/auth";
import { useNavigate } from "react-router-dom";
import AdminProductItem from "./AdminProductItem";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const navigate = useNavigate();

  const load = async () => {
    const data = await fetchProducts();
    setProducts(data);

    const cats = await fetchCategories();
    setCategories(cats);
  };

  useEffect(() => {
    load();
  }, []);

  const filteredProducts =
    selectedCategory === "ALL"
      ? products
      : products.filter(p => p.category === selectedCategory);

  return (
    <div className="admin-panel">
      {/* HEADER */}
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <button
          className="admin-logout"
          onClick={() => {
            logoutAdmin();
            navigate("/admin");
          }}
        >
          Logout
        </button>
      </div>

      {/* ADD PRODUCT FORM */}
      <ProductForm onAdd={load} />

      {/* CATEGORY FILTER */}
      <div className="admin-filter">
        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
        >
          <option value="ALL">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* PRODUCT LIST */}
      <div className="admin-list">
        {filteredProducts.length === 0 && (
          <p style={{ opacity: 0.6 }}>No products found</p>
        )}

        {filteredProducts.map(product => (
          <AdminProductItem
            key={product.id}
            product={product}
            onChange={load}
          />
        ))}
      </div>
    </div>
  );
}

