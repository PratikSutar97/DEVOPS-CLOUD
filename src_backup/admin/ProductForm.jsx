import { useEffect, useState } from "react";
import { addProduct, fetchCategories } from "../firebase/products";

export default function ProductForm({ onAdd }) {
  const [categories, setCategories] = useState([]);
  const [useNewCategory, setUseNewCategory] = useState(false);

  const [data, setData] = useState({
    name: "",
    price: "",
    category: "",
    link: "",
    images: ""
  });

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    if (!data.category) {
      alert("Please select or add a category");
      return;
    }

    await addProduct({
      ...data,
      price: Number(data.price),
      images: data.images.split(",").map(i => i.trim())
    });

    setData({
      name: "",
      price: "",
      category: "",
      link: "",
      images: ""
    });

    onAdd();
  };

  return (
    <form className="admin-form" onSubmit={submit}>
      <h3>Add Product</h3>

      <input
        placeholder="Product Name"
        value={data.name}
        onChange={e => setData({ ...data, name: e.target.value })}
        required
      />

      <input
        placeholder="Price"
        type="number"
        value={data.price}
        onChange={e => setData({ ...data, price: e.target.value })}
        required
      />

      {/* CATEGORY DROPDOWN */}
      {!useNewCategory ? (
        <>
          <select
            value={data.category}
            onChange={e => setData({ ...data, category: e.target.value })}
            required
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <button
            type="button"
            className="link-btn"
            onClick={() => setUseNewCategory(true)}
          >
            + Add New Category
          </button>
        </>
      ) : (
        <>
          <input
            placeholder="New Category Name"
            value={data.category}
            onChange={e => setData({ ...data, category: e.target.value })}
            required
          />
          <button
            type="button"
            className="link-btn"
            onClick={() => setUseNewCategory(false)}
          >
            ← Use Existing Category
          </button>
        </>
      )}

      <input
        placeholder="Amazon Product Link"
        value={data.link}
        onChange={e => setData({ ...data, link: e.target.value })}
        required
      />

      <input
        placeholder="Image URLs (comma separated)"
        value={data.images}
        onChange={e => setData({ ...data, images: e.target.value })}
        required
      />

      <button className="admin-add">Add Product</button>
    </form>
  );
}

