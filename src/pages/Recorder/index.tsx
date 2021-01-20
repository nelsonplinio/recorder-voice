import React from "react";
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
  return (
    <Container>
      <NameAudioContainer>
        {/* <NameAudioInput placeholder="Escreva um titulo" /> */}
        <NameAudioText>Audio gravando</NameAudioText>
      </NameAudioContainer>

      <RecorderActionsContainer>
        <RecorderStartAndPauseButton>
          <RecorderStartAndPauseButtonIcon
            name="microphone"
            size={PLAY_PAUSE_BUTTON_SIZE * 0.3}
          />
        </RecorderStartAndPauseButton>

        <RecorderStopButton>
          <RecorderStopButtonIcon name="stop" color="#e26878" size={42} />
        </RecorderStopButton>
      </RecorderActionsContainer>

      <FooterContainer>
        <RecorderTimingText>00:02</RecorderTimingText>
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
