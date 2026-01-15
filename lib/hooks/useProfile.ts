"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser, updateUser, uploadAvatar } from "@/lib/api/clientApi";
import type { UpdateUserPayload, User } from "@/types/user";
import { toast } from "react-toastify";

export function useProfile() {
  return useQuery<User>({
    queryKey: ["user", "profile"],
    queryFn: getCurrentUser,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateUserPayload) => updateUser(data),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["user", "profile"], updatedUser);

      toast.success("Профіль успішно оновлено!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Помилка оновлення профілю");
    },
  });
}

export function useUploadAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => uploadAvatar(file),
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["user", "profile"],
        (oldData: User | undefined) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            avatarUrl: data.avatarUrl,
          };
        }
      );

      toast.success("Аватар успішно оновлено!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Помилка завантаження аватара");
    },
  });
}
