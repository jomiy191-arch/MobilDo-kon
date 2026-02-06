import { create } from "zustand";

export const useFavouriteStore = create((set, get) => ({
  favourites: [], // Favourite bo‘lgan product ID larini saqlaydi

  // Toggle favourite: like bo‘lsa olib tashlaydi, yo‘q bo‘lsa qo‘shadi
  toggleFavourite: (productId) => {
    const { favourites } = get();
    if (favourites.includes(productId)) {
      set({ favourites: favourites.filter((id) => id !== productId) });
    } else {
      set({ favourites: [...favourites, productId] });
    }
  },

  // Product favourite qilingan yoki yo‘qligini tekshiradi
  isFavourite: (productId) => {
    return get().favourites.includes(productId);
  },
}));
