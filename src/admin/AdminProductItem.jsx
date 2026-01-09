import { useState } from "react";
import { deleteProduct, updateProduct } from "../firebase/products";

export default function AdminProductItem({ product, onChange }) {
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({});

  const imageArrayToString = (images) =>
    Array.isArray(images) ? images.join(", ") : "";

  const save = async () => {
    const payload = {
      name: form.name,
      price: Number(form.price),
      category: form.category
    };

    if (form.link) payload.link = form.link;

    if (form.image) {
      payload.images = form.image
        .split(",")
        .map(url => url.trim())
        .filter(Boolean);
    }

    await updateProduct(product.id, payload);
    setEdit(false);
    onChange();
  };

  return (
    <div className="admin-item">
      {edit ? (
        <>
          <input
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />

          <input
            value={form.price}
            onChange={e => setForm({ ...form, price: e.target.value })}
          />

          <input
            value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}
          />

          <input
            value={form.link}
            onChange={e => setForm({ ...form, link: e.target.value })}
          />

          <input
            value={form.image}
            onChange={e => setForm({ ...form, image: e.target.value })}
            placeholder="Image URLs (comma separated)"
          />

          <button onClick={save}>Save</button>
          <button onClick={() => setEdit(false)}>Cancel</button>
        </>
      ) : (
        <>
          <div>
            <strong>{product.name}</strong>
            <div className="admin-meta">
              ₹{product.price} • {product.category}
            </div>
          </div>

          <button
            onClick={() => {
              setForm({
                name: product.name || "",
                price: product.price || "",
                category: product.category || "",
                link: product.link || "",
                image: imageArrayToString(product.images)
              });
              setEdit(true);
            }}
          >
            Edit
          </button>

          <button
            className="admin-delete"
            onClick={() => deleteProduct(product.id).then(onChange)}
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
}

