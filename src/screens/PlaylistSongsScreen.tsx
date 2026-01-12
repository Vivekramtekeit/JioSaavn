import React from "react";
import { View, Text, FlatList } from "react-native";
import { usePlaylistStore } from "../store/playlistStore";
import SongCard from "../components/SongCard";
import { usePlayerStore } from "../store/playerStore";
import { useQueueStore } from "../store/queueStore";

export default function PlaylistSongsScreen({ route, navigation }: any) {
  const { playlistId, playlistName } = route.params;

  const playlist = usePlaylistStore(
    (s) => s.playlists.find((p) => p.id === playlistId)
  );

  const playSong = usePlayerStore((s) => s.playSong);
  const setQueue = useQueueStore((s) => s.setQueue);

  if (!playlist) return null;

  return (
    <View style={{ flex:1, backgroundColor:"#121212", paddingTop:50 }}>
      <Text style={{
        color:"white",
        fontSize:22,
        fontWeight:"900",
        textAlign:"center",
        marginBottom:20
      }}>
        {playlistName}
      </Text>

      <FlatList
        contentContainerStyle={{ padding:20, paddingBottom:120 }}
        data={playlist.songs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SongCard
            song={item}
            onPress={async () => {
              const index = playlist.songs.findIndex(s => s.id === item.id);
              await setQueue(playlist.songs, index);
              await playSong(item);
              navigation.navigate("Player");
            }}
          />
        )}
      />
    </View>
  );
}
