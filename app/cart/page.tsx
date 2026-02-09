"use client";
import { set } from "mongoose";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiArrowBack, BiX } from "react-icons/bi";

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
  const [isLoading, setIsLoading] = useState(true);
  const [checkOutBoxVisible, setCheckOutBoxVisible] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [checkoutData, setCheckoutData] = useState<{
    total: number;
    TotalItems: number;
    timeStamp: string;
  } | null>(null);

  async function LoadItems() {
    await fetch("/api/cart")
      .then((res) => res.json())
      .then((data) => setCartItems(data));
    setIsLoading(false);
  }

  useEffect(() => {
    LoadItems();
  }, []);

  async function removeFromCart(itemId: string) {
    try {
      const res = await fetch(`api/cart/${itemId}`, { method: "DELETE" });
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        LoadItems();
      } else {
        console.error("Failed to remove from cart");
      }
    } catch (error) {
      console.error("Remove from cart error:", error);
      return;
    }
  }

  async function handleCheckout() {
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        console.log("Checkout successful:", data);
        setCheckoutData(data);
        setCheckOutBoxVisible(false);
        setName("");
        setAddress("");
        LoadItems();
      } else {
        console.error("Checkout failed");
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  }
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : cartItems.items.length === 0 ? (
        <div className="text-center">
          <div className="h-12 flex items-center justify-between px-4">
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
          <h2 className="text-2xl font-bold">Your cart is empty</h2>
        </div>
      ) : (
        <>
          {checkOutBoxVisible && (
            <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                <div className="absolute right-4 top-2">
                  <BiX
                    className="cursor-pointer"
                    onClick={() => setCheckOutBoxVisible(false)}
                  />
                </div>
                <h2 className="text-2xl font-bold mb-4">Checkout</h2>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Name"
                  className="w-full mb-2 p-2 border border-gray-300 rounded-md"
                />
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  type="text"
                  placeholder="Address"
                  className="w-full mb-2 p-2 border border-gray-300 rounded-md"
                />
                <p className="mb-4">Total: ${cartItems.total}</p>
                <button
                  onClick={() => handleCheckout()}
                  className="w-full bg-linear-to-r from-amber-500 to-orange-400 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-gray-500/30 hover:shadow-xl hover:shadow-gray-500/40 transition-all duration-300 cursor-pointer"
                >
                  Submit
                </button>
              </div>
            </div>
          )}

          {checkoutData && (
            <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-60">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                <div className="absolute right-4 top-2">
                  <BiX
                    className="cursor-pointer"
                    onClick={() => setCheckoutData(null)}
                  />
                </div>
                <h2 className="text-2xl font-bold mb-4">Checkout Successful</h2>
                <p className="mb-2">Total Items: {checkoutData.TotalItems}</p>
                <p className="mb-2">Total Price: ${checkoutData.total}</p>
                <p className="mb-4">
                  Timestamp: {new Date(checkoutData.timeStamp).toLocaleString()}
                </p>
              </div>
            </div>
          )}

          <div>
            <div className="h-12 flex items-center justify-between px-4">
              <Link
                href={"/"}
                className="py-2 px-4 bg-blue-400 rounded-md text-center cursor-pointer hover:bg-blue-500 transition-colors duration-200 gap-1 text-white flex items-center"
              >
                {" "}
                <BiArrowBack className="inline-block mr-1" />
                Go back
              </Link>
              <button
                onClick={() => setCheckOutBoxVisible(true)}
                className="py-2 px-4 bg-amber-400 rounded-md text-center cursor-pointer hover:bg-amber-500 transition-colors duration-200 gap-1 text-white flex items-center"
              >
                Checkout
              </button>
            </div>

            <h1 className="text-4xl font-bold text-center bg-linear-to-r from-amber-500 to-orange-400 bg-clip-text text-transparent">
              Your Cart
            </h1>
            <h3 className="text-center text-lg mt-2 text-gray-600">
              Total Items:{" "}
              {cartItems.items.reduce((sum, item) => sum + item.quantity, 0)} |
              Total Price: ${cartItems.total}
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
      )}
    </>
  );
}
