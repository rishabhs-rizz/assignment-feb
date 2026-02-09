"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CgShoppingCart } from "react-icons/cg";

type Product = {
  _id: string;
  name: string;
  price: number;
  image?: string;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartCount, setCartCount] = useState(0);

  async function LoadProducts() {
    await fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }

  useEffect(() => {
    LoadProducts();
  }, []);

  async function LoadCartCount() {
    await fetch("/api/cart")
      .then((res) => res.json())
      .then((data) => {
        console.log("Cart data:", data);
        setCartCount(data.items.length);
      });
  }

  useEffect(() => {
    LoadCartCount();
  }, []);

  async function AddtoCart({
    productId,
    qty,
  }: {
    productId: string;
    qty: number;
  }) {
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, qty }),
      });
      if (res.ok) {
        const data = await res.json();
        console.log("Added to cart:", data);
        LoadCartCount();
        setCartCount(data.items.length);
      } else {
        console.error("Failed to add to cart");
      }
    } catch (error) {
      console.error("Add to cart error:", error);
    }
  }
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <div className="border-[#CAC8B8] border-2 h-15 flex justify-between items-center px-10 text-black">
        <h1 className="font-bold text-3xl bg-linear-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent tracking-tight">
          CartoMart
        </h1>

        <Link
          href="/cart"
          className="relative hover:scale-110 transition-transform duration-200 cursor-pointer"
        >
          <CgShoppingCart className="text-3xl text-slate-700 hover:text-amber-600 transition-colors duration-200" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg animate-pulse">
              {cartCount}
            </span>
          )}
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12 space-y-3">
          <h2 className="text-5xl font-black text-slate-800 tracking-tight">
            Featured Collection
          </h2>
          <p className="text-lg text-orange-500 max-w-2xl mx-auto">
            Discover our carefully curated selection of premium products
          </p>
        </div>

        {/* heere's Products Grid */}
        <div className="p-10 grid grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="border border-gray-300 rounded-lg p-4 bg-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={product.image}
                alt={product.name}
                className=" rounded-lg object-cover h-44 w-full"
              />
              <h2 className="font-bold text-lg mt-2 truncate">
                {product.name}
              </h2>
              <p className="text-gray-600">${product.price}</p>
              <button
                onClick={() => AddtoCart({ productId: product._id, qty: 1 })}
                className="w-full bg-linear-to-r from-amber-500 to-orange-400 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-gray-500/30 hover:shadow-xl hover:shadow-gray-500/40 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer mt-4"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
