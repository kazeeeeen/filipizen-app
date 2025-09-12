import ScreenLayout from "@/components/screen-layout";
import Button2 from "@/components/ui/buttons/Button2";
import Description from "@/components/ui/description";
import Header from "@/components/ui/header";
import { Color } from "@/constants/Colors";
import { font } from "@/constants/Fonts";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import {
  Camera,
  useCameraDevice,
  useFrameProcessor,
} from "react-native-vision-camera";
import {
  Face,
  FaceDetectionOptions,
  useFaceDetector,
} from "react-native-vision-camera-face-detector";
import { Worklets } from "react-native-worklets-core";

/* -------------------- SIZE -------------------- */

const { width: windowWidth } = Dimensions.get("window");

const PREVIEW_SIZE = 325;
const PREVIEW_RECT = {
  minX: (windowWidth - PREVIEW_SIZE) / 2,
  minY: 50,
  width: PREVIEW_SIZE,
  height: PREVIEW_SIZE,
};

/* -------------------- DETECTIONS -------------------- */
const detections = {
  BLINK: { instruction: "Blink both eyes", minProbability: 0.3 },
  TURN_HEAD_LEFT: { instruction: "Turn head left", maxAngle: -45 },
  TURN_HEAD_RIGHT: { instruction: "Turn head right", minAngle: 15 },
  NOD: { instruction: "Nod your head", minDiff: 1.5 },
  SMILE: { instruction: "Smile", minProbability: 0.7 },
};
type DetectionActions = keyof typeof detections;
const detectionsList: DetectionActions[] = [
  "BLINK",
  "TURN_HEAD_LEFT",
  "TURN_HEAD_RIGHT",
  "NOD",
  "SMILE",
];

/* -------------------- STATE MODEL -------------------- */
const initialState = {
  faceDetected: "no" as "yes" | "no",
  faceTooBig: "no" as "yes" | "no",
  detectionsList,
  currentDetectionIndex: 0,
  progressFill: 0,
  processComplete: false,
};

interface Actions {
  FACE_DETECTED: "yes" | "no";
  FACE_TOO_BIG: "yes" | "no";
  NEXT_DETECTION: null;
}
interface Action<T extends keyof Actions> {
  type: T;
  payload: Actions[T];
}
type PossibleActions = {
  [K in keyof Actions]: Action<K>;
}[keyof Actions];

const detectionReducer = (
  state: typeof initialState,
  action: PossibleActions
): typeof initialState => {
  switch (action.type) {
    case "FACE_DETECTED":
      if (action.payload === "yes") {
        return {
          ...state,
          faceDetected: action.payload,
          progressFill: 100 / (state.detectionsList.length + 1),
        };
      } else {
        return initialState;
      }
    case "FACE_TOO_BIG":
      return { ...state, faceTooBig: action.payload };
    case "NEXT_DETECTION":
      const nextDetectionIndex = state.currentDetectionIndex + 1;
      const progressMultiplier = nextDetectionIndex + 1;
      const newProgressFill =
        (100 / (state.detectionsList.length + 1)) * progressMultiplier;
      if (nextDetectionIndex === state.detectionsList.length) {
        return {
          ...state,
          processComplete: true,
          progressFill: newProgressFill,
        };
      }
      return {
        ...state,
        currentDetectionIndex: nextDetectionIndex,
        progressFill: newProgressFill,
      };
    default:
      throw new Error("Unexpected action type.");
  }
};

