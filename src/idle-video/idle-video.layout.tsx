import * as React from 'react';
import { View } from 'react-native';
import convertToProxyURL from 'react-native-video-cache';
import VideoView from './video-view';
import styles from './styles';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

type Props = {
  children: React.ReactNode;
  startDelaySeconds?: number;
  getVideoURLs?: () => Promise<string[]>;
}

const IdleVideo = (props: Props) => {
  const [videoURLs, setVideoURLs] = React.useState<string[]>([]);
  const [videoIndex, setVideoIndex] = React.useState(0);
  const [showingVideo, setShowingVideo] = React.useState(false);
  const [timerSeconds, setTimerSeconds] = React.useState(0);
  const timerTick = React.useRef<() => void>();
  const { children, startDelaySeconds = 0, getVideoURLs } = props;

  const tick = React.useCallback(() => {
    setTimerSeconds(seconds => seconds + 1);

    if (timerSeconds >= startDelaySeconds) {
      setShowingVideo(true);
    } else {
      setShowingVideo(false);
    }
  }, [timerSeconds, startDelaySeconds, setShowingVideo]);

  if (startDelaySeconds) {
    timerTick.current = tick;
  }

  React.useEffect(() => {
    if (startDelaySeconds === 0) {
      setShowingVideo(true);
    }
  }, []);

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

  React.useEffect(() => {
    if (startDelaySeconds === 0 || showingVideo) {
      return;
    }
    const id = setInterval(() => timerTick.current && timerTick.current(), 1000);
    return () => clearInterval(id);
  }, [startDelaySeconds, showingVideo]);


  const onVideoEnd = React.useCallback(() => {
    console.log('video ended');
    if (videoURLs.length > 1) {
      const newVideoIndex = videoIndex >= videoURLs.length ? 0 : videoIndex + 1;
      setVideoIndex(newVideoIndex);
    }
  }, [videoURLs, videoIndex, setVideoIndex]);

  const onTouch = () => {
    setShowingVideo(false);
    setTimerSeconds(0);
  }

  const onBuffer = function () {
    console.log('Buffering...');
  };

  const onError = function (error: string) {
    console.log(error);
  }

  const currentURL = videoURLs.length > videoIndex ? videoURLs[videoIndex] : "";

  const renderChildren = () => {
    if (showingVideo && currentURL.length) {
      return (
        <VideoView
          videoURL={currentURL}
          onBuffer={onBuffer}
          onEnd={onVideoEnd}
          onError={onError}
          repeat={videoURLs.length === 1}
        />
      );
    }
    return children;
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={onTouch}>
          {renderChildren()}
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};

export default IdleVideo;
