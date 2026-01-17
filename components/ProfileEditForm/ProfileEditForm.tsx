"use client";

import { Formik, Form, Field, FieldProps, ErrorMessage } from "formik";
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
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({ isSubmitting, dirty, resetForm }) => (
          <Form className={styles.form}>
            <div className={styles.fieldGroup}>
              <label htmlFor="name" className={styles.label}>
                Ім&apos;я
              </label>
              <Field name="name">
                {({ field, meta }: FieldProps<string>) => (
                  <input
                    {...field}
                    type="text"
                    id="name"
                    placeholder="Введіть ім'я"
                    className={`${styles.input} ${
                      meta.error && meta.touched ? styles.inputError : ""
                    }`}
                  />
                )}
              </Field>
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
              <Field name="email">
                {({ field, meta }: FieldProps<string>) => (
                  <input
                    {...field}
                    type="email"
                    id="email"
                    placeholder="Введіть електронну"
                    className={`${styles.input} ${
                      meta.error && meta.touched ? styles.inputError : ""
                    }`}
                  />
                )}
              </Field>
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
              <div
                className={styles.selectWrapper}
                onMouseDown={(e) => {
                  const wrapper = e.currentTarget;
                  wrapper.classList.add(styles.selectOpen);
                }}
                onBlur={(e) => {
                  const wrapper = e.currentTarget;
                  setTimeout(() => {
                    wrapper.classList.remove(styles.selectOpen);
                  }, 100);
                }}
              >
                <Field name="babyGender">
                  {({ field, meta }: FieldProps<string>) => (
                    <select
                      {...field}
                      id="babyGender"
                      className={`${styles.select} ${
                        meta.error && meta.touched ? styles.selectError : ""
                      }`}
                      onChange={(e) => {
                        field.onChange(e);
                        const wrapper = e.target.closest(
                          `.${styles.selectWrapper}`,
                        );
                        if (wrapper) {
                          wrapper.classList.remove(styles.selectOpen);
                        }
                      }}
                    >
                      <option value="">Оберіть стать</option>
                      <option value="Ще не знаю">Ще не знаю</option>
                      <option value="Хлопчик">Хлопчик</option>
                      <option value="Дівчинка">Дівчинка</option>
                    </select>
                  )}
                </Field>
                <svg className={styles.selectIcon} width="20" height="20">
                  <use href="/icon-sprite.svg#icon-arrow-down" />
                </svg>
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
              <div className={styles.dateWrapper}>
                <Field name="birthDate">
                  {({ field, meta }: FieldProps<string>) => (
                    <input
                      {...field}
                      type="date"
                      id="bDate"
                      className={`${styles.input} ${
                        meta.error && meta.touched ? styles.inputError : ""
                      }`}
                    />
                  )}
                </Field>
                <svg className={styles.dateIcon} width="20" height="20">
                  <use href="/icon-sprite.svg#icon-arrow-down" />
                </svg>
              </div>
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
