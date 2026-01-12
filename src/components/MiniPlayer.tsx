

import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { usePlayerStore } from "../store/playerStore";
import { getBestImage, getArtistName, getCleanSongName } from "../api/saavn";

export default function MiniPlayer() {
  const navigation: any = useNavigation();

  const song = usePlayerStore((s) => s.currentSong);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const toggle = usePlayerStore((s) => s.togglePlayPause);

  if (!song) return null;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation.navigate("Player")}
      style={{
        position: "absolute",
        left: 8,
        right: 8,
        bottom: 60, 
        backgroundColor: "#1e1e1e",
        borderRadius: 14,
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        elevation: 8,
      }}
    >
      <Image
        source={{ uri: getBestImage(song) }}
        style={{ width: 48, height: 48, borderRadius: 10 }}
      />

      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={{ color: "white", fontSize: 14, fontWeight: "800" }} numberOfLines={1}>
          {getCleanSongName(song.name)}
        </Text>
        <Text style={{ color: "#aaa", fontSize: 12 }} numberOfLines={1}>
          {getArtistName(song)}
        </Text>
      </View>

      {/* Download icon */}
      <TouchableOpacity
        onPress={(e) => {
          e.stopPropagation();
          console.log("Downloading:", song.name);
        }}
        style={{ marginRight: 12 }}
      >
        <Ionicons name="download-outline" size={22} color="white" />
      </TouchableOpacity>

      {/* Play / Pause */}
      <TouchableOpacity
        onPress={(e) => {
          e.stopPropagation();
          toggle();
        }}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: "orange",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Ionicons name={isPlaying ? "pause" : "play"} size={20} color="white" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
