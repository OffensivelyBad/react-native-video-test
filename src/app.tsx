import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import IdleVideo from "./idle-video";

const URL = "https://www.rmp-streaming.com/media/big-buck-bunny-360p.mp4";
const URL2 = "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4";

const Main = () => {

  const getVideoURLs = (): Promise<string[]> => {
    return new Promise<string[]>((resolve, _reject) => {
      setTimeout(() => {
        resolve([URL, URL2]);
      }, 1000);
    })
  };

  return (
    <View style={styles.container}>
      <Text>Derp up App.js to start working on your app!</Text>
      <IdleVideo
        startDelay={5}
        getVideoURLs={getVideoURLs}
      />
      <View style={styles.overlay} />
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    backgroundColor: "white",
    position: "absolute",
    width: 100,
    height: 100,
    bottom: 20
  }
});