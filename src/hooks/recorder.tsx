import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Audio } from "expo-av";
import formatDuration from "../utils/formatDuration";

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
  durationFormatted?: string;
  recording?: RecordingType;
  isRecording: boolean;
  startRecorderAudio: () => Promise<RecordingType>;
  stopRecorderAudio: () => Promise<RecordingURI>;
}

const RecorderContext = React.createContext<RecorderData>({} as RecorderData);

const RecorderProvider: React.FC = ({ children }) => {
  const [error, setError] = useState<RecorderError>();
  const [duration, setDuration] = useState<number>(0);
  const [recording, setRecording] = useState<RecordingType>();
  
  const durationFormatted = useMemo(() => formatDuration(duration / 1000), [duration])

  const isRecording = useMemo(() => !!recording, [recording]);

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
      
      setRecording(recording);

      return recording;
    } catch ({ message }) {
      setError({ message });
      return null;
    }
  }, [recording]);

  const stopRecorderAudio = useCallback(async () => {
    if (!recording) {
      return null;
    }
    try {
      console.log("Stopping recording..");

      await recording.stopAndUnloadAsync();

      const uri = recording.getURI();

      console.log(`Recording stoped, uri: ${uri}`);

      setError(null);
      setRecording(null);
      setDuration(0);

      return uri;
    } catch ({ message }) {
      setError({ message });
      return null;
    }
  }, [recording]);

  useEffect(() => {
    if (!recording) {
      return;
    }
    recording.setProgressUpdateInterval(1000)
    recording.setOnRecordingStatusUpdate(({ durationMillis, isRecording }) => {
      if (isRecording) {
        setDuration(durationMillis)
      }
    })
  }, [recording])

  return (
    <RecorderContext.Provider
      value={{
        startRecorderAudio,
        stopRecorderAudio,
        recording,
        error,
        isRecording,
        durationFormatted
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
