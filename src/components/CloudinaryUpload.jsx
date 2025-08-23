import { useState } from "react";

const CloudinaryUpload = ({ setImages }) => {
  const openWidget = () => {
    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
        uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
        folder: "products",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          const url = result.info.secure_url;
          setImages((prev) => [...prev, url]);
        }
      }
    );

    myWidget.open();
  };

  return (
    <button
      onClick={openWidget}
      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
    >
      Upload Image
    </button>
  );
};

export default CloudinaryUpload;
