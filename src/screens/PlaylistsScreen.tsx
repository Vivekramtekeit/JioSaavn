
import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { usePlaylistStore } from "../store/playlistStore";

export default function PlaylistsScreen({ navigation }: any) {
  const playlists = usePlaylistStore((s) => s.playlists);

  return (
    <View style={{ flex: 1, backgroundColor: "#121212", paddingTop: 50 }}>

      <Text style={{
        color: "white",
        fontSize: 26,
        fontWeight: "900",
        marginLeft: 20
      }}>
        Playlists
      </Text>

      {/* Create Playlist Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate("CreatePlaylist")}
        style={{
          marginTop: 20,
          marginHorizontal: 20,
          backgroundColor: "#1e1e1e",
          borderRadius: 14,
          padding: 15,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Ionicons name="add-circle" size={26} color="orange" />
        <Text style={{ color: "white", marginLeft: 12, fontSize: 16 }}>
          Create Playlist
        </Text>
      </TouchableOpacity>

      <FlatList
        data={playlists}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20, paddingBottom: 120 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("PlaylistSongs", {
                playlistId: item.id,
                playlistName: item.name,
              })
            }
            style={{
              backgroundColor: "#1e1e1e",
              padding: 15,
              borderRadius: 14,
              marginBottom: 12,
            }}
          >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "700" }}>
              {item.name}
            </Text>
            <Text style={{ color: "#aaa", marginTop: 4 }}>
              {item.songs.length} Songs
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
