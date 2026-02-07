import React from "react";
import { useFavouriteStore } from "../Store/favouriteStore";
import ProductCard from "../Components/ProductCard";
import img1 from "./Images/15 max.jpg";
import img2 from "./Images/Macbook.jpg";
import img3 from "./Images/s24.jpg";

const products = [
  { id: 1, title: "iPhone 15 Pro", price: 1200, img: img1 },
  { id: 2, title: "Samsung S24", price: 1000, img: img3 },
  { id: 3, title: "Macbook Pro", price: 2500, img: img2 },
];

const Favourite = () => {
  const { favourites } = useFavouriteStore();
  const favouriteProducts = products.filter((p) => favourites.includes(p.id));

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">

      {/* STARS */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,_rgba(255,255,255,0.15)_1px,_transparent_1px)] bg-[size:35px_35px]"></div>

      {/* BLOBS */}
      <div className="absolute top-[-120px] left-[-120px] w-[450px] h-[450px] bg-blue-500 rounded-full blur-[160px] opacity-40 animate-pulse"></div>
      <div className="absolute bottom-[-150px] right-[-150px] w-[500px] h-[500px] bg-pink-500 rounded-full blur-[180px] opacity-35 animate-[spin_20s_linear_infinite]"></div>
      <div className="absolute top-[40%] left-[35%] w-[350px] h-[350px] bg-purple-500 rounded-full blur-[150px] opacity-30 animate-[ping_4s_infinite]"></div>

      <div className="relative max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-extrabold mb-8 text-white drop-shadow-lg text-center">
          Favourite Products ❤️
        </h1>

        {favouriteProducts.length === 0 ? (
          <div className="flex flex-col items-center gap-6 bg-white/10 p-10 rounded-3xl backdrop-blur-xl border border-white/20 shadow-xl">
            <p className="text-gray-200 text-lg">Hech qanday Like yo‘q 😢</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {favouriteProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favourite;
