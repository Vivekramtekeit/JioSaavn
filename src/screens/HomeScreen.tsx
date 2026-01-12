


import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

import SongCard from "../components/SongCard";
import ArtistAlbumCard from "../components/ArtistAlbumCard";

import {
  SaavnSong,
  SaavnAlbum,
  searchSongs,
  searchAlbums,
} from "../api/saavn";

import { usePlayerStore } from "../store/playerStore";
import { useQueueStore } from "../store/queueStore";

type TabType = "Songs" | "Albums";

export default function HomeScreen({ navigation }: any) {
  const [query, setQuery] = useState("arijit");
  const [activeTab, setActiveTab] = useState<TabType>("Songs");

  const [songs, setSongs] = useState<SaavnSong[]>([]);
  const [albums, setAlbums] = useState<SaavnAlbum[]>([]);

  const [loading, setLoading] = useState(false);

  const playSong = usePlayerStore((s) => s.playSong);
  const setQueue = useQueueStore((s) => s.setQueue);

  async function loadData() {
    try {
      setLoading(true);

      if (activeTab === "Songs") {
        const res = await searchSongs(query);
        setSongs(res.results);
      }

      if (activeTab === "Albums") {
        const res = await searchAlbums(query);
        setAlbums(res.results);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [activeTab]);

  return (
    <View style={{ flex: 1, backgroundColor: "#121212", paddingTop: 50 }}>

      {/* Header */}
      <View
        style={{
          paddingHorizontal: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 26, fontWeight: "900" }}>
          Vivek Music 🎵
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("Queue")}
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            backgroundColor: "#1e1e1e",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons name="list" size={22} color="white" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View
        style={{
          marginTop: 20,
          marginHorizontal: 20,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#1e1e1e",
          borderRadius: 14,
          paddingHorizontal: 14,
        }}
      >
        <Ionicons name="search" size={20} color="#777" />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search..."
          placeholderTextColor="#777"
          style={{
            flex: 1,
            color: "white",
            paddingHorizontal: 10,
            paddingVertical: 12,
          }}
        />
        <TouchableOpacity onPress={loadData}>
          <Ionicons name="arrow-forward-circle" size={26} color="orange" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={{ flexDirection: "row", marginTop: 20, marginLeft: 20 }}>
        {["Songs", "Albums"].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab as TabType)}
            style={{ marginRight: 22 }}
          >
            <Text
              style={{
                color: activeTab === tab ? "orange" : "#777",
                fontWeight: "800",
                fontSize: 14,
              }}
            >
              {tab}
            </Text>

            {activeTab === tab && (
              <View
                style={{
                  height: 3,
                  backgroundColor: "orange",
                  borderRadius: 2,
                  marginTop: 4,
                }}
              />
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      {loading ? (
        <ActivityIndicator
          size="large"
          color="orange"
          style={{ marginTop: 40 }}
        />
      ) : activeTab === "Songs" ? (

        <FlatList
          contentContainerStyle={{ padding: 20, paddingBottom: 140 }}
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

      ) : (

        <FlatList
          contentContainerStyle={{ padding: 20, paddingBottom: 140 }}
          data={albums}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ArtistAlbumCard
              name={item.name}
              subtitle={item.year || ""}
              image={item.image}
              onPress={() =>
                navigation.navigate("AlbumSongs", {
                  albumId: item.id,
                  albumName: item.name,
                })
              }
            />
          )}
        />

      )}
    </View>
  );
}
