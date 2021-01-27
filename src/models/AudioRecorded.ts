export default interface AudioRecorded {
  id: string;
  duration: number;
  durationFormatted?: string;
  createDateFormatted?: string;
  uri: string;
  name?: string;
  createDate: Date;
}
