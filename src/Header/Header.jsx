import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useCartStore } from "../Store/cartStore";
import { FaShoppingCart, FaHeart, FaUser } from "react-icons/fa";

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { cart } = useCartStore();
  const totalCount = cart.reduce((sum, item) => sum + item.count, 0);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  return (
    <>
      <header className="w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">

          {/* LOGO */}
          <h1 className="text-2xl font-extrabold tracking-wide text-blue-400">
            MobilDo‘kon
          </h1>

          {/* DESKTOP MENU */}
          <nav className="hidden md:flex gap-8 text-lg font-semibold items-center">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-400 border-b-2 border-blue-400 pb-1 flex items-center gap-2"
                  : "hover:text-blue-400 duration-300 flex items-center gap-2"
              }
            >
              🏠 Home
            </NavLink>

            <NavLink to="/cart" className="relative flex items-center gap-1">
              <FaShoppingCart className="text-xl" /> Cart
              {totalCount > 0 && (
                <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                  {totalCount}
                </span>
              )}
            </NavLink>

            <NavLink
              to="/favourite"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-400 border-b-2 border-blue-400 pb-1 flex items-center gap-1"
                  : "hover:text-blue-400 duration-300 flex items-center gap-1"
              }
            >
              <FaHeart className="text-xl text-pink-400" /> Favourite
            </NavLink>

            {!isLoggedIn && (
              <button
                onClick={() => setShowLogin(true)}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 duration-300 font-semibold shadow-md"
              >
                <FaUser /> Login
              </button>
            )}
          </nav>

          {/* MOBILE ICONS */}
          <div className="flex md:hidden items-center gap-4 text-white text-xl">
            <NavLink to="/cart" className="relative">
              <FaShoppingCart />
              {totalCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                  {totalCount}
                </span>
              )}
            </NavLink>

            <NavLink to="/favourite">
              <FaHeart className="text-pink-400" />
            </NavLink>

            {!isLoggedIn && (
              <button onClick={() => setShowLogin(true)}>
                <FaUser />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* LOGIN MODAL */}
      {!isLoggedIn && showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-96 relative shadow-lg animate-fadeIn">
            <h2 className="text-2xl font-bold mb-4 text-slate-800">Ro‘yxatdan o‘tish</h2>
            <form className="flex flex-col gap-4" onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="Ismingiz"
                className="border px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="email"
                placeholder="Email"
                className="border px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="password"
                placeholder="Parol"
                className="border px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 rounded-xl font-semibold hover:bg-blue-600 duration-300"
              >
                Ro‘yxatdan o‘tish
              </button>
            </form>
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-3 right-3 text-xl font-bold text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
