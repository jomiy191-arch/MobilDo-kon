import React, { useState } from "react";
import { useCartStore } from "../Store/cartStore";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Cart = () => {
  const { cart, increase, decrease, removeFromCart } = useCartStore();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.count, 0);
  const deliveryFee = totalPrice >= 100 ? 0 : 5;
  const discountAmount = (totalPrice * discount) / 100;
  const finalPrice = totalPrice - discountAmount + deliveryFee;

  const applyCoupon = () => {
    const code = coupon.toUpperCase();
    if (code === "PROMO10") setDiscount(10);
    else if (code === "PROMO20") setDiscount(20);
    else setDiscount(0);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">

      {/* BACKGROUND BLOBS */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,_rgba(255,255,255,0.15)_1px,_transparent_1px)] bg-[size:35px_35px]"></div>
      <div className="absolute top-[-120px] left-[-120px] w-[450px] h-[450px] bg-blue-500 rounded-full blur-[160px] opacity-40 animate-pulse"></div>
      <div className="absolute bottom-[-150px] right-[-150px] w-[500px] h-[500px] bg-pink-500 rounded-full blur-[180px] opacity-35 animate-[spin_20s_linear_infinite]"></div>

      <div className="relative max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-extrabold mb-8 text-white drop-shadow-lg flex items-center gap-3">
          <AiOutlineShoppingCart className="text-yellow-400 text-4xl" /> Cart
        </h1>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center gap-6 bg-white/10 p-10 rounded-3xl backdrop-blur-xl border border-white/20 shadow-xl">
            <h2 className="text-xl text-gray-200">Maxsulot yo‘q 😢</h2>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition shadow-lg"
            >
              Maxsulotlar qo‘shish
            </button>
          </div>
        ) : (
          <>
            {/* CART ITEMS */}
            <div className="flex flex-col gap-5 mb-8">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 hover:scale-[1.02] transition hover:shadow-cyan-500/40"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-28 h-28 sm:w-24 sm:h-24 object-cover rounded-xl border border-white/20 shadow-md"
                    />
                    <div className="flex flex-col">
                      <h2 className="text-lg font-bold">{item.title}</h2>
                      <p className="text-cyan-300 font-bold">{item.price * item.count} $</p>
                    </div>
                  </div>

                  {/* COUNT CONTROL */}
                  <div className="flex items-center gap-3 mt-3 sm:mt-0">
                    <button
                      onClick={() => decrease(item.id)}
                      className="w-10 h-10 flex items-center justify-center rounded-lg bg-red-500 hover:bg-red-600 transition shadow-md"
                    >
                      <FiMinus />
                    </button>
                    <span className="text-lg font-bold">{item.count}</span>
                    <button
                      onClick={() => increase(item.id)}
                      className="w-10 h-10 flex items-center justify-center rounded-lg bg-green-500 hover:bg-green-600 transition shadow-md"
                    >
                      <FiPlus />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-4 w-10 h-10 flex items-center justify-center rounded-lg bg-white/20 text-red-400 hover:bg-red-500 hover:text-white transition shadow-md"
                    >
                      <FiTrash2 className="text-xl" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* COUPON & TOTAL */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-5 shadow-xl">
                <h2 className="text-xl font-bold mb-3">Coupon</h2>
                <div className="flex gap-3 flex-col sm:flex-row">
                  <input
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="PROMO10 yoki PROMO20"
                    className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 outline-none text-white placeholder-gray-300"
                  />
                  <button
                    onClick={applyCoupon}
                    className="px-6 py-3 bg-cyan-500 rounded-xl font-semibold hover:bg-cyan-600 shadow-lg"
                  >
                    Apply
                  </button>
                </div>
                {discount > 0 && (
                  <p className="mt-3 text-green-400 font-semibold">
                    ✅ Chegirma: {discount}% ishladi!
                  </p>
                )}
              </div>

              <div className="flex-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-xl flex flex-col gap-3">
                <div className="flex justify-between"><p>Subtotal:</p><p>{totalPrice} $</p></div>
                <div className="flex justify-between text-green-400"><p>Discount:</p><p>-{discountAmount.toFixed(2)} $</p></div>
                <div className="flex justify-between text-cyan-300"><p>Delivery:</p><p>{deliveryFee === 0 ? "FREE 🚚" : `${deliveryFee} $`}</p></div>
                <hr className="border-white/20 my-2" />
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-extrabold">Total:</h2>
                  <h2 className="text-2xl font-extrabold text-yellow-400 drop-shadow-lg">{finalPrice.toFixed(2)} $</h2>
                </div>
                <button
                  onClick={() => alert(`✅ Buyurtma qilindi!\nTotal: ${finalPrice.toFixed(2)} $`)}
                  className="mt-4 px-6 py-4 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-600 animate-pulse shadow-lg"
                >
                  Buyurtma berish 🚀
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
