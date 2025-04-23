"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductOverview = ({ params }) => {
  const { product: productId } = params;

  const [productData, setProductData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const res = await axios.post("/api/product/getSingleProductDetail", {
        productId,
      });

      const product = res.data.product;
      setProductData(product);
      setSelectedImage(product.images[0]);
    } catch (error) {
      console.error("Error in getting single product data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-lg">Loading...</div>;
  }

  if (!productData) {
    return (
      <div className="text-center py-20 text-red-500 text-lg">
        Product not found.
      </div>
    );
  }

  return (
    <div className="bg-white px-4 md:px-12 lg:px-24 py-12 max-w-screen-xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Image Viewer (Left) */}
        <div className="flex flex-col gap-6">
          <div className="w-full max-w-md mx-auto aspect-square overflow-hidden rounded-2xl bg-gray-100 shadow-md">
            <img
              src={selectedImage}
              alt="Selected Product"
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>

          <div className="flex gap-4 justify-center flex-wrap">
            {productData.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                onClick={() => setSelectedImage(img)}
                className={`h-16 w-16 rounded-lg object-cover cursor-pointer border-2 transition ${
                  selectedImage === img
                    ? "border-gray-900 ring-2 ring-gray-300"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Product Info (Right) */}
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {productData.title}
            </h1>
            <p className="mt-3 text-gray-600 text-base md:text-lg">
              {productData.description}
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-2xl font-semibold text-gray-800">
              ₹{(productData.price / 100).toFixed(2)}
            </p>
            <p className="text-sm text-gray-500">
              Category: {productData.category}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button className="bg-gray-900 text-white px-6 py-3 rounded-xl text-lg font-medium hover:bg-gray-800 transition">
              Add to Cart
            </button>
            <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-xl text-lg font-medium hover:bg-gray-100 transition">
              Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOverview;
