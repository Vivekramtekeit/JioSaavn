

import { create } from "zustand";
import { Audio } from "expo-av";
import {
  SaavnSong,
  getBestAudioUrl,
  isSongDownloaded,
  getLocalSongPath
} from "../api/saavn";
import { useQueueStore } from "./queueStore";

type PlayerState = {
  currentSong: SaavnSong | null;
  isPlaying: boolean;
  sound: Audio.Sound | null;
  positionMillis: number;
  durationMillis: number;
  playSong: (song: SaavnSong) => Promise<void>;
  togglePlayPause: () => Promise<void>;
  seekTo: (millis: number) => Promise<void>;
};

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentSong: null,
  isPlaying: false,
  sound: null,
  positionMillis: 0,
  durationMillis: 1,

  playSong: async (song) => {
    try {
      let url = getBestAudioUrl(song);

      // ✅ if downloaded → play local
      if (await isSongDownloaded(song)) {
        url = getLocalSongPath(song);
      }

      if (!url) return;

      await Audio.setAudioModeAsync({
        staysActiveInBackground: true,
      });

      const oldSound = get().sound;
      if (oldSound) {
        await oldSound.stopAsync();
        await oldSound.unloadAsync();
      }

      const { sound } = await Audio.Sound.createAsync(
        { uri: url },
        { shouldPlay: true }
      );

      sound.setOnPlaybackStatusUpdate((status: any) => {
        if (!status.isLoaded) return;

        set({
          isPlaying: status.isPlaying,
          positionMillis: status.positionMillis ?? 0,
          durationMillis: status.durationMillis ?? 1,
        });

        if (status.didJustFinish) {
          const queueState = useQueueStore.getState();
          const nextIndex = queueState.currentIndex + 1;

          if (nextIndex < queueState.queue.length) {
            queueState.setCurrentIndex(nextIndex);
            get().playSong(queueState.queue[nextIndex]);
          }
        }
      });

      set({ currentSong: song, isPlaying: true, sound });
    } catch (e) {
      console.log("playSong error:", e);
    }
  },

  togglePlayPause: async () => {
    const { sound, isPlaying } = get();
    if (!sound) return;

    if (isPlaying) await sound.pauseAsync();
    else await sound.playAsync();

    set({ isPlaying: !isPlaying });
  },

  seekTo: async (millis) => {
    const { sound } = get();
    if (!sound) return;
    await sound.setPositionAsync(millis);
    set({ positionMillis: millis });
  },
}));
