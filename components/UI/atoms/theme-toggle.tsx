'use client';

import { Sun, Moon } from 'lucide-react';

import { useTheme } from '../../providers/ThemeProvider';

import { Button } from './button';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      onClick={toggleTheme}
      className="flex items-center gap-2 absolute top-4 right-4"
    >
      {theme === 'light' ? (
        <Sun className="size-4" />
      ) : (
        <Moon className="size-4" />
      )}
    </Button>
  );
}
