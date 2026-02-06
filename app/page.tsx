"use client";
import { useEffect, useState } from "react";
import { CgShoppingCart } from "react-icons/cg";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <div className="border-[#CAC8B8] border-2 h-15 flex justify-between items-center px-10 text-black">
        <h1 className="font-bold text-3xl bg-linear-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent tracking-tight">
          CartoMart
        </h1>

        <button
          className="relative hover:scale-110 transition-transform duration-200 cursor-pointer"
          onClick={() => setCartCount(cartCount + 1)}
        >
          <CgShoppingCart className="text-3xl text-slate-700 hover:text-amber-600 transition-colors duration-200" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg animate-pulse">
              {cartCount}
            </span>
          )}
        </button>
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

        {/* Products Grid */}
        <div className="p-10 grid grid-cols-4 gap-6">
          {products.map((product: any) => (
            <div
              key={product.id}
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
              <button className="w-full bg-linear-to-r from-amber-500 to-orange-400 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-gray-500/30 hover:shadow-xl hover:shadow-gray-500/40 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer mt-4">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

//  {products.map((product: any) => (
//           <div
//             key={product.id}
//             className="border border-gray-300 rounded-lg p-4"
//           >
//             <img
//               src={product.image}
//               alt={product.name}
//               className="w-full h-48 object-cover rounded-lg"
//             />
//             <h2 className="font-bold text-lg mt-2">{product.name}</h2>
//             <p className="text-gray-600">${product.price}</p>
//           </div>
//         ))}
