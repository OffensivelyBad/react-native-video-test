import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import IdleVideo from "./idle-video";
import RNFS from "react-native-fs";

const DOWNLOAD_VIDEOS = true;
const FILE_PATH = Platform.OS === 'ios' ? `${RNFS.DocumentDirectoryPath}` : `${RNFS.ExternalDirectoryPath}`;

const URL = "https://www.rmp-streaming.com/media/big-buck-bunny-360p.mp4";
const URL2 = "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4";

const Main = () => {
  const [videoURLs, setVideoURLs] = React.useState<string[]>([]);
  const [videoLocations, setVideoLocations] = React.useState<string[]>([]);

  const getVideoURLs = (): Promise<string[]> => {
    return new Promise<string[]>((resolve, _reject) => {
      setTimeout(() => {
        resolve([URL, URL2]);
      }, 1000);
    })
  };

  const checkFileExists = async (
    path: string,
    filename: string,
  ): Promise<boolean> => {
    const result = await RNFS.readDir(path);
    const exists = result.some((file) => file.name === filename);
    return exists;
  };

  const downloadVideos = async (urls: string[]): Promise<string[]> => {
    const locations = await Promise.all(
      urls.map(async (url) => {
        const components = url.split('/');
        const filename = components.length
          ? components[components.length - 1]
          : '';
        const alreadyDownloaded = await checkFileExists(FILE_PATH, filename);
        const fileLocation = `${FILE_PATH}/${filename}`;
        if (!alreadyDownloaded) {
          await RNFS.downloadFile({
            fromUrl: url,
            toFile: fileLocation,
          }).promise;
        }
        return fileLocation;
      }),
    );

    return locations;
  };

  React.useEffect(() => {
    const getURLs = async () => {
      const urls = await getVideoURLs();
      setVideoURLs(urls);
    };
    getURLs();
  }, []);

  React.useEffect(() => {
    if (DOWNLOAD_VIDEOS) {
      downloadVideos(videoURLs);
    }
  }, [videoURLs]);

  return (
    <IdleVideo
      startDelaySeconds={2}
      videoURLs={DOWNLOAD_VIDEOS ? videoLocations : videoURLs}
    >
      <View style={styles.container}>
        <Text>Derp up App.js to start working on your app!</Text>
        <View style={styles.overlay} />
      </View>
    </IdleVideo>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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