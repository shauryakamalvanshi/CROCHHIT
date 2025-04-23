"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Card = () => {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  const getProducts = async () => {
    try {
      const res = await axios.get("/api/product/getProduct");
      setProducts(res.data.products || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleClick = (id) => {
    router.push(`/product/${id}`);
  };

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
      {products.map((product) => (
        <div
          key={product._id}
          onClick={() => handleClick(product._id)}
          className="flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300"
        >
          <div className="mx-4 mt-4 h-96 overflow-hidden rounded-xl">
            <img
              src={product.images?.[0] || "https://via.placeholder.com/300"}
              className="h-full w-full object-cover"
              alt={product.title}
            />
          </div>
          <div className="p-6">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-base font-medium">{product.title}</p>
              <p className="text-base font-medium">₹ {product.price}</p>
            </div>
            <p className="text-sm text-gray-700 opacity-75">
              {product.description}
            </p>
          </div>
          <div className="p-6 pt-0">
            <button
              className="block w-full rounded-lg bg-blue-gray-900/10 py-3 px-6 text-center text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105"
              type="button"
              onClick={(e) => {
                e.stopPropagation(); // prevents card click navigation
                // handle add to cart here
              }}
            >
              Add to cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
