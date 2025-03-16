'use client';
import { Github } from 'lucide-react';

import { Button } from './button';

export default function GithubButton() {
  return (
    <Button
      variant="outline"
      className="flex items-center gap-2 absolute bottom-4 right-4"
    >
      <a
        href="https://github.com/Andresws12/a-safe-dashboard"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Github className="size-4" />
      </a>
    </Button>
  );
}
