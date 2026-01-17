export interface ITask {
  id?: string;
  title: string;
  date: string;
}

export interface ITaskFormValues {
  title: string;
  date: Date | null;
}