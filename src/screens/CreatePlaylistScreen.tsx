import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { usePlaylistStore } from "../store/playlistStore";

export default function CreatePlaylistScreen({ navigation }: any) {
  const [name, setName] = useState("");
  const createPlaylist = usePlaylistStore((s) => s.createPlaylist);

  async function handleCreate() {
    if (!name.trim()) return;
    await createPlaylist(name);
    navigation.goBack();
  }

  return (
    <View style={{ flex:1, backgroundColor:"#121212", padding:20, paddingTop:60 }}>
      <Text style={{ color:"white", fontSize:22, fontWeight:"800" }}>
        Create Playlist
      </Text>

      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Playlist name"
        placeholderTextColor="#777"
        style={{
          marginTop:20,
          backgroundColor:"#1e1e1e",
          color:"white",
          padding:15,
          borderRadius:10
        }}
      />

      <TouchableOpacity
        onPress={handleCreate}
        style={{
          marginTop:20,
          backgroundColor:"orange",
          padding:15,
          borderRadius:10,
          alignItems:"center"
        }}
      >
        <Text style={{ fontWeight:"800", color:"white" }}>Create</Text>
      </TouchableOpacity>
    </View>
  );
}
