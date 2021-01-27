import { FlatList } from "react-native";
import styled from "styled-components/native";
import AudioRecorded from "../../models/AudioRecorded";

export const Container = styled.View`
  flex: 1;
`;

export const List = styled(FlatList as new () => FlatList<AudioRecorded>).attrs(
  {
    contentContainerStyle: {
      paddingVertical: 22,
      paddingHorizontal: 16,
    },
  }
)``;

export const AudioItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
`;

export const AudioItemDetailsContainer = styled.View`
  flex: 1;
`;

export const AudioItemTitleText = styled.Text`
  color: #fff;
  font-size: 26px;
  font-weight: bold;
  width: 100%;
  margin-bottom: 8px;
`;

export const AudioItemDateText = styled.Text`
  font-size: 12px;
  opacity: 0.7;
`;

export const AudioItemDurationText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  width: 100%;
  opacity: 0.7;

  margin-left: 8px;
`;

export const AudioItemOptionsButton = styled.TouchableOpacity``;
