import React, { useState, useEffect, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { useRecorder } from "../../hooks/recorder";

import {
  Container,
  NameAudioContainer,
  NameAudioInput,
  RecorderListButton,
  RecorderListButtonIcon,
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
  const navigation = useNavigation();
  const {
    startRecorderAudio,
    stopRecorderAudio,
    durationFormatted,
    error,
    isRecording,
  } = useRecorder();

  const navigateToRecorderList = useCallback(() => {
    navigation.navigate("RecorderList");
  }, [navigation]);

  return (
    <Container>
      <NameAudioContainer>
        {/* <NameAudioInput placeholder="Escreva um titulo" /> */}
        <RecorderListButton />

        <NameAudioText>
          {isRecording ? "Gravando ..." : "Gravar Audio"}
        </NameAudioText>

        <RecorderListButton onPress={navigateToRecorderList}>
          <RecorderListButtonIcon name="list" size={22} color="#f1f1f1" />
        </RecorderListButton>
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
        {/* <ActionsContainer>
          <DeleteButton>
            <DeleteButtonText>Deletar</DeleteButtonText>
          </DeleteButton>

          <SaveButton>
            <SaveButtonText>Enviar</SaveButtonText>
          </SaveButton> 

          <CommentButton>
            <CommentIcon name="comment" size={22} color="#f1f1f1" />
          </CommentButton>
        </ActionsContainer> */}
      </FooterContainer>
    </Container>
  );
};

export { Recorder };
