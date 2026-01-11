import { useEffect, useState } from "react";
import { fetchProducts } from "../firebase/products";
import CategorySection from "../components/CategorySection";
import CategoryBar from "../components/CategoryBar";
import { CategorySectionSkeleton, CategoryBarSkeleton } from "../components/Skeleton";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
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
      <meta name="google-site-verification" content="EYH2rcIV45412iScORQay2BdTPKo2QWnHyKRehIIqy8" />
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <>
          <CategoryBarSkeleton />
          {[...Array(3)].map((_, i) => (
            <CategorySectionSkeleton key={i} />
          ))}
        </>
      ) : (
        <>
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
      )}
    </>
  );
}

