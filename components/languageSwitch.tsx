"use client";

import {useRouter} from "next/navigation";

export default function LanguageSwitch() {
  const router = useRouter();

  const changeLanguage = (locale: string) => {
    try {
      // overwrite cookie
      document.cookie = `locale=${locale}; path=/; max-age=${60 * 60 * 24 * 365}`;
      // Use window.location.reload() for more reliable page refresh
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (error) {
      console.error('Error changing language:', error);
      // Fallback to router.refresh()
      router.refresh();
    }
  };

  return (
    <div>
      <button onClick={() => changeLanguage("en")}>English</button>
      <button onClick={() => changeLanguage("ar")}>العربية</button>
    </div>
  );
}
