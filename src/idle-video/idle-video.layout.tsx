import * as React from 'react';
import { View } from 'react-native';
import convertToProxyURL from 'react-native-video-cache';
import VideoView from './video-view';
import styles from './styles';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

type Props = {
  startDelay?: number;
  getVideoURLs?: () => Promise<string[]>;
}

const IdleVideo = (props: Props) => {
  const [videoURLs, setVideoURLs] = React.useState<string[]>([]);
  const [videoIndex, setVideoIndex] = React.useState(0);
  const { startDelay = 0, getVideoURLs } = props;

  React.useEffect(() => {
    if (getVideoURLs) {
      const getURLs = async () => {
        const urls = await getVideoURLs();
        const proxyURLs = urls.map(url => convertToProxyURL(url));
        setVideoURLs(proxyURLs);
      };
      getURLs();
    }
  }, []);

  const onVideoEnd = React.useCallback(() => {
    console.log('video ended');
    if (videoURLs.length > 1) {
      const newVideoIndex = videoIndex >= videoURLs.length ? 0 : videoIndex + 1;
      setVideoIndex(newVideoIndex);
    }
  }, [videoURLs, videoIndex, setVideoIndex]);

  const onTouch = () => {
    console.log('video touched');
  }

  const onBuffer = function () {
    console.log('Buffering...');
  };

  const onError = function (error: string) {
    console.log(error);
  }

  const currentURL = videoURLs.length > videoIndex ? videoURLs[videoIndex] : "";

  return (
    <>
      {currentURL.length > 0 ? (
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={onTouch}>
            <VideoView
              videoURL={currentURL}
              onBuffer={onBuffer}
              onEnd={onVideoEnd}
              onError={onError}
              repeat={videoURLs.length === 1}
            />
          </TouchableWithoutFeedback>
        </View>
      ) : null}
    </>
  );
};

export default IdleVideo;
