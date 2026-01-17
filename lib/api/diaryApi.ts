import { NextServer } from '@/lib/api/api';
import type {
  DiaryNote,
  DiaryEntryCreateDto,
  DiaryEntryUpdateDto,
} from '@/types/diary';

export async function getDiaryEntries(): Promise<DiaryNote[]> {
  const { data } = await NextServer.get<DiaryNote[]>('/api/diaries');
  console.log('lox', data);

  return data;
}

export async function getDiaryNote(entryId: string): Promise<DiaryNote> {
  const { data } = await NextServer.get<DiaryNote>(`/api/diaries/${entryId}`);
  return data;
}

export async function createDiaryNote(
  payload: DiaryEntryCreateDto
): Promise<DiaryNote> {
  const { data } = await NextServer.post<DiaryNote>('/api/diaries', payload);
  return data;
}

export async function updateDiaryNote(
  entryId: string,
  payload: DiaryEntryUpdateDto
): Promise<DiaryNote> {
  const { data } = await NextServer.patch<DiaryNote>(
    `/api/diaries/${entryId}`,
    payload
  );
  return data;
}

export async function deleteDiaryNote(entryId: string): Promise<void> {
  await NextServer.delete(`/api/diaries/${entryId}`);
}
