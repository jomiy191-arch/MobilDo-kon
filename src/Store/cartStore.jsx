import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  cart: [],

  addToCart: (product) => {
    const cart = get().cart;

    const exist = cart.find((item) => item.id === product.id);

    if (exist) {
      set({
        cart: cart.map((item) =>
          item.id === product.id
            ? { ...item, count: item.count + 1 }
            : item
        ),
      });
    } else {
      set({
        cart: [...cart, { ...product, count: 1 }],
      });
    }
  },

  increase: (id) => {
    const cart = get().cart;

    set({
      cart: cart.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      ),
    });
  },

  decrease: (id) => {
    const cart = get().cart;

    const updated = cart
      .map((item) =>
        item.id === id ? { ...item, count: item.count - 1 } : item
      )
      .filter((item) => item.count > 0); // 0 bo‘lsa o‘chadi

    set({ cart: updated });
  },

  removeFromCart: (id) => {
    const cart = get().cart;
    set({ cart: cart.filter((item) => item.id !== id) });
  },
}));
