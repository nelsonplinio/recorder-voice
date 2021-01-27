import React, { useMemo } from "react";
import { formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRecorder } from "../../hooks/recorder";
import formatDuration from "../../utils/formatDuration";

import {
  Container,
  List,
  AudioItemContainer,
  AudioItemDetailsContainer,
  AudioItemTitleText,
  AudioItemDurationText,
  AudioItemOptionsButton,
  AudioItemDateText,
} from "./styles";

const RecorderList: React.FC = () => {
  const { audiosRecorded } = useRecorder();

  const audios = useMemo(() => {
    return audiosRecorded.map((audio) => ({
      ...audio,
      createDateFormatted: formatDistanceToNow(audio.createDate, {
        locale: ptBR,
        addSuffix: true,
      }),
      durationFormatted: formatDuration(audio.duration / 1000),
    }));
  }, [audiosRecorded]);

  return (
    <Container>
      <List
        data={audios}
        keyExtractor={({ id }) => id}
        renderItem={({ item: audio }) => (
          <AudioItemContainer>
            <AudioItemDetailsContainer>
              <AudioItemTitleText>
                {audio.name || "untitled"}
                <AudioItemDateText>
                  {` • (${audio.createDateFormatted})`}
                </AudioItemDateText>
              </AudioItemTitleText>
              <AudioItemDurationText>
                {audio.durationFormatted}
              </AudioItemDurationText>
            </AudioItemDetailsContainer>

            <AudioItemOptionsButton>
              <MaterialCommunityIcons
                name="dots-vertical"
                color="#fff"
                size={26}
              />
            </AudioItemOptionsButton>
          </AudioItemContainer>
        )}
      />
    </Container>
  );
};
export { RecorderList };
