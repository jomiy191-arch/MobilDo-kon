import React from "react";
import { useFavouriteStore } from "../Store/favouriteStore";
import ProductCard from "../Components/ProductCard";

// Lokal rasmlar import qilingan
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
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold mb-8 text-slate-800">
        Favourite Products ❤️
      </h1>

      {favouriteProducts.length === 0 ? (
        <p className="text-gray-500 text-lg">Hech qanday Like yo‘q </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favouriteProducts.map((product) => (
            <ProductCard key={product.id} product={product} showCartButtons={false} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourite;
