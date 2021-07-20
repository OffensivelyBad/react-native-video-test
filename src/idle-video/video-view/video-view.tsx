import React from 'react';
import Video from "react-native-video";
import styles from "./styles";

type Props = {
  videoURL: string;
  onBuffer?: () => void;
  onEnd?: () => void;
  onError?: (error: string) => void;
  repeat?: boolean;
}

const VideoView = (props: Props) => {
  const {
    videoURL,
    onBuffer,
    onEnd,
    onError,
    repeat
  } = props;
  const player = React.useRef<Video>(null);

  const handleError = (errorString?: string) => {
    const error = errorString ? errorString : `Error playing video at ${videoURL}`;
    console.warn(error);
    if (onError) {
      onError(error);
    }
  };

  return (
    <Video
      source={{ uri: videoURL }}
      ref={player}
      style={styles.video}
      onBuffer={onBuffer}
      onError={({ error }) => handleError(error.errorString)}
      repeat={repeat}
      onEnd={onEnd}
    />
  );
}

export default VideoView;
