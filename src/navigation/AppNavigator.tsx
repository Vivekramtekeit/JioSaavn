// import React from "react";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import HomeScreen from "../screens/HomeScreen";
// import PlayerScreen from "../screens/PlayerScreen";
// import QueueScreen from "../screens/QueueScreen";

// export type RootStackParamList = {
//   Home: undefined;
//   Player: undefined;
//   Queue: undefined;
// };

// const Stack = createNativeStackNavigator<RootStackParamList>();

// export default function AppNavigator() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Home" component={HomeScreen} />
//       <Stack.Screen name="Player" component={PlayerScreen} />
//       <Stack.Screen name="Queue" component={QueueScreen} />
//     </Stack.Navigator>
//   );
// }



// import React from "react";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import HomeScreen from "../screens/HomeScreen";
// import PlayerScreen from "../screens/PlayerScreen";
// import QueueScreen from "../screens/QueueScreen";

// export type RootStackParamList = {
//   Home: undefined;
//   Player: undefined;
//   Queue: undefined;
// };

// const Stack = createNativeStackNavigator<RootStackParamList>();

// export default function AppNavigator() {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//         contentStyle: { backgroundColor: "#121212" }, // ✅ dark background
//       }}
//     >
//       <Stack.Screen name="Home" component={HomeScreen} />
//       <Stack.Screen name="Player" component={PlayerScreen} />
//       <Stack.Screen name="Queue" component={QueueScreen} />
//     </Stack.Navigator>
//   );
// }







// import React from "react";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import PlayerScreen from "../screens/PlayerScreen";
// import QueueScreen from "../screens/QueueScreen";
// import BottomTabs from "./BottomTabs";

// export type RootStackParamList = {
//   Tabs: undefined;
//   Player: undefined;
//   Queue: undefined;
// };

// const Stack = createNativeStackNavigator<RootStackParamList>();

// export default function AppNavigator() {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//         contentStyle: { backgroundColor: "#121212" },
//       }}
//     >
//       {/* 🔹 Main Bottom Tabs */}
//       <Stack.Screen name="Tabs" component={BottomTabs} />

//       {/* 🔹 Full Screens */}
//       <Stack.Screen name="Player" component={PlayerScreen} />
//       <Stack.Screen name="Queue" component={QueueScreen} />
//     </Stack.Navigator>
//   );
// }







// import React from "react";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";



// import PlayerScreen from "../screens/PlayerScreen";
// import QueueScreen from "../screens/QueueScreen";
// import BottomTabs from "./BottomTabs";
// import ArtistSongsScreen from "../screens/ArtistSongsScreen";

// export type RootStackParamList = {
//   Tabs: undefined;
//   Player: undefined;
//   Queue: undefined;
//   ArtistSongs: { artistId: string; artistName: string };
// };

// const Stack = createNativeStackNavigator<RootStackParamList>();

// export default function AppNavigator() {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//         contentStyle: { backgroundColor: "#121212" },
//       }}
//     >
//       <Stack.Screen name="Tabs" component={BottomTabs} />
//       <Stack.Screen name="Player" component={PlayerScreen} />
//       <Stack.Screen name="Queue" component={QueueScreen} />


//       {/* ✅ NEW Artist Songs Screen */}
//       <Stack.Screen name="ArtistSongs" component={ArtistSongsScreen} />
 
//     </Stack.Navigator>
//   );
// }







// import React from "react";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import PlayerScreen from "../screens/PlayerScreen";
// import QueueScreen from "../screens/QueueScreen";
// import BottomTabs from "./BottomTabs";

// import ArtistSongsScreen from "../screens/ArtistSongsScreen";
// import AlbumSongsScreen from "../screens/AlbumSongsScreen"; // ✅ NEW

// export type RootStackParamList = {
//   Tabs: undefined;
//   Player: undefined;
//   Queue: undefined;
//   ArtistSongs: { artistId: string; artistName: string };
//   AlbumSongs: { albumId: string; albumName: string }; // ✅ NEW
// };

// const Stack = createNativeStackNavigator<RootStackParamList>();

// export default function AppNavigator() {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//         contentStyle: { backgroundColor: "#121212" },
//       }}
//     >
//       <Stack.Screen name="Tabs" component={BottomTabs} />
//       <Stack.Screen name="Player" component={PlayerScreen} />
//       <Stack.Screen name="Queue" component={QueueScreen} />

//       {/* Artist → Songs */}
//       <Stack.Screen name="ArtistSongs" component={ArtistSongsScreen} />

//       {/* Album → Songs */}
//       <Stack.Screen name="AlbumSongs" component={AlbumSongsScreen} />
//     </Stack.Navigator>
//   );
// }




// import React from "react";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import PlayerScreen from "../screens/PlayerScreen";
// import QueueScreen from "../screens/QueueScreen";
// import BottomTabs from "./BottomTabs";

// import ArtistSongsScreen from "../screens/ArtistSongsScreen";
// import AlbumSongsScreen from "../screens/AlbumSongsScreen";

// export type RootStackParamList = {
//   Tabs: undefined;
//   Player: undefined;
//   Queue: undefined;
//   ArtistSongs: { artistId: string; artistName: string };
//   AlbumSongs: { albumId: string; albumName: string };
// };

// const Stack = createNativeStackNavigator<RootStackParamList>();

// export default function AppNavigator() {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//         contentStyle: { backgroundColor: "#121212" },
//       }}
//     >
//       <Stack.Screen name="Tabs" component={BottomTabs} />
//       <Stack.Screen name="Player" component={PlayerScreen} />
//       <Stack.Screen name="Queue" component={QueueScreen} />

//       <Stack.Screen name="ArtistSongs" component={ArtistSongsScreen} />
//       <Stack.Screen name="AlbumSongs" component={AlbumSongsScreen} />
//     </Stack.Navigator>
//   );
// }






import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PlayerScreen from "../screens/PlayerScreen";
import QueueScreen from "../screens/QueueScreen";
import BottomTabs from "./BottomTabs";

import ArtistSongsScreen from "../screens/ArtistSongsScreen";
import AlbumSongsScreen from "../screens/AlbumSongsScreen";

// 🔥 NEW Playlist Screens
import PlaylistsScreen from "../screens/PlaylistsScreen";
import CreatePlaylistScreen from "../screens/CreatePlaylistScreen";
import PlaylistSongsScreen from "../screens/PlaylistSongsScreen";

export type RootStackParamList = {
  Tabs: undefined;
  Player: undefined;
  Queue: undefined;

  ArtistSongs: { artistId: string; artistName: string };
  AlbumSongs: { albumId: string; albumName: string };

  // 🔥 Playlist Routes
  Playlists: undefined;
  CreatePlaylist: undefined;
  PlaylistSongs: { playlistId: string; playlistName: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#121212" },
      }}
    >
      {/* Bottom Tabs */}
      <Stack.Screen name="Tabs" component={BottomTabs} />

      {/* Player & Queue */}
      <Stack.Screen name="Player" component={PlayerScreen} />
      <Stack.Screen name="Queue" component={QueueScreen} />

      {/* Artist / Album */}
      <Stack.Screen name="ArtistSongs" component={ArtistSongsScreen} />
      <Stack.Screen name="AlbumSongs" component={AlbumSongsScreen} />

      {/* 🔥 Playlist Flow */}
      <Stack.Screen name="Playlists" component={PlaylistsScreen} />
      <Stack.Screen name="CreatePlaylist" component={CreatePlaylistScreen} />
      <Stack.Screen name="PlaylistSongs" component={PlaylistSongsScreen} />
    </Stack.Navigator>
  );
}
