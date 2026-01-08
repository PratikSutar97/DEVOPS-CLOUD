import { Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import "./styles.css";

export default function App() {
  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.body.className = dark ? "dark" : "";
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <>
      <header className="header">
   <div className="header-left">
    <Link to="/" className="brand-link">
      <div className="logo-wrapper">
        <img
          src="/src/assets/logo.png"
          alt="Useful Products"
          className="site-logo"
        />
      </div>
    </Link>
  </div>

  {/* CENTER: SITE NAME */}
  <Link to="/" className="brand-link brand-title">
    <div className="logo">USEFULL PRODUCTS</div>
  </Link>
  {/* RIGHT: THEME TOGGLE */}
  <button
    className="theme-toggle"
    onClick={() => setDark(!dark)}
  >
    {dark ? "☀️ Light" : "🌙 Dark"}
  </button>
</header>

      {/* ✅ ALL ROUTES MUST BE INSIDE THIS */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/category/:categoryName"
          element={<CategoryPage />}
        />
        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />
      </Routes>

      <footer className="footer">
        © 2023 InfoSpherre Store. All rights reserved.
      </footer>
    </>
  );
}

