import ScreenLayout from "@/components/screen-layout";
import Description from "@/components/ui/description";
import Header from "@/components/ui/header";
import React, { useEffect } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

import { Color } from "@/constants/Colors";
import { font } from "@/constants/Fonts";
import {
  Camera,
  useCameraDevice,
  useFrameProcessor,
} from "react-native-vision-camera";
import { useFaceDetector } from "react-native-vision-camera-face-detector";

const { width: windowWidth } = Dimensions.get("window");

const PREVIEW_SIZE = 325;
const PREVIEW_RECT = {
  minX: (windowWidth - PREVIEW_SIZE) / 2,
  minY: 50,
  width: PREVIEW_SIZE,
  height: PREVIEW_SIZE,
};

const TransactionScreen = () => {
  const [hasPermission, setHasPermission] = React.useState(false);

  const device = useCameraDevice("front");

  const { detectFaces, stopListeners } = useFaceDetector(faceDetectionOptions);

  const frameProcessor = useFrameProcessor(
    (frame) => {
      "worklet";
      const faces = detectFaces(frame);
      handleDetectedFaces(faces);
    },
    [handleDetectedFaces]
  );

  useEffect(() => {
    const requestPermissions = async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === "granted");
    };
    requestPermissions();
  }, []);
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <ScreenLayout
      header={
        <>
          <Header title="Face Liveness" backHandler={false} />
          <Description text="Please follow the instructions to complete the face liveness check." />
        </>
      }
    >
      <View>
        <AnimatedCircularProgress
          size={PREVIEW_SIZE}
          width={7}
          fill={0}
          tintColor={Color.primary_400}
          backgroundColor="#e8e8e8"
          style={styles.circularProgress}
        >
          {() => (
            <Camera
              style={{
                width: PREVIEW_SIZE - 12,
                height: PREVIEW_SIZE - 12,
                borderRadius: (PREVIEW_SIZE - 14) / 2,
                overflow: "hidden",
              }}
              device={device}
              isActive={true}
            />
          )}
        </AnimatedCircularProgress>
      </View>
      <View style={styles.instructionsContainer}>
        <Text style={styles.instructions}>Instructions</Text>
        <Text style={styles.action}>Action to perform</Text>
      </View>
    </ScreenLayout>
  );
};

export default TransactionScreen;

const styles = StyleSheet.create({
  mask: {
    borderRadius: PREVIEW_SIZE / 2,
    height: PREVIEW_SIZE,
    width: PREVIEW_SIZE,
    marginTop: PREVIEW_RECT.minY,
    alignSelf: "center",
    backgroundColor: "white",
  },
  circularProgress: {
    width: PREVIEW_SIZE,
    height: PREVIEW_SIZE,
    marginTop: PREVIEW_RECT.minY,
    marginLeft: PREVIEW_RECT.minX,
  },
  instructions: {
    marginBottom: 20,
    fontFamily: font.intermedium,
    color: Color.neutral_400,
    fontSize: 18,
    textAlign: "center",
  },
  instructionsContainer: {
    padding: 20,
    alignItems: "center",
  },
  action: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
  },
});
