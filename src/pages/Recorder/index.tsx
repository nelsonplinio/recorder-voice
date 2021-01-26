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

const Recorder: React.FC = () => {
  const {
    startRecorderAudio,
    stopRecorderAudio,
    durationFormatted,
    error,
    isRecording,
    getAudiosRecorded

  } = useRecorder();


  useEffect(() => {

    const test = async () => {
      console.log('aquyiii, ', await getAudiosRecorded())
    };
  
  
    test();
  }, [isRecording])

  useEffect(() => {
    const test = async () => {
      console.log(await getAudiosRecorded())
    };


    test();
  }, [isRecording])
  return (
    <Container>
      <NameAudioContainer>
        {/* <NameAudioInput placeholder="Escreva um titulo" /> */}
        <NameAudioText>Audio gravando</NameAudioText>
      </NameAudioContainer>

      <RecorderActionsContainer>
        <RecorderStartAndPauseButton onPress={startRecorderAudio}>
          <RecorderStartAndPauseButtonIcon
            name="microphone"
            size={PLAY_PAUSE_BUTTON_SIZE * 0.3}
          />
        </RecorderStartAndPauseButton>

        {isRecording && (
          <RecorderStopButton onPress={stopRecorderAudio}>
            <RecorderStopButtonIcon name="stop" color="#e26878" size={42} />
          </RecorderStopButton>
        )}
      </RecorderActionsContainer>

      <FooterContainer>
        <RecorderTimingText>{durationFormatted}</RecorderTimingText>
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
