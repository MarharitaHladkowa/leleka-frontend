// interface Emotion {
//   _id: string;
//   title: string;
// }
export interface DiaryNote {
  _id: string;
  title: string;
  date: string;
  categories: string[];
  text: string;
}
