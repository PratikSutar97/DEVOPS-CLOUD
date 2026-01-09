import ProductCard from "./ProductCard";

export default function CategorySection({ title, products }) {
  return (
    <section className="category-section">
      <h2 className="category-title">{title}</h2>

      <div className="product-scroll">
        {products.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

