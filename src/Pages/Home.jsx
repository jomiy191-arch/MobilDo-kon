import React, { useState } from "react";
import ProductCard from "../Components/ProductCard";
import img1 from "./Images/15 max.jpg";
import img2 from "./Images/s24.jpg";
import img3 from "./Images/Macbook.jpg";
import { useCartStore } from "../Store/cartStore";
import { create } from "zustand";
import { AiOutlineLogout } from "react-icons/ai"; // Logout ikonkasi

// ===== AUTH STORE =====
const useAuthStore = create((set) => ({
  user: null, // { email }
  login: (email, password) => {
    if (email && password) {
      set({ user: { email } });
      return true;
    }
    return false;
  },
  register: (email, password) => {
    if (email && password) {
      set({ user: { email } });
      return true;
    }
    return false;
  },
  logout: () => set({ user: null }),
}));

const products = [
  { id: 1, title: "iPhone 15 Pro", price: 1200, img: img1 },
  { id: 2, title: "Samsung S24", price: 1000, img: img2 },
  { id: 3, title: "Macbook Pro", price: 2500, img: img3 },
];

const Home = () => {
  const { cart } = useCartStore();
  const { user, login, register, logout } = useAuthStore();

  const [isLogin, setIsLogin] = useState(true); // Login/Register toggle
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleAuth = () => {
    const success = isLogin ? login(email, password) : register(email, password);
    if (!success) setError("Email yoki parol xato!");
    else setError("");
  };

  if (!user) {
    // LOGIN / REGISTER FORM
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white px-4">
        <div className="bg-white/10 backdrop-blur-xl p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-sm flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-center">{isLogin ? "Login" : "Register"}</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-xl bg-white/10 border border-white/20 text-white outline-none w-full"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-xl bg-white/10 border border-white/20 text-white outline-none w-full"
          />
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <button
            onClick={handleAuth}
            className="p-3 bg-cyan-500 rounded-xl font-bold hover:bg-cyan-600 transition w-full"
          >
            {isLogin ? "Login" : "Register"}
          </button>
          <p className="text-gray-300 text-sm text-center">
            {isLogin ? "Ro'yxatdan o'tish" : "Login qilish"} uchun{" "}
            <span
              className="text-cyan-400 cursor-pointer"
              onClick={() => setIsLogin(!isLogin)}
            >
              bu yerga bosing
            </span>
          </p>
        </div>
      </div>
    );
  }

  // FOYDALANUVCHI LOGIN BO'LGAN HOLDA
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
      {/* Background Blur Effects */}
      <div className="absolute top-[-120px] left-[-120px] w-[450px] h-[450px] bg-blue-500 rounded-full blur-[160px] opacity-40 animate-pulse"></div>
      <div className="absolute bottom-[-150px] right-[-150px] w-[500px] h-[500px] bg-pink-500 rounded-full blur-[180px] opacity-35 animate-[spin_20s_linear_infinite]"></div>
      <div className="absolute top-[40%] left-[35%] w-[350px] h-[350px] bg-purple-500 rounded-full blur-[150px] opacity-30 animate-[ping_4s_infinite]"></div>

      <div className="relative max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white drop-shadow-lg text-center sm:text-left">
            Our Products 📱💻
          </h1>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 rounded-xl hover:bg-red-600 transition shadow-lg"
          >
            <AiOutlineLogout size={20} /> Logout
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
