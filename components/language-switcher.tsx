"use client";

import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useI18n, type Locale } from "@/lib/i18n";

const languages: { code: Locale; name: string; nativeName: string }[] = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "ru", name: "Russian", nativeName: "Русский" },
];

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  const currentLanguage = languages.find((lang) => lang.code === locale);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="h-8 p-2 md:h-fit md:p-2"
          data-testid="language-switcher-button"
          variant="ghost"
        >
          <Globe className="size-4" />
          <span className="ml-2 text-sm">{currentLanguage?.nativeName}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" data-testid="language-switcher-menu">
        {languages.map((lang) => (
          <DropdownMenuItem
            className="cursor-pointer"
            data-testid={`language-option-${lang.code}`}
            key={lang.code}
            onSelect={() => setLocale(lang.code)}
          >
            <span className={locale === lang.code ? "font-semibold" : ""}>
              {lang.nativeName}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
