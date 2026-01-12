



import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { getBestImage } from "../api/saavn";

type Props = {
  name: string;
  subtitle: string;
  image?: { url: string }[];
  onPress?: () => void;
};

export default function ArtistAlbumCard({ name, subtitle, image, onPress }: Props) {
  const imgUrl = getBestImage({ image }); 
  // getBestImage already returns placeholder if empty

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        padding: 12,
        borderRadius: 14,
        backgroundColor: "#1e1e1e",
        marginBottom: 12,
        alignItems: "center",
      }}
    >
      {/* ✅ Always show image (real or placeholder) */}
      <Image
        source={{ uri: imgUrl }}
        style={{
          width: 55,
          height: 55,
          borderRadius: 12,
          marginRight: 12,
          backgroundColor: "#2a2a2a",
        }}
      />

      <View style={{ flex: 1 }}>
        <Text style={{ color: "white", fontSize: 16, fontWeight: "700" }}>
          {name}
        </Text>
        <Text style={{ color: "#aaa", fontSize: 13, marginTop: 3 }}>
          {subtitle}
        </Text>
      </View>
    </TouchableOpacity>
  );
}







