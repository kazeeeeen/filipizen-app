/* import ScreenLayout from "@/components/screen-layout";
import Description from "@/components/ui/description";
import Header from "@/components/ui/header";
import { Color } from "@/constants/Colors";
import { font } from "@/constants/Fonts";
import React, { useEffect } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { runOnJS } from "react-native-reanimated";
import {
  Camera,
  useCameraDevice,
  useFrameProcessor,
} from "react-native-vision-camera";
import {
  Face,
  useFaceDetector,
} from "react-native-vision-camera-face-detector";
import { contains, Rect } from "./contain";

const { width: windowWidth } = Dimensions.get("window");

const PREVIEW_SIZE = 325;
const PREVIEW_RECT = {
  minX: (windowWidth - PREVIEW_SIZE) / 2,
  minY: 50,
  width: PREVIEW_SIZE,
  height: PREVIEW_SIZE,
};

interface FaceDetection {
  rollAngle: number;
  yawAngle: number;
  smilingProbability: number;
  leftEyeOpenProbability: number;
  rightEyeOpenProbability: number;
  bounds: {
    origin: {
      x: number;
      y: number;
    };
    size: {
      width: number;
      height: number;
    };
  };
}

const TransactionScreen = () => {
  const [hasPermission, setHasPermission] = React.useState(false);

  const device = useCameraDevice("front");

  useEffect(() => {
    const requestPermissions = async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === "granted");
    };
    requestPermissions();
  }, []);

  const onFacesDetected = (result: FaceDetectionResult) => {
    // 1. There is only a single face in the detection results.
    if (result.faces.length !== 1) {
      dispatch({ type: "FACE_DETECTED", payload: "no" });
      return;
    }

    const faceRect: Rect = {
      minX: face.bounds.origin.x,
      minY: face.bounds.origin.y,
      width: face.bounds.size.width,
      height: face.bounds.size.height,
    };
    // 2. The face is fully contained within the camera preview.
    const edgeOffset = 50;
    const faceRectSmaller: Rect = {
      width: faceRect.width - edgeOffset,
      height: faceRect.height - edgeOffset,
      minY: faceRect.minY + edgeOffset / 2,
      minX: faceRect.minX + edgeOffset / 2,
    };
    const previewContainsFace = contains({
      outside: PREVIEW_RECT,
      inside: faceRectSmaller,
    });
    if (!previewContainsFace) {
      return;
    }
    // 3. The face is not as big as the camera preview.
    const faceMaxSize = PREVIEW_SIZE - 90;
    if (faceRect.width >= faceMaxSize && faceRect.height >= faceMaxSize) {
      return;
    }
    // TODO: Process results at this point.
  };

  //@ts-ignore
  const face: FaceDetection = result.faces[0];
  const faceRect: Rect = {
    minX: face.bounds.origin.x,
    minY: face.bounds.origin.y,
    width: face.bounds.size.width,
    height: face.bounds.size.height,
  };

  const { detectFaces } = useFaceDetector({
    performanceMode: "fast", // like Mode.fast
    classificationMode: "all", // like Classifications.all
    landmarkMode: "none", // like Landmarks.none
    trackingEnabled: false, // like tracking: false
    minFaceSize: 0.15, // optional
  });

  /*   const onFacesDetected = (faces: Face[]) => {
    console.log("Detected faces:", faces);
  };

  const frameProcessor = useFrameProcessor(
    (frame) => {
      "worklet";
      const faces = detectFaces(frame);
      if (faces.length > 0) runOnJS(onFacesDetected)(faces);
    },
    [detectFaces]
  );

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  } */

/*   const onFacesDetected = (faces: Face[]) => {
    console.log("Detected faces:", faces);
  };

  const frameProcessor = useFrameProcessor(
    (frame) => {
      "worklet";
      const faces = detectFaces(frame);
      if (faces.length > 0) runOnJS(onFacesDetected)(faces);
    },
    [detectFaces]
  );
 */
/*  return (
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
              frameProcessor={frameProcessor}
              frameProcessorFps={8}
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
}; */

/* xport default TransactionScreen;

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
 */
