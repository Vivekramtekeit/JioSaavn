import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SaavnSong } from "../api/saavn";

const STORAGE_KEY = "@playlists_v1";

export type Playlist = {
  id: string;
  name: string;
  songs: SaavnSong[];
};

type PlaylistState = {
  playlists: Playlist[];

  loadPlaylists: () => Promise<void>;
  createPlaylist: (name: string) => Promise<void>;
  addSongToPlaylist: (playlistId: string, song: SaavnSong) => Promise<void>;
  getPlaylist: (id: string) => Playlist | undefined;
  clearPlaylists: () => Promise<void>;
};

export const usePlaylistStore = create<PlaylistState>((set, get) => ({
  playlists: [],

  loadPlaylists: async () => {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    set({ playlists: JSON.parse(raw) });
  },

  createPlaylist: async (name) => {
    const newPlaylist: Playlist = {
      id: Date.now().toString(),
      name,
      songs: [],
    };

    const playlists = [...get().playlists, newPlaylist];
    set({ playlists });
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(playlists));
  },

  addSongToPlaylist: async (playlistId, song) => {
    const playlists = get().playlists.map((p) => {
      if (p.id === playlistId) {
        if (p.songs.find((s) => s.id === song.id)) return p;
        return { ...p, songs: [...p.songs, song] };
      }
      return p;
    });

    set({ playlists });
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(playlists));
  },

  getPlaylist: (id) => {
    return get().playlists.find((p) => p.id === id);
  },

  clearPlaylists: async () => {
    set({ playlists: [] });
    await AsyncStorage.removeItem(STORAGE_KEY);
  },
}));
