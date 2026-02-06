import React from "react";
import { useCartStore } from "../Store/cartStore";
import { useFavouriteStore } from "../Store/favouriteStore";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const ProductCard = ({ product }) => {
  const { cart, addToCart, increase, decrease } = useCartStore();
  const { toggleFavourite, isFavourite } = useFavouriteStore();

  const item = cart.find((i) => i.id === product.id);
  const totalItemPrice = item ? item.count * product.price : product.price;

  const liked = isFavourite(product.id);

  return (
    <div className="bg-white shadow-md rounded-2xl p-5 flex flex-col gap-3 relative group hover:shadow-xl transition-shadow duration-300">
      
      {/* LIKE ICON (rasm ustida hover bo‘lganda) */}
      <button
        onClick={() => toggleFavourite(product.id)}
        className="absolute top-3 right-3 text-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100"
      >
        {liked ? <AiFillHeart className="text-red-500" /> : <AiOutlineHeart className="text-gray-300 hover:text-red-500" />}
      </button>

      {/* PRODUCT IMAGE */}
      <img
        src={product.img}
        alt={product.title}
        className="w-full h-40 object-cover rounded-xl"
      />

      {/* PRODUCT TITLE */}
      <h2 className="text-lg font-bold">{product.title}</h2>

      {/* PRODUCT PRICE */}
      <p className="text-gray-500">{totalItemPrice} $</p>

      {/* CART BUTTONS */}
      {!item ? (
        <button
          onClick={() => addToCart(product)}
          className="w-full py-2 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 duration-300"
        >
          Add to Cart
        </button>
      ) : (
        <div className="flex items-center justify-between bg-slate-100 rounded-xl px-3 py-2">
          <button
            onClick={() => decrease(product.id)}
            className="w-10 h-10 rounded-lg bg-red-500 text-white text-xl font-bold hover:bg-red-600"
          >
            -
          </button>

          <span className="text-lg font-bold">{item.count}</span>

          <button
            onClick={() => increase(product.id)}
            className="w-10 h-10 rounded-lg bg-green-500 text-white text-xl font-bold hover:bg-green-600"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
