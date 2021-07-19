import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import Video from "react-native-video";

const URL = "https://rawgit.com/mediaelement/mediaelement-files/master/big_buck_bunny.mp4";

export default function App() {

  let player = null;

  const onPressPlay = function () {
    console.log("button pressed")
    if (player) {
    }
  }

  const onSave = async () => {
    if (player) {
      const response = await player.save();
      const uri = response.uri;
      console.log(`here's the uri: ${uri}`);
    }
  }

  useEffect(() => {
    if (player) {
      // attempt to save the video for caching
      player.save();
    }
  }, [player]);

  return (
    <View style={styles.container}>
      <Text>Derp up App.js to start working on your app!</Text>
      <Pressable onPress={onPressPlay}><Text>video button</Text></Pressable>
      <Pressable onPress={onSave}><Text>save</Text></Pressable>
      <Video
        source={{ uri: URL }}
        ref={(ref) => player = ref}
        // style={{ position: "absolute", width: 200, height: 200, top: 0 }}
        style={{ position: "absolute", top: 0, bottom: 0, backgroundColor: "blue", start: -110, end: -110 }}
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
