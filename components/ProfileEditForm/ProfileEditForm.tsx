"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useUpdateProfile } from "@/lib/hooks/useProfile";
import { profileValidationSchema } from "@/lib/validations/profileSchema";
import type { User, ProfileFormValues } from "@/types/user";
import styles from "./ProfileEditForm.module.css";

interface ProfileEditFormProps {
  user: User;
}

export default function ProfileEditForm({ user }: ProfileEditFormProps) {
  const updateProfileMutation = useUpdateProfile();

  const initialValues: ProfileFormValues = {
    name: user.name,
    email: user.email,
    babyGender: user.babyGender,
    birthDate: user.birthDate
      ? new Date(user.birthDate).toISOString().split("T")[0]
      : "",
  };

  const handleSubmit = async (values: ProfileFormValues) => {
    await updateProfileMutation.mutateAsync({
      name: values.name,
      email: values.email,
      babyGender: values.babyGender,
      birthDate: values.birthDate || null,
    });
  };

  return (
    <div className={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={profileValidationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting, dirty, resetForm }) => (
          <Form className={styles.form}>
            <div className={styles.fieldGroup}>
              <label htmlFor="name" className={styles.label}>
                Ім&apos;я
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className={styles.input}
                placeholder="Ганна"
              />
              <ErrorMessage
                name="name"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="email" className={styles.label}>
                Пошта
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className={styles.input}
                placeholder="hanna@gmail.com"
              />
              <ErrorMessage
                name="email"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="babyGender" className={styles.label}>
                Стать дитини
              </label>
              <div className={styles.selectWrapper}>
                <Field
                  as="select"
                  id="babyGender"
                  name="babyGender"
                  className={styles.select}
                >
                  <option value="Ще не знаю">Ще не знаю</option>
                  <option value="Хлопчик">Хлопчик</option>
                  <option value="Дівчинка">Дівчинка</option>
                </Field>
              </div>
              <ErrorMessage
                name="babyGender"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="bDate" className={styles.label}>
                Планова дата пологів
              </label>
              <Field
                type="date"
                id="bDate"
                name="birthDate"
                className={styles.input}
              />
              <ErrorMessage
                name="birthDate"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.buttons}>
              <button
                type="button"
                onClick={() => resetForm()}
                disabled={!dirty || isSubmitting}
                className={styles.cancelButton}
              >
                Відмінити зміни
              </button>

              <button
                type="submit"
                disabled={!dirty || isSubmitting}
                className={styles.submitButton}
              >
                {isSubmitting ? "Збереження..." : "Зберегти зміни"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
