import { create } from "zustand";
import { SaavnSong } from "../api/saavn";

type FavoriteState = {
  favorites: SaavnSong[];
  toggleFavorite: (song: SaavnSong) => void;
  isFavorite: (songId: string) => boolean;
  clearAll: () => void;
};

export const useFavoriteStore = create<FavoriteState>((set, get) => ({
  favorites: [],

  toggleFavorite: (song) => {
    const favs = get().favorites;
    const exists = favs.find((s) => s.id === song.id);

    if (exists) {
      set({ favorites: favs.filter((s) => s.id !== song.id) });
    } else {
      set({ favorites: [...favs, song] });
    }
  },

  isFavorite: (songId) => {
    return get().favorites.some((s) => s.id === songId);
  },

  clearAll: () => {
    set({ favorites: [] });
  },
}));
