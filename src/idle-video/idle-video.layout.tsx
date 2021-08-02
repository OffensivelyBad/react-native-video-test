import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import VideoView from './video-view';
import styles from './styles';

type Props = {
  children: React.ReactNode;
  startDelaySeconds?: number;
  videoURLs: string[];
}

const IdleVideo = (props: Props) => {
  const [videoIndex, setVideoIndex] = React.useState(0);
  const [showingVideo, setShowingVideo] = React.useState(false);
  const [timerSeconds, setTimerSeconds] = React.useState(0);
  const timerTick = React.useRef<() => void>();
  const { children, startDelaySeconds = 0, videoURLs } = props;

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
    if (startDelaySeconds === 0 || showingVideo) {
      return;
    }
    const id = setInterval(() => timerTick.current && timerTick.current(), 1000);
    return () => clearInterval(id);
  }, [startDelaySeconds, showingVideo]);


  const onVideoEnd = React.useCallback(() => {
    console.log('video ended');
    if (videoURLs.length) {
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
    onVideoEnd();
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
    <TouchableOpacity style={styles.container} activeOpacity={1} onPress={onTouch}>
      {renderChildren()}
    </TouchableOpacity>
  );
};

export default IdleVideo;
