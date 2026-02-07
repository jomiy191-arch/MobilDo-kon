import React from "react";
import { useCartStore } from "../Store/cartStore";
import { useFavouriteStore } from "../Store/favouriteStore";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FiPlus, FiMinus } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";

const ProductCard = ({ product }) => {
  const { cart, addToCart, increase, decrease } = useCartStore();
  const { toggleFavourite, isFavourite } = useFavouriteStore();

  const item = cart.find((i) => i.id === product.id);
  const count = item ? item.count : 0;
  const totalPrice = count > 0 ? count * product.price : product.price;
  const liked = isFavourite(product.id);

  return (
    <div className="relative flex flex-col gap-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl
      hover:shadow-cyan-500/40 hover:scale-105 transition-transform duration-300 p-4 overflow-hidden"
    >
      {/* IMAGE */}
      <img
        src={product.img}
        alt={product.title}
        className="w-full h-48 sm:h-44 object-cover rounded-xl border border-white/20 shadow-md"
      />

      {/* LIKE BUTTON */}
      <button
        onClick={() => toggleFavourite(product.id)}
        className={`absolute top-3 right-3 w-10 h-10 flex items-center justify-center rounded-full
          bg-white/10 backdrop-blur-md border border-white/20 shadow-md
          hover:scale-110 transition-transform duration-300
          ${liked ? "text-pink-400 bg-pink-500/30 shadow-pink-500/40" : "text-cyan-300 hover:text-pink-400 hover:shadow-pink-500/40"}`}
      >
        {liked ? <AiFillHeart className="text-xl" /> : <AiOutlineHeart className="text-xl" />}
      </button>

      {/* TITLE */}
      <h2 className="text-lg font-bold text-white drop-shadow-md">{product.title}</h2>

      {/* PRICE */}
      <p className="text-cyan-300 font-semibold drop-shadow-md">{totalPrice} $</p>

      {/* CART BUTTON / COUNT CONTROL */}
      {count === 0 ? (
        <button
          onClick={() => addToCart(product)}
          className="flex items-center justify-center gap-2 py-2 rounded-xl
            bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold
            shadow-lg hover:shadow-cyan-400/50 hover:scale-105 transition-all duration-300"
        >
          <AiOutlineShoppingCart className="text-lg" /> Add to Cart
        </button>
      ) : (
        <div className="flex items-center justify-center gap-4 bg-black/40 py-2 rounded-xl backdrop-blur-md shadow-md">
          <button
            onClick={() => decrease(product.id)}
            className="px-4 py-1 rounded-lg bg-red-500 text-white font-bold hover:bg-red-600 transition"
          >
            <FiMinus />
          </button>
          <span className="text-white font-bold text-lg">{count}</span>
          <button
            onClick={() => increase(product.id)}
            className="px-4 py-1 rounded-lg bg-green-500 text-white font-bold hover:bg-green-600 transition"
          >
            <FiPlus />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
