export function ProductCardSkeleton() {
  return (
    <div className="product-card skeleton-card">
      <div className="skeleton-image"></div>
      <div className="product-info">
        <div className="skeleton-text skeleton-title"></div>
        <div className="skeleton-text skeleton-price"></div>
        <div className="skeleton-button"></div>
      </div>
    </div>
  );
}

export function CategoryProductCardSkeleton() {
  return (
    <div className="category-product-card skeleton-card">
      <div className="skeleton-image skeleton-image-large"></div>
      <div className="skeleton-text skeleton-title"></div>
      <div className="skeleton-text skeleton-price"></div>
      <div className="skeleton-button"></div>
    </div>
  );
}

export function CategorySectionSkeleton() {
  return (
    <section className="category-section">
      <div className="skeleton-text skeleton-category-title"></div>
      <div className="product-scroll">
        {[...Array(4)].map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}

export function CategoryBarSkeleton() {
  return (
    <div className="category-bar">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="skeleton-pill"></div>
      ))}
    </div>
  );
}
