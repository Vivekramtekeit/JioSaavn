// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { View } from "react-native";
// import AppNavigator from "./src/navigation/AppNavigator";
// import MiniPlayer from "./src/components/MiniPlayer";

// export default function App() {
//   return (
//     <NavigationContainer>
//       <View style={{ flex: 1 }}>
//         <AppNavigator />
//         <MiniPlayer />
//       </View>
//     </NavigationContainer>
//   );
// }




// import React from "react";
// import { NavigationContainer, DarkTheme } from "@react-navigation/native";
// import { View, StatusBar } from "react-native";
// import AppNavigator from "./src/navigation/AppNavigator";
// import MiniPlayer from "./src/components/MiniPlayer";

// export default function App() {
//   return (
//     <NavigationContainer theme={DarkTheme}>
//       <StatusBar barStyle="light-content" />
//       <View style={{ flex: 1, backgroundColor: "#121212" }}>
//         <AppNavigator />
//         <MiniPlayer />
//       </View>
//     </NavigationContainer>
//   );
// }





// import React from "react";
// import { NavigationContainer, DarkTheme } from "@react-navigation/native";
// import { View, StatusBar } from "react-native";
// import AppNavigator from "./src/navigation/AppNavigator";
// import MiniPlayer from "./src/components/MiniPlayer";

// export default function App() {
//   return (
//     <NavigationContainer theme={DarkTheme}>
//       <StatusBar barStyle="light-content" backgroundColor="#121212" />
//       <View style={{ flex: 1, backgroundColor: "#121212" }}>
//         <AppNavigator />
//         <MiniPlayer />
//       </View>
//     </NavigationContainer>
//   );
// }




// import React from "react";
// import { NavigationContainer, DarkTheme } from "@react-navigation/native";
// import { View, StatusBar } from "react-native";

// import AppNavigator from "./src/navigation/AppNavigator";
// import MiniPlayer from "./src/components/MiniPlayer";

// export default function App() {
//   return (
//     <NavigationContainer theme={DarkTheme}>
//       <StatusBar barStyle="light-content" />
      
//       <View style={{ flex: 1, backgroundColor: "#121212" }}>
//         <AppNavigator />

//         {/* ✅ MiniPlayer ALWAYS above bottom tabs */}
//         <MiniPlayer />
//       </View>
//     </NavigationContainer>
//   );
// }





// import React from "react";
// import { NavigationContainer, DarkTheme } from "@react-navigation/native";
// import { View, StatusBar } from "react-native";

// import AppNavigator from "./src/navigation/AppNavigator";
// import MiniPlayer from "./src/components/MiniPlayer";
// import { useNavigationState } from "@react-navigation/native";

// function RootWithMiniPlayer() {
//   const routeName = useNavigationState(
//     (state) => state.routes[state.index].name
//   );

//   return (
//     <View style={{ flex: 1, backgroundColor: "#121212" }}>
//       <AppNavigator />

//       {/* ✅ Show MiniPlayer only if NOT Player screen */}
//       {routeName !== "Player" && <MiniPlayer />}
//     </View>
//   );
// }

// export default function App() {
//   return (
//     <NavigationContainer theme={DarkTheme}>
//       <StatusBar barStyle="light-content" />
//       <RootWithMiniPlayer />
//     </NavigationContainer>
//   );
// }




// import React from "react";
// import { NavigationContainer, DarkTheme } from "@react-navigation/native";
// import { StatusBar } from "react-native";

// import AppNavigator from "./src/navigation/AppNavigator";
// import MiniPlayer from "./src/components/MiniPlayer";
// import { usePlayerStore } from "./src/store/playerStore";

// function MainLayout() {
//   const song = usePlayerStore((s) => s.currentSong);

//   return (
//     <>
//       <AppNavigator />

//       {/* ✅ Show MiniPlayer only if a song exists */}
//       {song && <MiniPlayer />}
//     </>
//   );
// }

// export default function App() {
//   return (
//     <NavigationContainer theme={DarkTheme}>
//       <StatusBar barStyle="light-content" />
//       <MainLayout />
//     </NavigationContainer>
//   );
// }










// import React from "react";
// import { NavigationContainer, DarkTheme } from "@react-navigation/native";
// import { StatusBar } from "react-native";
// import AppNavigator from "./src/navigation/AppNavigator";

// export default function App() {
//   return (
//     <NavigationContainer theme={DarkTheme}>
//       <StatusBar barStyle="light-content" />
//       <AppNavigator />
//     </NavigationContainer>
//   );
// }




import React, { useEffect } from "react";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { StatusBar } from "react-native";
import AppNavigator from "./src/navigation/AppNavigator";
import { usePlaylistStore } from "./src/store/playlistStore";

export default function App() {

  useEffect(() => {
    usePlaylistStore.getState().loadPlaylists();
  }, []);

  return (
    <NavigationContainer theme={DarkTheme}>
      <StatusBar barStyle="light-content" />
      <AppNavigator />
    </NavigationContainer>
  );
}



