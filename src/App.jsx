import { Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import "./styles.css";
import logo from "./assets/logo.png";

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
          src={logo}
          alt="Useful Products"
          className="site-logo"
        />
      </div>
    </Link>
  </div>

  {/* CENTER: SITE NAME */}
  <Link to="/" className="brand-link brand-title">
    <div className="logo"><h1>USEFULL PRODUCTS</h1></div>
  </Link>
  {/* RIGHT: THEME TOGGLE */}
  <button
    className="theme-toggle"
    onClick={() => setDark(!dark)}
  >
     <span className="icon">{dark ? "☀️" : "🌙"}</span>
  <span className="text">{dark ? "Light" : "Dark"}</span>
    {/* {dark ? "☀️ Light" : "🌙 Dark"} */}
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

