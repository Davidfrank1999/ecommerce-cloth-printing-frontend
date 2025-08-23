import { useState } from "react";
import { uploadImage } from "../../services/uploads";
import { createProduct } from "../../services/products";

export default function CreateProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(499);
  const [category, setCategory] = useState("Men");
  const [images, setImages] = useState([]);
  const [file, setFile] = useState();

  async function handleUpload() {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = async () => {
      const { url } = await uploadImage(reader.result);
      setImages((prev) => [...prev, url]);
    };
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await createProduct({ title, price, category, images });
    alert("Product created!");
    setTitle(""); setPrice(499); setCategory("Men"); setImages([]);
  }

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-xl font-bold mb-4">Create Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="border p-2 w-full" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Title" />
        <input className="border p-2 w-full" type="number" value={price} onChange={(e)=>setPrice(Number(e.target.value))} placeholder="Price" />
        <select className="border p-2 w-full" value={category} onChange={(e)=>setCategory(e.target.value)}>
          <option>Men</option><option>Women</option><option>Kids</option>
        </select>

        <div className="border p-2">
          <input type="file" onChange={(e)=>setFile(e.target.files[0])} />
          <button type="button" onClick={handleUpload} className="ml-2 px-3 py-1 border rounded">Upload Image</button>
          <div className="mt-2 flex gap-2 flex-wrap">
            {images.map((url, i) => <img key={i} src={url} className="w-16 h-16 object-cover rounded" />)}
          </div>
        </div>

        <button className="bg-primary text-white px-4 py-2 rounded">Save</button>
      </form>
    </div>
  );
}
