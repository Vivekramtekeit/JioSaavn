
import React from "react";
import { View, FlatList, Text } from "react-native";
import SongCard from "../components/SongCard";
import { useFavoriteStore } from "../store/favoriteStore";
import { usePlayerStore } from "../store/playerStore";
import { useQueueStore } from "../store/queueStore";

export default function FavoritesScreen({ navigation }: any) {
  const favorites = useFavoriteStore((s) => s.favorites);
  const playSong = usePlayerStore((s) => s.playSong);
  const setQueue = useQueueStore((s) => s.setQueue);

  if (favorites.length === 0) {
    return (
      <View style={{
        flex:1,
        backgroundColor:"#121212",
        justifyContent:"center",
        alignItems:"center"
      }}>
        <Text style={{ color:"white" }}>No liked songs</Text>
      </View>
    );
  }

  return (
    <View style={{ flex:1, backgroundColor:"#121212", paddingTop:50 }}>
      <FlatList
        contentContainerStyle={{ padding:20, paddingBottom:120 }}
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <SongCard
            song={item}
            onPress={async () => {
              await setQueue(favorites, index);
              await playSong(item);
              navigation.navigate("Player");
            }}
          />
        )}
      />
    </View>
  );
}
