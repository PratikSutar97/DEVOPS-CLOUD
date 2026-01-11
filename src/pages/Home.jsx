import { useEffect, useState } from "react";
import { fetchProducts } from "../firebase/products";
import CategorySection from "../components/CategorySection";
import CategoryBar from "../components/CategoryBar";
import { CategorySectionSkeleton, CategoryBarSkeleton } from "../components/Skeleton";
import { Helmet } from "react-helmet-async"; // ✅ SEO import

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
      {/* ✅ SEO ONLY – SAFE */}
      <Helmet>
        <title>Useful Amazon Products | Daily Life Gadgets & Deals</title>
        <meta
          name="description"
          content="Discover useful Amazon products for daily life. Handpicked gadgets, home essentials, decor items, and budget-friendly deals."
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      {/* 🔍 SEARCH BOX (ORIGINAL UI – UNCHANGED) */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
          {/* ✅ SEO INTRO TEXT (SAFE POSITION) */}
    <section className="home-intro">
      <h1>Useful Amazon Products for Daily Life</h1>

      <p>
        We curate useful Amazon products that solve everyday problems. From home
        decor items and kitchen gadgets to budget-friendly tools, our goal is to
        help you find practical, affordable products quickly.
      
        All products are handpicked based on usefulness, popularity, and value
        for money. We regularly update our collections to include trending and
        highly rated Amazon finds.
      </p>
    </section>
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
