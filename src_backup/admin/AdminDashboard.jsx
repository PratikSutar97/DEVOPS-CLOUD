import { useEffect, useState } from "react";
import { fetchProducts, deleteProduct } from "../firebase/products";
import ProductForm from "./ProductForm";
import { logoutAdmin } from "../firebase/auth";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const load = () => fetchProducts().then(setProducts);

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <button className="admin-logout" onClick={() => {
          logoutAdmin();
          navigate("/admin");
        }}>
          Logout
        </button>
      </div>

      <ProductForm onAdd={load} />

      <div className="admin-list">
        {products.map(p => (
          <div key={p.id} className="admin-item">
            <div>
              <strong>{p.name}</strong>
              <div className="admin-meta">
                ₹{p.price} • {p.category}
              </div>
            </div>
            <button
              className="admin-delete"
              onClick={() => deleteProduct(p.id).then(load)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

