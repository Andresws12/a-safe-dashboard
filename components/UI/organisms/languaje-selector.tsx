'use client';

import { useRouter, usePathname } from 'next/navigation';

import {
  SelectTrigger,
  Select,
  SelectContent,
  SelectValue,
  SelectItem,
} from '../atoms/select';

export default function LanguageSelector({ locale }: { locale: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (newLocale: string) => {
    if (newLocale === locale) {
      return;
    }

    const segments = pathname.split('/');
    const currentLocaleIndex =
      segments[1] === 'en' || segments[1] === 'es' ? 1 : 0;

    if (currentLocaleIndex === 0) {
      segments.splice(1, 0, newLocale);
    } else {
      segments[currentLocaleIndex] = newLocale;
    }

    const newPath = segments.join('/');
    router.push(newPath);
  };

  return (
    <div className="absolute top-4 right-20">
      <Select onValueChange={handleChange} defaultValue={locale}>
        <SelectTrigger>
          <SelectValue placeholder="Select Language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">🇬🇧 </SelectItem>
          <SelectItem value="es">🇪🇸 </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
