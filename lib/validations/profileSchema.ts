import * as Yup from "yup";

export const profileValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Ім'я має містити мінімум 2 символи")
    .max(50, "Ім'я має містити максимум 50 символів")
    .required("Ім'я є обов'язковим полем"),

  email: Yup.string()
    .email("Невірний формат email")
    .required("Email є обов'язковим полем"),

  babyGender: Yup.string()
    .oneOf(["Хлопчик", "Дівчинка", "Ще не знаю"], "Оберіть стать дитини")
    .required("Стать дитини є обов'язковим полем"),

  birthDate: Yup.date()
    .nullable()
    .min(new Date(), "Планова дата пологів не може бути в минулому")
    .max(
      new Date(new Date().setMonth(new Date().getMonth() + 10)),
      "Планова дата пологів занадто далека"
    )
    .typeError("Введіть коректну дату"),
});

export const avatarValidationSchema = Yup.object().shape({
  avatar: Yup.mixed()
    .required("Оберіть файл")
    .test("fileSize", "Розмір файлу не повинен перевищувати 5MB", (value) => {
      if (!value) return false;
      const file = value as File;
      return file.size <= 5 * 1024 * 1024; // 5MB
    })
    .test(
      "fileType",
      "Підтримуються тільки формати: JPG, PNG, WEBP",
      (value) => {
        if (!value) return false;
        const file = value as File;
        return ["image/jpeg", "image/png", "image/webp"].includes(file.type);
      }
    ),
});
