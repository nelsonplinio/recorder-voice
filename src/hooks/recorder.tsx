import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Audio } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AudioRecorded from "../models/AudioRecorded";
import formatDuration from "../utils/formatDuration";
import generateAudioRecordedID from "../utils/generateAudioRecordedID";

const AUDIOS_RECORDED_KEY = "@audios-recorded";

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
  audiosRecorded: AudioRecorded[];
  startRecorderAudio: () => Promise<RecordingType>;
  stopRecorderAudio: () => Promise<AudioRecorded>;
}

const RecorderContext = React.createContext<RecorderData>({} as RecorderData);

const RecorderProvider: React.FC = ({ children }) => {
  const [error, setError] = useState<RecorderError>();
  const [duration, setDuration] = useState<number>(0);
  const [recording, setRecording] = useState<RecordingType>();
  const [audiosRecorded, setAudiosRecorded] = useState<AudioRecorded[]>();

  const durationFormatted = useMemo(() => formatDuration(duration / 1000), [
    duration,
  ]);

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
  }, []);

  const saveNewAudioRecorder = useCallback(
    async (newAudioRecorded: Omit<AudioRecorded, "id">) => {
      console.log(`New audio Saved in ${newAudioRecorded.uri}`);

      const audioToSave: AudioRecorded = {
        id: await generateAudioRecordedID(),
        ...newAudioRecorded,
        createDate: new Date(),
      };

      await AsyncStorage.setItem(
        AUDIOS_RECORDED_KEY,
        JSON.stringify([audioToSave, ...audiosRecorded])
      );

      setAudiosRecorded((current) => [audioToSave, ...current]);
      return audioToSave;
    },
    [audiosRecorded]
  );

  const stopRecorderAudio = useCallback(async () => {
    if (!recording) {
      return null;
    }
    try {
      console.log("Stopping recording..");

      await recording.stopAndUnloadAsync();

      const uri = recording.getURI();

      console.log(`Recording stoped, uri: ${uri}`);

      const audioRecorder = saveNewAudioRecorder({
        duration,
        uri,
        createDate: new Date(),
      });

      setError(null);
      setRecording(null);
      setDuration(0);

      return audioRecorder;
    } catch ({ message }) {
      setError({ message });
      return null;
    }
  }, [recording, saveNewAudioRecorder, duration]);

  useEffect(() => {
    if (!recording) {
      return;
    }
    recording.setProgressUpdateInterval(1000);
    recording.setOnRecordingStatusUpdate(
      ({ durationMillis, isRecording: isRecordingStatusUpdate }) => {
        if (isRecordingStatusUpdate) {
          setDuration(durationMillis);
        }
      }
    );
  }, [recording]);

  useEffect(() => {
    const getAudiosRecorded: () => Promise<any> = async () => {
      const audioSaved = await AsyncStorage.getItem(AUDIOS_RECORDED_KEY);
      if (!audioSaved) {
        return [];
      }

      const audioRecoved = JSON.parse(audioSaved) as [];

      const audioRecovedSaved = audioRecoved.map(
        ({ id, name, duration: arDuration, uri, createDate }) =>
          ({
            id,
            name,
            duration: arDuration,
            uri,
            createDate: new Date(createDate),
          } as AudioRecorded)
      );

      setAudiosRecorded(audioRecovedSaved);
    };

    getAudiosRecorded();
  }, []);
  return (
    <RecorderContext.Provider
      value={{
        startRecorderAudio,
        stopRecorderAudio,
        recording,
        error,
        isRecording,
        durationFormatted,
        audiosRecorded,
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
