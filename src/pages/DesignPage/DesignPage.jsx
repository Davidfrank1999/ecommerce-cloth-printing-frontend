// inside DesignPage.jsx
import React, { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF, Decal, Html, Center } from "@react-three/drei";
import * as THREE from "three";

function TShirt({ color, decalTexture, decalSettings }) {
  const { scene } = useGLTF("/models/tshirt.glb");

  scene.traverse((child) => {
    if (child.isMesh) {
      child.material = child.material.clone();
      child.material.color.set(color);
    }
  });

  return (
    <Center>
      <group scale={1.8} position={[0, -0.5, 0]}>
        <primitive object={scene} />
        {decalTexture && (
          <Decal
            position={decalSettings.position}
            rotation={decalSettings.rotation}
            scale={decalSettings.scale}
            map={decalTexture}
          />
        )}
      </group>
    </Center>
  );
}

export default function DesignPage() {
  const [shirtColor, setShirtColor] = useState("#ffffff");
  const [decalTexture, setDecalTexture] = useState(null);
  const [decalSettings, setDecalSettings] = useState({
    position: [0, 0.2, 0.35],
    rotation: [0, 0, 0],
    scale: 0.6,
  });
  const [clipArts, setClipArts] = useState([]);

  // Fetch cliparts from backend
  useEffect(() => {
    async function fetchClipArts() {
      try {
        const res = await fetch("http://localhost:5000/api/cliparts");
        const data = await res.json();
        setClipArts(data);
      } catch (err) {
        console.error("❌ Error fetching cliparts:", err);
      }
    }
    fetchClipArts();
  }, []);

  // Upload new clipart → backend → Cloudinary
  const handleClipartUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5000/api/cliparts/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      // Update cliparts instantly
      setClipArts((prev) => [...prev, data]);

      // Immediately apply to T-shirt as decal
      new THREE.TextureLoader().load(data.url, (texture) => {
        setDecalTexture(texture);
      });
    } catch (err) {
      console.error("❌ Upload failed:", err);
    }
  };

  const handleSelectClipart = (url) => {
    new THREE.TextureLoader().load(url, (texture) => {
      setDecalTexture(texture);
    });
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)] bg-gray-50">
      {/* Sidebar */}
      <aside className="w-full lg:w-[28%] bg-white border-r shadow-lg p-6 flex flex-col overflow-y-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Customize Your T-Shirt</h2>

        {/* Shirt Color */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-2">Shirt Color</label>
          <input
            type="color"
            value={shirtColor}
            onChange={(e) => setShirtColor(e.target.value)}
            className="w-12 h-12 border rounded-lg shadow cursor-pointer"
          />
        </div>

        {/* Upload New Clipart */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-2">Upload Clipart</label>
          <label className="cursor-pointer flex items-center justify-center px-4 py-3 bg-indigo-600 text-white text-sm font-medium rounded-lg shadow hover:bg-indigo-700 transition w-full">
            Upload File
            <input type="file" accept="image/*" onChange={handleClipartUpload} className="hidden" />
          </label>
        </div>

        {/* Choose Cliparts */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-2">Or Choose Clipart</label>
          <div className="grid grid-cols-3 gap-3">
            {clipArts.length > 0 ? (
              clipArts.map((clip) => (
                <img
                  key={clip.id}
                  src={clip.url}
                  alt={clip.id}
                  onClick={() => handleSelectClipart(clip.url)}
                  className="w-full h-20 object-cover rounded-lg border cursor-pointer hover:ring-2 hover:ring-indigo-600 transition"
                />
              ))
            ) : (
              <p className="text-sm text-gray-400 col-span-3">No cliparts yet</p>
            )}
          </div>
        </div>

        {/* CTA */}
        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold shadow transition">
          Save & Add to Cart
        </button>
      </aside>

      {/* 3D T-Shirt */}
      <main className="flex-1 flex items-center justify-center bg-gray-100">
        <Canvas camera={{ position: [0, 0, 3.5], fov: 40 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.6} />
          <Suspense fallback={<Html center>Loading T-shirt...</Html>}>
            <TShirt color={shirtColor} decalTexture={decalTexture} decalSettings={decalSettings} />
          </Suspense>
          <OrbitControls enableZoom enableRotate />
          <Environment preset="studio" />
        </Canvas>
      </main>
    </div>
  );
}
