import UUIDGenerator from "react-native-uuid-generator";

export default function generateAudioRecordedID(): Promise<string> {
  return UUIDGenerator.getRandomUUID();
}
