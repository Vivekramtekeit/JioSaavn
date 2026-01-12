




// import React, { useState } from "react";
// import { View, Text, Image, TouchableOpacity } from "react-native";
// import { Ionicons } from "@expo/vector-icons";

// import { SaavnSong, getBestImage, getArtistName, getCleanSongName } from "../api/saavn";

// import { useQueueStore } from "../store/queueStore";
// import { usePlaylistStore } from "../store/playlistStore";

// import ActionSheet from "./ActionSheet";

// type Props = {
//   song: SaavnSong;
//   onPress: () => void;
// };

// export default function SongCard({ song, onPress }: Props) {

//   const addToQueue = useQueueStore((s) => s.addToQueue);
//   const queue = useQueueStore((s) => s.queue);
//   const currentIndex = useQueueStore((s) => s.currentIndex);
//   const setQueue = useQueueStore((s) => s.setQueue);

//   const playlists = usePlaylistStore((s) => s.playlists);
//   const addSongToPlaylist = usePlaylistStore((s) => s.addSongToPlaylist);

//   const [showSheet, setShowSheet] = useState(false);

//   async function playNext() {
//     const newQueue = [...queue];
//     newQueue.splice(currentIndex + 1, 0, song);
//     await setQueue(newQueue, currentIndex);
//   }

//   return (
//     <>
//       <TouchableOpacity
//         onPress={onPress}
//         style={{
//           flexDirection: "row",
//           alignItems: "center",
//           backgroundColor: "#1e1e1e",
//           borderRadius: 14,
//           padding: 10,
//           marginBottom: 12,
//         }}
//       >
//         <Image
//           source={{ uri: getBestImage(song) }}
//           style={{ width: 55, height: 55, borderRadius: 10 }}
//         />

//         <View style={{ flex: 1, marginLeft: 12 }}>
//           <Text style={{ color: "white", fontSize: 15, fontWeight: "800" }} numberOfLines={1}>
//             {getCleanSongName(song.name)}
//           </Text>

//           <Text style={{ color: "#aaa", fontSize: 12, marginTop: 3 }} numberOfLines={1}>
//             {getArtistName(song)}
//           </Text>
//         </View>

//         {/* ▶️ Play Button */}
//         <TouchableOpacity onPress={onPress} style={{ marginRight: 10 }}>
//           <Ionicons name="play-circle" size={34} color="orange" />
//         </TouchableOpacity>

//         {/* 3 Dots */}
//         <TouchableOpacity onPress={() => setShowSheet(true)}>
//           <Ionicons name="ellipsis-vertical" size={22} color="#aaa" />
//         </TouchableOpacity>
//       </TouchableOpacity>

//       {/* Action Sheet */}
//       <ActionSheet
//         visible={showSheet}
//         title={getCleanSongName(song.name)}
//         onClose={() => setShowSheet(false)}
//         options={[
//           {
//             label: "Add to Queue",
//             onPress: async () => {
//               await addToQueue(song);
//               setShowSheet(false);
//             },
//           },
//           {
//             label: "Play Next",
//             onPress: async () => {
//               await playNext();
//               setShowSheet(false);
//             },
//           },
//           {
//             label: "Add to Playlist",
//             onPress: async () => {
//               if (playlists.length > 0) {
//                 await addSongToPlaylist(playlists[0].id, song);
//               }
//               setShowSheet(false);
//             },
//           },
//           {
//             label: "Download Song",
//             onPress: () => {
//               console.log("Download:", song.name);
//               setShowSheet(false);
//             },
//           },
//         ]}
//       />
//     </>
//   );
// }










import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SaavnSong, getBestImage, getArtistName, getCleanSongName, downloadSong } from "../api/saavn";
import { useQueueStore } from "../store/queueStore";
import { usePlaylistStore } from "../store/playlistStore";
import ActionSheet from "./ActionSheet";

type Props = {
  song: SaavnSong;
  onPress: () => void;
};

export default function SongCard({ song, onPress }: Props) {
  const navigation: any = useNavigation();
  const addToQueue = useQueueStore((s) => s.addToQueue);
  const queue = useQueueStore((s) => s.queue);
  const currentIndex = useQueueStore((s) => s.currentIndex);
  const setQueue = useQueueStore((s) => s.setQueue);
  const playlists = usePlaylistStore((s) => s.playlists);
  const addSongToPlaylist = usePlaylistStore((s) => s.addSongToPlaylist);
  const [showSheet, setShowSheet] = useState(false);

  async function playNext() {
    const newQueue = [...queue];
    newQueue.splice(currentIndex + 1, 0, song);
    await setQueue(newQueue, currentIndex);
  }

  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#1e1e1e",
          borderRadius: 14,
          padding: 10,
          marginBottom: 12,
        }}
      >
        <Image
          source={{ uri: getBestImage(song) }}
          style={{ width: 55, height: 55, borderRadius: 10 }}
        />

        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={{ color: "white", fontSize: 15, fontWeight: "800" }} numberOfLines={1}>
            {getCleanSongName(song.name)}
          </Text>

          <Text style={{ color: "#aaa", fontSize: 12, marginTop: 3 }} numberOfLines={1}>
            {getArtistName(song)}
          </Text>
        </View>

        <TouchableOpacity onPress={onPress} style={{ marginRight: 10 }}>
          <Ionicons name="play-circle" size={34} color="orange" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowSheet(true)}>
          <Ionicons name="ellipsis-vertical" size={22} color="#aaa" />
        </TouchableOpacity>
      </TouchableOpacity>

      {/* Action Sheet */}
      <ActionSheet
        visible={showSheet}
        title={getCleanSongName(song.name)}
        onClose={() => setShowSheet(false)}
        options={[
          {
            label: "Add to Queue",
            onPress: async () => {
              await addToQueue(song);
              setShowSheet(false);
            },
            icon: "add-circle-outline",
          },
          {
            label: "Play Next",
            onPress: async () => {
              await playNext();
              setShowSheet(false);
            },
            icon: "play-skip-forward-outline",
          },
          {
            label: "Add to Playlist",
            onPress: async () => {
              navigation.navigate("AddToPlaylist", { song });
              setShowSheet(false);
            },
            icon: "list-outline",
          },
          {
            label: "Download Song",
            onPress: async () => {
              await downloadSong(song);
              setShowSheet(false);
            },
            icon: "download-outline",
          },
        ]}
      />
    </>
  );
}
