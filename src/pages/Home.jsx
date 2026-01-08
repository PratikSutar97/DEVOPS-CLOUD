import { useEffect, useState } from "react";
import { fetchProducts } from "../firebase/products";
import CategorySection from "../components/CategorySection";
import CategoryBar from "../components/CategoryBar";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  const grouped = products.reduce((acc, p) => {
    acc[p.category] = acc[p.category] || [];
    acc[p.category].push(p);
    return acc;
  }, {});

  const categories = Object.keys(grouped);

  return (
    <>
      <CategoryBar categories={categories} />
      {categories.map(cat => (
        <CategorySection
          key={cat}
          title={cat}
          products={grouped[cat]}
        />
      ))}
    </>
  );
}

