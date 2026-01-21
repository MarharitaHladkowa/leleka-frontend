'use client';

import { useEffect } from 'react';
import { BabyGender } from '@/types/user';

export const useThemeByGender = (babyGender?: BabyGender) => {
  useEffect(() => {
    const body = document.body;

    // ❗ ВСЕГДА сначала сбрасываем тему
    body.removeAttribute('data-theme');

    if (babyGender === 'Дівчинка') {
      body.setAttribute('data-theme', 'girl');
    }

    if (babyGender === 'Хлопчик') {
      body.setAttribute('data-theme', 'boy');
    }
  }, [babyGender]);
};
