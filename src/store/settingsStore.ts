import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@settings_v1";

type SettingsState = {
  shuffleDefault: boolean;
  highQuality: boolean;

  loadSettings: () => Promise<void>;
  save: () => Promise<void>;
  toggleShuffle: () => void;
  toggleHighQuality: () => void;
  clearAllData: () => Promise<void>;
};

export const useSettingsStore = create<SettingsState>((set, get) => ({
  shuffleDefault: false,
  highQuality: true,

  loadSettings: async () => {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const data = JSON.parse(raw);
    set({
      shuffleDefault: data.shuffleDefault ?? false,
      highQuality: data.highQuality ?? true,
    });
  },

  save: async () => {
    const { shuffleDefault, highQuality } = get();
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ shuffleDefault, highQuality })
    );
  },

  toggleShuffle: () => {
    set((s) => ({ shuffleDefault: !s.shuffleDefault }));
    get().save();
  },

  toggleHighQuality: () => {
    set((s) => ({ highQuality: !s.highQuality }));
    get().save();
  },

  clearAllData: async () => {
    await AsyncStorage.clear();
  },
}));
