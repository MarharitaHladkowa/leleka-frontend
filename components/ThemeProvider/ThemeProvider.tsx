'use client';

import { ReactNode } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { useThemeByGender } from '@/lib/hooks/useThemeByGender';

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const user = useAuthStore((state) => state.user);

  useThemeByGender(user?.babyGender);

  return <>{children}</>;
}
