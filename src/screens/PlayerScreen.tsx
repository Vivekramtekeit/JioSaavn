import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useNavigation } from "@react-navigation/native";

import { usePlayerStore } from "../store/playerStore";
import { useQueueStore } from "../store/queueStore";
import { useFavoriteStore } from "../store/favoriteStore";

import {
  getBestImage,
  getArtistName,
  getCleanSongName,
  downloadSong,
  isSongDownloaded
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
  const setCurrentIndex = useQueueStore((s) => s.setCurrentIndex);
  const addToQueue = useQueueStore((s) => s.addToQueue);

  const toggleFavorite = useFavoriteStore((s) => s.toggleFavorite);
  const isFavorite = useFavoriteStore((s) => s.isFavorite);
  const liked = song ? isFavorite(song.id) : false;

  const [isShuffle, setIsShuffle] = useState(false);
  const [showMoreSheet, setShowMoreSheet] = useState(false);

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
  song={song}
  onClose={() => setShowMoreSheet(false)}
/>

    </View>
  );
}
