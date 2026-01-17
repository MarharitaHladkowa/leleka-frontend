export interface DiaryNote {
  _id: string;
  title: string;
  date: string;
  categories: string[];
  text: string;
}

export type DiaryEntryCreateDto = {
  title: string;
  content: string;
  emotions: string[];
};

export type DiaryEntryUpdateDto = Partial<DiaryEntryCreateDto>;
