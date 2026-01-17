"use client";

import { useProfile } from "@/lib/hooks/useProfile";
import ProfileAvatar from "@/components/ProfileAvatar/ProfileAvatar";
import ProfileEditForm from "@/components/ProfileEditForm/ProfileEditForm";
import styles from "./ProfilePage.module.css";

export default function ProfilePage() {
  const { data: user, isLoading, error } = useProfile();

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loader}>
          <div className={styles.spinner}></div>
          <p>Завантаження профілю...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorMessage}>
          <h2>Помилка завантаження профілю</h2>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={styles.container}>
        <div className={styles.errorMessage}>
          <p>Профіль не знайдено</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <ProfileAvatar user={user} />
      <ProfileEditForm user={user} />
    </div>
  );
}
