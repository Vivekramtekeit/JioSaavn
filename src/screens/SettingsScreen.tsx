
import React from "react";
import { View, Text, TouchableOpacity, Switch, Alert, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../store/settingsStore";
import { useFavoriteStore } from "../store/favoriteStore";
import { usePlaylistStore } from "../store/playlistStore";
import { useQueueStore } from "../store/queueStore";

export default function SettingsScreen() {
  const shuffleDefault = useSettingsStore((s) => s.shuffleDefault);
  const highQuality = useSettingsStore((s) => s.highQuality);
  const toggleShuffle = useSettingsStore((s) => s.toggleShuffle);
  const toggleHighQuality = useSettingsStore((s) => s.toggleHighQuality);
  const clearAllData = useSettingsStore((s) => s.clearAllData);

  const clearFavorites = useFavoriteStore((s) => s.clearAll);
  const clearPlaylists = usePlaylistStore((s) => s.clearPlaylists);
  const clearQueue = useQueueStore((s) => s.clearQueue);

  function confirmClear(title: string, action: () => void) {
    Alert.alert(title, "Are you sure?", [
      { text: "Cancel" },
      { text: "Yes", onPress: action },
    ]);
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#121212", paddingTop: 60, paddingHorizontal: 20 }}>

      <Text style={{ color: "white", fontSize: 24, fontWeight: "900", marginBottom: 30 }}>
        Settings
      </Text>

      {/* Playback */}
      <Text style={{ color: "#aaa", marginBottom: 10 }}>Playback</Text>

      <View style={row}>
        <Text style={label}>Shuffle by default</Text>
        <Switch value={shuffleDefault} onValueChange={toggleShuffle} />
      </View>

      {/* Audio */}
      <Text style={{ color: "#aaa", marginTop: 20, marginBottom: 10 }}>Audio</Text>

      <View style={row}>
        <Text style={label}>High quality streaming</Text>
        <Switch value={highQuality} onValueChange={toggleHighQuality} />
      </View>

      {/* Data */}
      <Text style={{ color: "#aaa", marginTop: 20, marginBottom: 10 }}>Data</Text>

      <TouchableOpacity style={dangerRow} onPress={() => confirmClear("Clear Favorites", clearFavorites)}>
        <Ionicons name="heart-dislike" size={22} color="orange" />
        <Text style={dangerText}>Clear Favorites</Text>
      </TouchableOpacity>

      <TouchableOpacity style={dangerRow} onPress={() => confirmClear("Clear Playlists", clearPlaylists)}>
        <Ionicons name="trash" size={22} color="orange" />
        <Text style={dangerText}>Clear Playlists</Text>
      </TouchableOpacity>

      <TouchableOpacity style={dangerRow} onPress={() => confirmClear("Clear Queue Cache", clearQueue)}>
        <Ionicons name="remove-circle" size={22} color="orange" />
        <Text style={dangerText}>Clear Queue</Text>
      </TouchableOpacity>

      {/* App */}
      <Text style={{ color: "#aaa", marginTop: 20, marginBottom: 10 }}>App</Text>

      <View style={row}>
        <Text style={label}>Vivek Music v1.0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: "#1e1e1e",
    padding: 15,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    color: "white",
    fontSize: 15,
  },
  dangerRow: {
    backgroundColor: "#1e1e1e",
    padding: 15,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  dangerText: {
    color: "white",
    fontSize: 15,
    marginLeft: 12,
  },
});

const row = styles.row;
const label = styles.label;
const dangerRow = styles.dangerRow;
const dangerText = styles.dangerText;
