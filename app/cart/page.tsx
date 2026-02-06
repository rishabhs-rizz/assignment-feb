"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";

type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

export default function Cart() {
  const [cartItems, setCartItems] = useState<{
    items: CartItem[];
    total: number;
  }>({ items: [], total: 0 });

  useEffect(() => {
    fetch("/api/cart")
      .then((res) => res.json())
      .then((data) => setCartItems(data));
  }, []);

  async function removeFromCart(itemId: string) {
    try {
      const res = await fetch(`api/cart/${itemId}`, { method: "DELETE" });
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setCartItems(data);
      } else {
        console.error("Failed to remove from cart");
      }
    } catch (error) {
      console.error("Remove from cart error:", error);
      return;
    }
  }
  return (
    <>
      {" "}
      <div>
        <div className="h-12 flex items-center justify-start px-4">
          <Link
            href={"/"}
            className="py-2 px-4 bg-blue-400 rounded-md text-center cursor-pointer hover:bg-blue-500 transition-colors duration-200 gap-1 text-white flex items-center"
            onClick={() => window.history.back()}
          >
            {" "}
            <BiArrowBack className="inline-block mr-1" />
            Go back
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-center bg-linear-to-r from-amber-500 to-orange-400 bg-clip-text text-transparent">
          Your Cart
        </h1>
        <h3 className="text-center text-lg mt-2 text-gray-600">
          Total Items: {cartItems.items.length} | Total Price: $
          {cartItems.total}
        </h3>
      </div>
      <div className="p-10 grid grid-cols-4 gap-6">
        {cartItems.items.map((item) => (
          <div
            key={item._id}
            className="border border-gray-300 rounded-lg p-4 bg-gray-100 hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={item.image}
              alt={item.name}
              className=" rounded-lg object-cover h-44 w-full"
            />
            <h2 className="font-bold text-lg mt-2 truncate">{item.name}</h2>
            <p className="text-sm text-gray-600">
              ${item.price} x {item.quantity}
            </p>
            <button
              onClick={() => removeFromCart(item._id)}
              className="w-full bg-linear-to-r from-amber-500 to-orange-400 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-gray-500/30 hover:shadow-xl hover:shadow-gray-500/40 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer mt-4"
            >
              Remove from Cart
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
