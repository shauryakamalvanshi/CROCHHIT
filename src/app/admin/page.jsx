"use client";
import React, { useState } from "react";
import { UploadButton } from "@/utils/uploadthing";
import Link from "next/link";
import axios from "axios";

const categories = [
  "Phone charms", "Key chains", "Earrings", "Plushies", "Crochet",
  "Bouquet", "Fridge magnets", "Pouches", "Scrunchies", "Hairclips", "Cards"
];

const AdminAddProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
    images: Array(3).fill(null),
  });
  console.log(formData);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (index, url) => {
    const updatedImages = [...formData.images];
    updatedImages[index] = url;
    setFormData(prev => ({ ...prev, images: updatedImages }));
  };

  const addData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/product/addProduct", formData);
      console.log("Product added:", response.data);
      // Optionally reset form
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="bg-white p-8 max-w-4xl mx-auto rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Add New Product</h2>
      <form onSubmit={addData} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-xl p-3"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="mt-1 block w-full border border-gray-300 rounded-xl p-3"
            required
          />
        </div>

        {/* Price & Quantity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-xl p-3"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-xl p-3"
              required
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-xl p-3"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Image Uploads */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[0, 1, 2].map((index) => (
            <div key={index}>
              <UploadButton
                className="border border-gray-300 rounded-xl p-2"
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  const uploadedFile = res[0];
                  if (uploadedFile?.ufsUrl) {
                    handleImageChange(index, uploadedFile.ufsUrl);
                  }
                }}
                onUploadError={(error) => {
                  alert(`Upload error: ${error.message}`);
                }}
              />
              <div className="mt-2 text-sm text-gray-500">
                {formData.images[index] ? (
                  <Link href={formData.images[index]} target="_blank">
                    <img
                      src={formData.images[index]}
                      alt={`Uploaded ${index + 1}`}
                      className="mt-2 rounded-lg w-full h-32 object-cover"
                    />
                  </Link>
                ) : (
                  "No file uploaded yet"
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-3 rounded-xl text-lg font-semibold hover:bg-gray-700 transition"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminAddProduct;
