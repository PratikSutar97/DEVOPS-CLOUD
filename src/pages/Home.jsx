import { useEffect, useState } from "react";
import { fetchProducts } from "../firebase/products";
import CategorySection from "../components/CategorySection";
import CategoryBar from "../components/CategoryBar";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  /* 🔍 SEARCH FILTER */
  const filteredProducts = search
    ? products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
    : products;

  /* GROUP BY CATEGORY */
  const grouped = filteredProducts.reduce((acc, p) => {
    acc[p.category] = acc[p.category] || [];
    acc[p.category].push(p);
    return acc;
  }, {});

  const categories = Object.keys(grouped);

  return (
    <>
      {/* 🔍 SEARCH BOX */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <CategoryBar categories={categories} />

      {categories.length === 0 && (
        <p className="no-results">No products found</p>
      )}

      {categories.map(cat => (
        <CategorySection
          key={cat}
          title={cat}
          products={grouped[cat]}
          hideViewAll={!!search}
        />
      ))}
    </>
  );
}

