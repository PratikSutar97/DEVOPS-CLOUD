import { useNavigate, useLocation } from "react-router-dom";

export default function CategoryBar({ categories }) {
  const navigate = useNavigate();
  const location = useLocation();

  const activeCategory = decodeURIComponent(
    location.pathname.split("/category/")[1] || ""
  );

  return (
    <div className="category-bar">
      {categories.map(cat => (
        <button
          key={cat}
          className={`category-pill ${
            activeCategory === cat ? "active" : ""
          }`}
          onClick={() => navigate(`/category/${encodeURIComponent(cat)}`)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

