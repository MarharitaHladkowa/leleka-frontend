export interface Emotion {
  id: string;
  label: string;
}

export const EMOTIONS: Emotion[] = [
  { id: "inspiration", label: "Натхнення" },
  { id: "gratitude", label: "Вдячність" },
  { id: "anxiety", label: "Тривога" },
  { id: "cravings", label: "Дивні бажання" },
  { id: "nausea", label: "Нудота" },
];
