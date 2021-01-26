export default interface AudioRecorded {
  id: string;
  duration: number;
  uri: string;
  name?: string;
  createDate: Date;
}
