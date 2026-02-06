import React from "react";
import ProductCard from "../Components/ProductCard";
import img1 from "./Images/15 max.jpg";
import img3 from "./Images/Macbook.jpg";
import img2 from "./Images/s24.jpg";
import { useCartStore } from "../Store/cartStore";
import { useFavouriteStore } from "../Store/favouriteStore";

// 3 ta mahsulot listi
const products = [
  {
    id: 1,
    title: "iPhone 15 Pro",
    price: 1200,
    img: img1, // to'g'ri ishlatilgan
  },
  {
    id: 2,
    title: "Samsung S24",
    price: 1000,
    img: img2,
  },
  {
    id: 3,
    title: "Macbook Pro",
    price: 2500,
    img: img3,
  },
];

const Home = () => {
  const { cart, addToCart, increase, decrease } = useCartStore();
  const { toggleFavourite, isFavourite } = useFavouriteStore();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold mb-8 text-slate-800">Our Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
