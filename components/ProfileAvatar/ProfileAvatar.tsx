import { useRef } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { useUploadAvatar } from "@/lib/hooks/useProfile";
import type { User } from "@/types/user";
import styles from "./ProfileAvatar.module.css";

interface ProfileAvatarProps {
  user: User;
}

export default function ProfileAvatar({ user }: ProfileAvatarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadAvatarMutation = useUploadAvatar();

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Підтримуються тільки формати: JPG, PNG, WEBP");
      event.target.value = "";
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error("Розмір файлу не повинен перевищувати 5MB");
      event.target.value = "";
      return;
    }

    await toast
      .promise(uploadAvatarMutation.mutateAsync(file), {
        loading: "Завантаження аватара...",
        success: "Аватар успішно оновлено!",
        error: (err) =>
          `Помилка: ${err?.message || "Не вдалося завантажити файл"}`,
      })
      .catch(() => {});

    event.target.value = "";
  };

  return (
    <div className={styles.container}>
      <div className={styles.avatarWrapper}>
        <Image
          src={user.avatarUrl}
          alt={user.name}
          width={132}
          height={132}
          className={styles.avatar}
          priority
        />
      </div>
      <div className={styles.info}>
        <h2 className={styles.name}>{user.name}</h2>
        <p className={styles.email}>{user.email}</p>

        <button
          type="button"
          onClick={handleButtonClick}
          disabled={uploadAvatarMutation.isPending}
          className={styles.uploadButton}
        >
          {uploadAvatarMutation.isPending
            ? "Завантаження..."
            : "Завантажити нове фото"}
        </button>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        hidden
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className={styles.fileInput}
        aria-label="Завантажити аватар"
      />
    </div>
  );
}
