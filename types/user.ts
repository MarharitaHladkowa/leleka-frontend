export type BabyGender = "Хлопчик" | "Дівчинка" | "Ще не знаю";

export interface User {
  _id: string;
  email: string;
  name: string;
  avatarUrl: string;
  birthDate: string | null;
  babyGender: BabyGender;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface UpdateUserPayload {
  name?: string;
  email?: string;
  babyGender?: BabyGender;
  birthDate?: string | null;
}

export interface UploadAvatarPayload {
  avatar: File;
}

export interface UpdateUserResponse {
  user: User;
  message?: string;
}

export interface UploadAvatarResponse {
  avatarUrl: string;
  message?: string;
}

export interface ProfileFormValues {
  name: string;
  email: string;
  babyGender: BabyGender;
  birthDate: string;
}
