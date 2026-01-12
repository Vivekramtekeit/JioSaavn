// import React from "react";
// import { View, Text, TouchableOpacity, Modal } from "react-native";

// type Props = {
//   visible: boolean;
//   title: string;
//   options: { label: string; onPress: () => void }[];
//   onClose: () => void;
// };

// export default function ActionSheet({ visible, title, options, onClose }: Props) {
//   return (
//     <Modal visible={visible} transparent animationType="slide">
//       <View style={{
//         flex: 1,
//         backgroundColor: "rgba(0,0,0,0.6)",
//         justifyContent: "flex-end",
//       }}>
//         <View style={{
//           backgroundColor: "#1e1e1e",
//           padding: 20,
//           borderTopLeftRadius: 22,
//           borderTopRightRadius: 22,
//         }}>

//           <Text style={{
//             color: "white",
//             fontSize: 16,
//             fontWeight: "900",
//             marginBottom: 15
//           }}>
//             {title}
//           </Text>

//           {options.map((op, i) => (
//             <TouchableOpacity
//               key={i}
//               onPress={op.onPress}
//               style={{ paddingVertical: 14 }}
//             >
//               <Text style={{ color: "white", fontSize: 15 }}>
//                 {op.label}
//               </Text>
//             </TouchableOpacity>
//           ))}

//           <TouchableOpacity onPress={onClose} style={{ paddingVertical: 14 }}>
//             <Text style={{
//               color: "orange",
//               fontSize: 15,
//               fontWeight: "900"
//             }}>
//               Cancel
//             </Text>
//           </TouchableOpacity>

//         </View>
//       </View>
//     </Modal>
//   );
// }







import React from "react";
import { View, Text, TouchableOpacity, Modal, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SaavnSong } from "../api/saavn";
import { usePlaylistStore } from "../store/playlistStore";

type Props = {
  visible: boolean;
  song: SaavnSong;
  onClose: () => void;
};

export default function ActionSheet({ visible, song, onClose }: Props) {
  const navigation: any = useNavigation();
  const playlists = usePlaylistStore((s) => s.playlists);
  const addSongToPlaylist = usePlaylistStore((s) => s.addSongToPlaylist);

  async function handleAdd(playlistId: string) {
    await addSongToPlaylist(playlistId, song);
    onClose();
  }

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={{
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "flex-end",
      }}>
        <View style={{
          backgroundColor: "#1e1e1e",
          padding: 20,
          borderTopLeftRadius: 22,
          borderTopRightRadius: 22,
          maxHeight: "60%"
        }}>

          <Text style={{
            color: "white",
            fontSize: 16,
            fontWeight: "900",
            marginBottom: 15
          }}>
            Add to Playlist
          </Text>

          {/* Create New Playlist */}
          <TouchableOpacity
            onPress={() => {
              onClose();
              navigation.navigate("CreatePlaylist");
            }}
            style={{ flexDirection: "row", alignItems: "center", paddingVertical: 14 }}
          >
            <Ionicons name="add-circle" size={24} color="orange" />
            <Text style={{ color: "white", fontSize: 15, marginLeft: 10 }}>
              Create New Playlist
            </Text>
          </TouchableOpacity>

          {/* Existing Playlists */}
          <FlatList
            data={playlists}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleAdd(item.id)}
                style={{ paddingVertical: 12 }}
              >
                <Text style={{ color: "white", fontSize: 15 }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />

          {/* Cancel */}
          <TouchableOpacity onPress={onClose} style={{ paddingVertical: 14 }}>
            <Text style={{ color: "orange", fontSize: 15, fontWeight: "900" }}>
              Cancel
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}
