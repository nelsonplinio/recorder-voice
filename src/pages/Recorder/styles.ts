import styled from "styled-components/native";
import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-x-helper";
import { Dimensions } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const bottomPadding = getBottomSpace();
const statusBarHeight = getStatusBarHeight();

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

export const PLAY_PAUSE_BUTTON_SIZE = windowWidth * 0.4;

const SECONDARY_COLOR = "#202640";
const PRIMARY_COLOR = "#182234";
const TEXT_COLOR = "#dfdfdf";
const PRIMARY_BUTTON_COLOR = "#202640";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-between;
  padding: ${statusBarHeight + 16}px 0 0 0;
  background: ${PRIMARY_COLOR};
`;

export const NameAudioContainer = styled.View`
  position: relative;
`;

export const NameAudioInput = styled.TextInput.attrs({
  placeholderStyle: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: TEXT_COLOR,
  },
})`
  font-size: 32px;
  font-weight: bold;
  opacity: 0.6;
  height: 33px;
  position: absolute;
  color: ${TEXT_COLOR};
`;

export const NameAudioText = styled.Text`
  font-size: 32px;
  font-weight: bold;
  opacity: 0.6;
  color: ${TEXT_COLOR};
`;

export const RecorderActionsContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const RecorderStartAndPauseButton = styled.TouchableOpacity`
  height: ${PLAY_PAUSE_BUTTON_SIZE}px;
  width: ${PLAY_PAUSE_BUTTON_SIZE}px;
  border-radius: ${PLAY_PAUSE_BUTTON_SIZE / 2}px;
  background: #f1f1f1;
  align-items: center;
  justify-content: center;
`;

export const RecorderStartAndPauseButtonIcon = styled(FontAwesome)`
  opacity: 0.8;
`;

export const RecorderStopButton = styled.TouchableOpacity`
  margin-top: ${windowHeight * 0.05}px;
`;

export const RecorderStopButtonIcon = styled(FontAwesome)``;

export const FooterContainer = styled.View`
  background: ${SECONDARY_COLOR};
  width: 100%;
  align-items: center;
  padding: 16px 16px ${bottomPadding + 16}px;
`;

export const RecorderTimingText = styled.Text`
  margin-bottom: 16px;
  font-size: 40px;
  font-weight: 600;
  color: #f1f1f1;
  width: 100%;
  text-align: center;
`;

export const ActionsContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0;
`;

export const DeleteButton = styled.TouchableOpacity``;

export const DeleteButtonText = styled.Text`
  color: #e26878;
  font-size: 18px;
  font-weight: bold;
`;

export const SaveButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background: #f1f1f1;
  padding: 16px 0;
  border-radius: 100px;
  width: ${windowWidth * 0.5}px;
`;

export const SaveButtonText = styled.Text`
  width: 100%;
  text-align: center;
  font-size: 22px;
  font-weight: bold;
`;

export const CommentButton = styled.TouchableOpacity`
  margin-left: 22px;
`;

export const CommentIcon = styled(FontAwesome)``;
