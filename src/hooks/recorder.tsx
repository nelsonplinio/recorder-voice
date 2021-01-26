import React, { useCallback, useState } from "react";
import { Audio } from "expo-av";
import { call } from "react-native-reanimated";

type RecordingURI = string;

type RecordingType = Audio.Recording;
interface OnRecordingDurationData {
  duration: number;
}
interface RecorderError {
  message: string;
}
interface RecorderData {
  error?: RecorderError;
  onRecordingDuration: (
    recording: RecordingType,
    callback: (data: OnRecordingDurationData) => void
  ) => void;
  startRecorderAudio: () => Promise<RecordingType>;
  stopRecorderAudio: (recording: RecordingType) => Promise<RecordingURI>;
}

const RecorderContext = React.createContext<RecorderData>({} as RecorderData);

const RecorderProvider: React.FC = ({ children }) => {
  const [error, setError] = useState<RecorderError>();

  const startRecorderAudio = useCallback(async () => {
    try {
      setError(undefined);

      console.log("request Permissions: Starting");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording ... ");

      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );

      await recording.startAsync();

      return recording;
    } catch ({ message }) {
      setError({ message });
      return null;
    }
  }, []);

  const stopRecorderAudio = useCallback(async (recording: RecordingType) => {
    try {
      setError(undefined);

      console.log("Stopping recording..");
      await recording.stopAndUnloadAsync();

      const uri = recording.getURI();

      console.log(`Recording stoped, uri: ${uri}`);

      return uri;
    } catch ({ message }) {
      setError({ message });
      return null;
    }
  }, []);

  const onRecordingDuration = useCallback(
    (
      recording: RecordingType,
      callback: (data: OnRecordingDurationData) => void
    ) => {
      recording.setOnRecordingStatusUpdate(({ durationMillis }) => {
        callback({ duration: durationMillis });
      });
    },
    []
  );

  return (
    <RecorderContext.Provider
      value={{
        startRecorderAudio,
        stopRecorderAudio,
        onRecordingDuration,
        error,
      }}
    >
      {children}
    </RecorderContext.Provider>
  );
};

function useRecorder(): RecorderData {
  const context = React.useContext(RecorderContext);

  if (!context) {
    throw new Error("useRecorder must be used within as RecorderProvider");
  }

  return context;
}

export {
  useRecorder,
  RecorderProvider,
  RecordingType,
  OnRecordingDurationData,
};
