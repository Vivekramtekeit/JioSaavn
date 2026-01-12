

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

import SongCard from "../components/SongCard";
import { SaavnSong, getAlbumSongs } from "../api/saavn";
import { usePlayerStore } from "../store/playerStore";
import { useQueueStore } from "../store/queueStore";

export default function AlbumSongsScreen() {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const { albumId, albumName } = route.params;

  const [songs, setSongs] = useState<SaavnSong[]>([]);
  const [loading, setLoading] = useState(true);

  const playSong = usePlayerStore((s) => s.playSong);
  const setQueue = useQueueStore((s) => s.setQueue);

  useEffect(() => {
    getAlbumSongs(albumId)
      .then(setSongs)
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#121212", paddingTop: 50 }}>
      
      <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 20 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color="white" />
        </TouchableOpacity>
        <Text style={{ color: "white", fontSize: 20, fontWeight: "900", marginLeft: 15 }}>
          {albumName}
        </Text>
      </View>

      {loading ? (
        <ActivityIndicator color="orange" style={{ marginTop: 30 }} />
      ) : (
        <FlatList
          contentContainerStyle={{ padding: 20, paddingBottom: 120 }}
          data={songs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SongCard
              song={item}
              onPress={async () => {
                const index = songs.findIndex((s) => s.id === item.id);
                await setQueue(songs, index);
                await playSong(item);
                navigation.navigate("Player");
              }}
            />
          )}
        />
      )}
    </View>
  );
}
