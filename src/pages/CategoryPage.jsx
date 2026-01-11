import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProducts } from "../firebase/products";
import { CategoryProductCardSkeleton } from "../components/Skeleton";
import { Helmet } from "react-helmet-async"; // ✅ ADD

function ProductImageCarousel({ images, productName }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageList = images || [];

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === imageList.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="product-image-carousel">
      {imageList.length > 1 && (
        <button className="carousel-btn carousel-prev" onClick={handlePrev}>
          ‹
        </button>
      )}

      <div className="carousel-images">
        {imageList.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`${productName} - image ${idx + 1}`}
            loading="lazy"
            style={{ display: idx === currentIndex ? "block" : "none" }}
          />
        ))}
      </div>

      {imageList.length > 1 && (
        <button className="carousel-btn carousel-next" onClick={handleNext}>
          ›
        </button>
      )}
    </div>
  );
}
const categoryIntroMap = {
  "Wrist Watches":
    "Explore stylish and reliable wrist watches for daily wear, office use, and special occasions. These Amazon watches are selected for quality, design, and value for money.",

  "Mobile Accessories":
    "Discover useful mobile accessories including chargers, cables, holders, and protection tools that enhance your smartphone experience.",

  "Laptop Accessories":
    "Browse practical laptop accessories such as stands, bags, keyboards, and cleaning tools designed to improve productivity and device safety.",

  "Home Decor Items":
    "Explore useful home decor items that enhance your living space. These products are chosen for aesthetics, durability, and everyday usability.",

  "Clothing & Accessories":
    "Find trending clothing and fashion accessories that combine comfort, style, and affordability for everyday use.",

  "Smart Phones":
    "Discover smart phones with modern features, performance efficiency, and great value, suitable for daily communication and entertainment needs."
};


export default function CategoryPage() {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("default");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchProducts()
      .then((all) => setProducts(all.filter((p) => p.category === categoryName)))
      .finally(() => setLoading(false));
  }, [categoryName]);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === "low-to-high") {
      return (parseFloat(a.price) || 0) - (parseFloat(b.price) || 0);
    }
    if (sortOrder === "high-to-low") {
      return (parseFloat(b.price) || 0) - (parseFloat(a.price) || 0);
    }
    return 0;
  });

  return (
    <>
      {/* ✅ SEO ONLY — NO UI CHANGE */}
      <Helmet>
        <title>Best {categoryName} Products on Amazon</title>
        <meta
          name="description"
          content={`Explore top-rated ${categoryName} products on Amazon. Useful, affordable, and trending items.`}
        />
        <meta name="robots" content="index, follow" />
        {/* ✅ FAQ Schema (Invisible, SEO-only) */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": `What are the best ${categoryName} products on Amazon?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `The best ${categoryName} products on Amazon are those that provide practical value, positive customer reviews, and reliable quality.`
          }
        },
        {
          "@type": "Question",
          "name": `Are ${categoryName} products affordable?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Yes, most ${categoryName} products listed here are selected for affordability and value for money.`
          }
        },
        {
          "@type": "Question",
          "name": `How often are ${categoryName} products updated?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `This category is updated regularly to include trending and highly rated Amazon products.`
          }
        }
      ]
    })}
  </script>
      </Helmet>

      {/* ⬇️ ORIGINAL UI UNCHANGED */}
      <div className="category-page">
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back to Home
        </button>

        <div className="category-header">
          <h2 className="category-title">{categoryName}</h2>
          <p className="category-intro">
  {categoryIntroMap[categoryName] ||
    `Browse useful ${categoryName} products on Amazon. These items are selected for quality, usefulness, and value for money.`}
</p>
          <div className="sort-filter">
            <label>Sort by Price:</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="low-to-high">Low to High</option>
              <option value="high-to-low">High to Low</option>
            </select>
          </div>
        </div>

        <div className="products-grid">
          {loading ? (
            [...Array(6)].map((_, i) => (
              <CategoryProductCardSkeleton key={i} />
            ))
          ) : (
            sortedProducts.map((p) => (
              <div key={p.id} className="category-product-card">
                <ProductImageCarousel
                  images={p.images}
                  productName={p.name}
                />
                <h3>{p.name}</h3>
                <p className="price">₹{p.price}</p>
                <button
                  className="buy-btn"
                  onClick={() => window.open(p.link, "_blank")}
                >
                  View Details & Buy
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
