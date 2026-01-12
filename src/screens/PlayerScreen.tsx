import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useNavigation } from "@react-navigation/native";

import { usePlayerStore } from "../store/playerStore";
import { useQueueStore } from "../store/queueStore";
import { useFavoriteStore } from "../store/favoriteStore";
import { SaavnSong } from "../api/saavn";

import {
  getBestImage,
  getArtistName,
  getCleanSongName,
  downloadSong,
  isSongDownloaded,
  searchSongs
} from "../api/saavn";

import ActionSheet from "../components/ActionSheet";

function formatTime(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

export default function PlayerScreen() {
  const navigation: any = useNavigation();

  const song = usePlayerStore((s) => s.currentSong);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const toggle = usePlayerStore((s) => s.togglePlayPause);
  const playSong = usePlayerStore((s) => s.playSong);
  const seekTo = usePlayerStore((s) => s.seekTo);
  const positionMillis = usePlayerStore((s) => s.positionMillis);
  const durationMillis = usePlayerStore((s) => s.durationMillis);

  const queue = useQueueStore((s) => s.queue);
  const currentIndex = useQueueStore((s) => s.currentIndex);
  const addToQueue = useQueueStore((s) => s.addToQueue);
  const setQueue = useQueueStore((s) => s.setQueue);
  const setCurrentIndex = useQueueStore((s) => s.setCurrentIndex);

  const playlists = usePlaylistStore((s) => s.playlists);

  async function insertNext() {
    if (!song) return;
    const newQueue = [...queue];
    newQueue.splice(currentIndex + 1, 0, song);
    await setQueue(newQueue, currentIndex);
  }

  const toggleFavorite = useFavoriteStore((s) => s.toggleFavorite);
  const isFavorite = useFavoriteStore((s) => s.isFavorite);
  const liked = song ? isFavorite(song.id) : false;

  const [isShuffle, setIsShuffle] = useState(false);
  const [showMoreSheet, setShowMoreSheet] = useState(false);
  const [artistSongs, setArtistSongs] = useState<SaavnSong[]>([]);

  useEffect(() => {
    if (song) {
      const artist = getArtistName(song);
      searchSongs(artist).then(results => {
        // Filter out the current song
        setArtistSongs(results.filter(s => s.id !== song.id).slice(0, 6)); // limit to 6
      });
    }
  }, [song]);

  if (!song) return null;

  const playNext = async () => {
    let nextIndex = currentIndex + 1;
    if (isShuffle) nextIndex = Math.floor(Math.random() * queue.length);
    if (queue[nextIndex]) {
      await setCurrentIndex(nextIndex);
      await playSong(queue[nextIndex]);
    }
  };

  const playPrev = async () => {
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) prevIndex = 0;
    if (queue[prevIndex]) {
      await setCurrentIndex(prevIndex);
      await playSong(queue[prevIndex]);
    }
  };

  async function handleDownload() {
    if (!song) return;
    const already = await isSongDownloaded(song);
    if (already) {
      Alert.alert("Already Downloaded");
      return;
    }
    await downloadSong(song);
    Alert.alert("Downloaded", "Song saved for offline play");
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#121212", paddingTop: 50 }}>

      {/* Header */}
      <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
      }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color="white" />
        </TouchableOpacity>

        <Text style={{ color: "white", fontSize: 16, fontWeight: "900" }}>
          Now Playing
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate("Queue")}>
          <Ionicons name="list" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Artwork */}
      <Image
        source={{ uri: getBestImage(song) }}
        style={{ width: "100%", height: 340, borderRadius: 18, marginTop: 15 }}
      />

      {/* Info */}
      <Text style={{ color: "white", fontSize: 22, fontWeight: "900", textAlign: "center", marginTop: 18 }}>
        {getCleanSongName(song.name)}
      </Text>

      <Text style={{ color: "#aaa", fontSize: 14, textAlign: "center", marginTop: 5 }}>
        {getArtistName(song)}
      </Text>

      {/* Seek */}
      <View style={{ marginTop: 20, paddingHorizontal: 15 }}>
        <Slider
          value={positionMillis}
          minimumValue={0}
          maximumValue={durationMillis || 1}
          onSlidingComplete={(v) => seekTo(v)}
          minimumTrackTintColor="orange"
          maximumTrackTintColor="#333"
          thumbTintColor="orange"
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ color: "#aaa", fontSize: 12 }}>{formatTime(positionMillis)}</Text>
          <Text style={{ color: "#aaa", fontSize: 12 }}>{formatTime(durationMillis)}</Text>
        </View>
      </View>

      {/* Controls */}
      <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 25 }}>
        <TouchableOpacity onPress={playPrev} style={{ marginHorizontal: 25 }}>
          <Ionicons name="play-skip-back" size={26} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={toggle}>
          <Ionicons
            name={isPlaying ? "pause-circle" : "play-circle"}
            size={70}
            color="orange"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={playNext} style={{ marginHorizontal: 25 }}>
          <Ionicons name="play-skip-forward" size={26} color="white" />
        </TouchableOpacity>
      </View>

      {/* Bottom Buttons */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 18, paddingHorizontal: 40 }}>

        <TouchableOpacity onPress={() => toggleFavorite(song)}>
          <Ionicons name={liked ? "heart" : "heart-outline"} size={22} color={liked ? "orange" : "white"} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsShuffle(!isShuffle)}>
          <Ionicons name="shuffle" size={22} color={isShuffle ? "orange" : "white"} />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleDownload}>
          <Ionicons name="download-outline" size={22} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowMoreSheet(true)}>
          <Ionicons name="ellipsis-vertical" size={22} color="white" />
        </TouchableOpacity>
      </View>

      {/* Action Sheet */}
      <ActionSheet
        visible={showMoreSheet}
        title={getCleanSongName(song.name)}
        onClose={() => setShowMoreSheet(false)}
        options={[
          {
            label: "Add to Queue",
            onPress: async () => {
              await addToQueue(song);
              setShowMoreSheet(false);
            },
            icon: "add-circle-outline",
          },
          {
            label: "Play Next",
            onPress: async () => {
              await insertNext();
              setShowMoreSheet(false);
            },
            icon: "play-skip-forward-outline",
          },
          {
            label: "Add to Playlist",
            onPress: async () => {
              navigation.navigate("AddToPlaylist", { song });
              setShowMoreSheet(false);
            },
            icon: "list-outline",
          },
          {
            label: "Download Song",
            onPress: async () => {
              await downloadSong(song);
              setShowMoreSheet(false);
            },
            icon: "download-outline",
          },
        ]}
      />

    </View>
  );
}
