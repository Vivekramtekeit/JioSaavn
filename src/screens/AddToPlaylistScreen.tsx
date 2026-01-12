import React from "react";
import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { usePlaylistStore } from "../store/playlistStore";
import { SaavnSong } from "../api/saavn";

export default function AddToPlaylistScreen({ route, navigation }: any) {
  const { song }: { song: SaavnSong } = route.params;

  const playlists = usePlaylistStore((s) => s.playlists);
  const addSongToPlaylist = usePlaylistStore((s) => s.addSongToPlaylist);

  async function handleAdd(playlistId: string) {
    await addSongToPlaylist(playlistId, song);
    Alert.alert("Added", "Song added to playlist");
    navigation.goBack();
  }

  return (
    <View style={{ flex:1, backgroundColor:"#121212", paddingTop:50 }}>

      <Text style={{
        color:"white",
        fontSize:22,
        fontWeight:"900",
        marginLeft:20,
        marginBottom:20
      }}>
        Add to Playlist
      </Text>

      {/* Create new playlist */}
      <TouchableOpacity
        onPress={() => navigation.navigate("CreatePlaylist")}
        style={{
          marginHorizontal:20,
          backgroundColor:"#1e1e1e",
          borderRadius:12,
          padding:15,
          flexDirection:"row",
          alignItems:"center"
        }}
      >
        <Ionicons name="add-circle" size={26} color="orange" />
        <Text style={{ color:"white", marginLeft:12, fontSize:16 }}>
          Create New Playlist
        </Text>
      </TouchableOpacity>

      {/* Existing playlists */}
      <FlatList
        data={playlists}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding:20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleAdd(item.id)}
            style={{
              backgroundColor:"#1e1e1e",
              padding:15,
              borderRadius:12,
              marginBottom:12
            }}
          >
            <Text style={{ color:"white", fontSize:16, fontWeight:"700" }}>
              {item.name}
            </Text>
            <Text style={{ color:"#aaa", marginTop:4 }}>
              {item.songs.length} Songs
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
