import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  video: {
    height: height,
    width: width
  }
});

export default styles;
