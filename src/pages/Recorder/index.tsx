import React, { useState, useEffect, useCallback } from "react";
import {
  useRecorder,
  RecordingType,
  OnRecordingDurationData,
} from "../../hooks/recorder";

import {
  Container,
  NameAudioContainer,
  NameAudioInput,
  NameAudioText,
  RecorderActionsContainer,
  RecorderStartAndPauseButton,
  RecorderStartAndPauseButtonIcon,
  RecorderStopButton,
  RecorderStopButtonIcon,
  FooterContainer,
  RecorderTimingText,
  ActionsContainer,
  DeleteButton,
  DeleteButtonText,
  SaveButton,
  SaveButtonText,
  CommentButton,
  CommentIcon,
  PLAY_PAUSE_BUTTON_SIZE,
} from "./styles";
import formatDuration from "../../utils/formatDuration";

const Recorder: React.FC = () => {
  const [recording, setRecording] = useState<RecordingType>();
  const [recordingDuration, setRecordingDuration] = useState("00:00");

  const {
    startRecorderAudio,
    stopRecorderAudio,
    onRecordingDuration,
  } = useRecorder();

  const resetDuration = useCallback(() => {
    setRecordingDuration("00:00");
  }, [setRecordingDuration]);

  const startRecorder = useCallback(async () => {
    const startedRecording = await startRecorderAudio();

    setRecording(startedRecording);
  }, [startRecorderAudio]);

  const stopRecording = useCallback(() => {
    if (!recording) {
      return;
    }

    const uri = stopRecorderAudio(recording);
    // todo some thing
    resetDuration();
    setRecording(null);
  }, [recording, stopRecorderAudio, resetDuration]);

  useEffect(() => {
    return stopRecording;
  }, [stopRecording]);

  useEffect(() => {
    if (!recording) {
      return;
    }

    onRecordingDuration(recording, ({ duration }: OnRecordingDurationData) => {
      setRecordingDuration(formatDuration(duration / 1000));
    });
  }, [onRecordingDuration, recording]);

  useEffect(() => {
    resetDuration();
  }, [recording, resetDuration]);

  return (
    <Container>
      <NameAudioContainer>
        {/* <NameAudioInput placeholder="Escreva um titulo" /> */}
        <NameAudioText>Audio gravando</NameAudioText>
      </NameAudioContainer>

      <RecorderActionsContainer>
        <RecorderStartAndPauseButton onPress={startRecorder}>
          <RecorderStartAndPauseButtonIcon
            name="microphone"
            size={PLAY_PAUSE_BUTTON_SIZE * 0.3}
          />
        </RecorderStartAndPauseButton>

        {recording && (
          <RecorderStopButton onPress={stopRecording}>
            <RecorderStopButtonIcon name="stop" color="#e26878" size={42} />
          </RecorderStopButton>
        )}
      </RecorderActionsContainer>

      <FooterContainer>
        <RecorderTimingText>{recordingDuration}</RecorderTimingText>
        <ActionsContainer>
          <DeleteButton>
            <DeleteButtonText>Deletar</DeleteButtonText>
          </DeleteButton>

          <SaveButton>
            <SaveButtonText>Enviar</SaveButtonText>
          </SaveButton>

          <CommentButton>
            <CommentIcon name="comment" size={22} color="#f1f1f1" />
          </CommentButton>
        </ActionsContainer>
      </FooterContainer>
    </Container>
  );
};

export { Recorder };
