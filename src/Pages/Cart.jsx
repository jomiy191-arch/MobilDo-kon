import React from "react";
import { useCartStore } from "../Store/cartStore";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus, AiOutlineMinus, AiOutlineDelete } from "react-icons/ai";

const Cart = () => {
  const { cart, increase, decrease, removeFromCart } = useCartStore();
  const navigate = useNavigate();

  // TOTAL NARX
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.count, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold mb-8 text-slate-800">Cart 🛒</h1>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center gap-6">
          <h2 className="text-xl text-gray-500">Maxsulot yoq </h2>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors duration-300"
          >
            Maxsulotlar qo‘shish
          </button>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-5 mb-8">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-lg rounded-2xl p-5 flex items-center justify-between hover:shadow-xl transition-shadow duration-300"
              >
                {/* PRODUCT INFO */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded-xl border border-gray-200"
                  />
                  <div>
                    <h2 className="text-lg font-bold">{item.title}</h2>
                    <p className="text-blue-500 font-bold">{item.price * item.count} $</p>
                  </div>
                </div>

                {/* COUNT BUTTONS WITH ICONS */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => decrease(item.id)}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-red-500 text-white text-xl font-bold hover:bg-red-600 transition-colors duration-300"
                  >
                    <AiOutlineMinus />
                  </button>

                  <span className="text-lg font-bold">{item.count}</span>

                  <button
                    onClick={() => increase(item.id)}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-green-500 text-white text-xl font-bold hover:bg-green-600 transition-colors duration-300"
                  >
                    <AiOutlinePlus />
                  </button>

                  {/* REMOVE BUTTON ICON */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-4 w-10 h-10 flex items-center justify-center rounded-lg bg-gray-200 text-red-500 hover:bg-red-100 hover:text-red-700 transition-colors duration-300"
                  >
                    <AiOutlineDelete className="text-xl" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* TOTAL + CHECKOUT */}
          <div className="flex flex-col md:flex-row justify-between items-center bg-slate-100 rounded-2xl p-5 shadow-md">
            <h2 className="text-xl font-bold text-slate-800">
              Total: <span className="text-blue-500">{totalPrice} $</span>
            </h2>

            <button
              onClick={() => alert(`Buyurtma qilindi! Total: ${totalPrice} $`)}
              className="mt-3 md:mt-0 px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors duration-300"
            >
              Buyurtma berish
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
