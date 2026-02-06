import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useCartStore } from "../Store/cartStore";

const Header = () => {
  const [open, setOpen] = useState(false); // Burger menu
  const [showLogin, setShowLogin] = useState(true); // Modal boshlang'ich holati
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Foydalanuvchi login qilganmi
  const { cart } = useCartStore();
  const totalCount = cart.reduce((sum, item) => sum + item.count, 0);

  const handleLogin = (e) => {
    e.preventDefault();
    // Shu yerda haqiqiy auth bo'lishi mumkin
    setIsLoggedIn(true); // Login qilindi
    setShowLogin(false); // Modalni yopish
  };

  return (
    <>
      <header className="w-full bg-slate-900 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-extrabold tracking-wide text-blue-400">
           MobilDo‘kon
          </h1>

          {/* DESKTOP MENU */}
          <nav className="hidden md:flex gap-8 text-lg font-semibold">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-400 border-b-2 border-blue-400 pb-1"
                  : "hover:text-blue-400 duration-300"
              }
            >
              Home
            </NavLink>

            <NavLink to="/cart" className="relative">
              Cart
              {totalCount > 0 && (
                <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {totalCount}
                </span>
              )}
            </NavLink>

            <NavLink
              to="/favourite"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-400 border-b-2 border-blue-400 pb-1"
                  : "hover:text-blue-400 duration-300"
              }
            >
              Favourite
            </NavLink>
          </nav>

          {/* BUTTON (DESKTOP) */}
          {!isLoggedIn && (
            <div className="hidden md:block">
              <button
                onClick={() => setShowLogin(true)}
                className="px-5 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 duration-300 font-semibold shadow-md"
              >
                Login
              </button>
            </div>
          )}

          {/* BURGER BUTTON (MOBILE) */}
          <button
            className="md:hidden text-3xl"
            onClick={() => setOpen(!open)}
          >
            {open ? "✖" : "☰"}
          </button>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden bg-slate-800 px-6 py-5 flex flex-col gap-4 text-lg font-semibold animate-slideDown">
            <NavLink to="/" onClick={() => setOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/cart" onClick={() => setOpen(false)}>
              Cart {totalCount > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {totalCount}
                </span>
              )}
            </NavLink>
            <NavLink to="/favourite" onClick={() => setOpen(false)}>
              Favourite
            </NavLink>
            {!isLoggedIn && (
              <button
                onClick={() => {
                  setShowLogin(true);
                  setOpen(false);
                }}
                className="mt-3 px-5 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 duration-300 font-semibold shadow-md"
              >
                Login
              </button>
            )}
          </div>
        )}
      </header>

      {/* LOGIN MODAL */}
      {!isLoggedIn && showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-96 relative shadow-lg">
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
