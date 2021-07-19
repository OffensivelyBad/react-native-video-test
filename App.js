import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import Video from "react-native-video";
import convertToProxyURL from "react-native-video-cache";

const URL = "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4";

export default function App() {

  let player = null;

  const onPressPlay = function () {
    console.log("button pressed")
    if (player) {
    }
  }

  const onSave = async () => {
    if (player) {
      // Fails to save...
      const response = await player.save();
      const uri = response.uri;
      console.log(`here's the uri: ${uri}`);
    }
  }

  return (
    <View style={styles.container}>
      <Text>Derp up App.js to start working on your app!</Text>
      <Pressable onPress={onPressPlay}><Text>video button</Text></Pressable>
      <Pressable onPress={onSave}><Text>save</Text></Pressable>
      <Video
        source={{ uri: convertToProxyURL(URL) }}
        ref={(ref) => player = ref}
        style={{ position: "absolute", width: 200, height: 200, top: 0 }}
        onBuffer={() => console.log("buffering....")}
        onError={() => console.log("error occurred")}
        repeat
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