/* -------------------- COMPONENT -------------------- */
const FaceCapture = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [state, dispatch] = React.useReducer(detectionReducer, initialState);
  const device = useCameraDevice("front");
  const lastEyeState = useRef<"open" | "closed">("open");
  const rollAngles = useRef<number[]>([]);

  const faceDetectionOptions = useRef<FaceDetectionOptions>({
    performanceMode: "fast",
    classificationMode: "all",
    landmarkMode: "all",
  }).current;

  const { detectFaces, stopListeners } = useFaceDetector(faceDetectionOptions);

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    return () => {
      if (Platform.OS === "android") stopListeners();
    };
  }, []);

  const handleDetectedFaces = Worklets.createRunOnJS((faces: Face[]) => {
    const FACE_TOO_BIG_THRESHOLD = 320; // adjust as needed

    if (faces.length !== 1) {
      dispatch({ type: "FACE_DETECTED", payload: "no" });
      return;
    }
    const face = faces[0];
    if (
      face.bounds.width > FACE_TOO_BIG_THRESHOLD ||
      face.bounds.height > FACE_TOO_BIG_THRESHOLD
    ) {
      dispatch({ type: "FACE_TOO_BIG", payload: "yes" });
      return;
    } else {
      if (state.faceTooBig === "yes") {
        dispatch({ type: "FACE_TOO_BIG", payload: "no" });
      }
    }

    if (state.faceDetected === "no") {
      dispatch({ type: "FACE_DETECTED", payload: "yes" });
    }

    // Process actions
    const detectionAction = state.detectionsList[state.currentDetectionIndex];
    switch (detectionAction) {
      case "BLINK":
        // Lower probabiltiy is when eyes are closed
        const leftEyeClosed =
          face.leftEyeOpenProbability <= detections.BLINK.minProbability;
        const rightEyeClosed =
          face.rightEyeOpenProbability <= detections.BLINK.minProbability;
        if (leftEyeClosed && rightEyeClosed) {
          dispatch({ type: "NEXT_DETECTION", payload: null });
        }
        return;

      case "TURN_HEAD_LEFT":
        // Negative angle is the when the face turns left
        if (face.yawAngle <= detections.TURN_HEAD_LEFT.maxAngle) {
          dispatch({ type: "NEXT_DETECTION", payload: null });
        }
        return;
      case "TURN_HEAD_RIGHT":
        // Positive angle is the when the face turns right
        if (face.yawAngle >= detections.TURN_HEAD_RIGHT.minAngle) {
          dispatch({ type: "NEXT_DETECTION", payload: null });
        }
        return;

      case "SMILE":
        // Higher probabiltiy is when smiling
        if (face.smilingProbability >= detections.SMILE.minProbability) {
          dispatch({ type: "NEXT_DETECTION", payload: null });
        }
        return;
      case "NOD":
        // Collect roll angle data in ref
        rollAngles.current.push(face.rollAngle);
        // Don't keep more than 10 roll angles (10 detection frames)
        if (rollAngles.current.length > 10) {
          rollAngles.current.shift();
        }
        // If not enough roll angle data, then don't process
        if (rollAngles.current.length < 10) return;
        // Calculate avg from collected data, except current angle data
        const rollAnglesExceptCurrent = [...rollAngles.current].splice(
          0,
          rollAngles.current.length - 1
        );
        // Summation
        const rollAnglesSum = rollAnglesExceptCurrent.reduce((prev, curr) => {
          return prev + Math.abs(curr);
        }, 0);
        // Average
        const avgAngle = rollAnglesSum / rollAnglesExceptCurrent.length;
        // If the difference between the current angle and the average is above threshold, pass.
        const diff = Math.abs(avgAngle - Math.abs(face.rollAngle));
        if (diff >= detections.NOD.minDiff) {
          dispatch({ type: "NEXT_DETECTION", payload: null });
        }
        return;
    }
  });

  const frameProcessor = useFrameProcessor(
    (frame) => {
      "worklet";
      const faces = detectFaces(frame);
      handleDetectedFaces(faces);
    },
    [handleDetectedFaces]
  );

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }
  if (!hasPermission) {
    return <Text>Camera permission denied</Text>;
  }
  if (!device) {
    return <Text>No camera device found</Text>;
  }

  const instructionsText = {
    initialPrompt: "Please position your face within the frame.",
    performActions: "Keep the device still and perform the following actions:",
    tooClose: "You're too close. Hold the device further.",
  };

  return (
    <ScreenLayout
      header={
        <>
          <Header title="Face Capture" backHandler={true} />
          <Description text="Capture your face for authentication purposes." />
        </>
      }
      footer={
        <View style={styles.footer}>
          <Button2
            name={"Next"}
            mode="contained"
            color={Color.primary_400}
            onPress={() => {
              Alert.alert("Confirmation", "Are you sure you want to submit?", [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Yes",
                  onPress: () => {
                    router.push("/screens/credentials/ReviewInformation");
                  },
                },
              ]);
            }}
          />
        </View>
      }
    >
      <View style={styles.container}>
        <View style={styles.cameraWrapper}>
          <AnimatedCircularProgress
            size={PREVIEW_SIZE}
            width={7}
            fill={state.progressFill}
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
                frameProcessor={frameProcessor}
              />
            )}
          </AnimatedCircularProgress>
        </View>

        <View style={styles.instructionsWrapper}>
          <Text style={styles.instructionsText}>
            {state.faceDetected === "no" &&
              state.faceTooBig === "no" &&
              instructionsText.initialPrompt}
            {state.faceTooBig === "yes" && instructionsText.tooClose}
            {state.faceDetected === "yes" &&
              state.faceTooBig === "no" &&
              instructionsText.performActions}
          </Text>

          <Text style={styles.actionText}>
            {state.faceDetected === "yes" &&
              state.faceTooBig === "no" &&
              detections[state.detectionsList[state.currentDetectionIndex]]
                .instruction}
          </Text>
        </View>
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  cameraWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: PREVIEW_SIZE,
    height: PREVIEW_SIZE,
  },
  circularProgress: {
    width: PREVIEW_SIZE,
    height: PREVIEW_SIZE,
  },
  instructionsWrapper: { padding: 20, alignItems: "center" },
  instructionsText: {
    marginBottom: 20,
    fontFamily: font.intermedium,
    color: Color.neutral_400,
    fontSize: 18,
    textAlign: "center",
  },
  actionText: {
    paddingTop: 30,
    fontFamily: font.intersemibold,
    fontSize: 20,
    color: Color.neutral_500,
    textAlign: "center",
  },
  footer: {
    alignItems: "center",
    marginTop: hp("1%"),
    marginBottom: hp("1%"),
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default FaceCapture;
