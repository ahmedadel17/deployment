"use client";

import {useRouter} from "next/navigation";

export default function LanguageSwitch() {
  const router = useRouter();

  const changeLanguage = (locale: string) => {
    // overwrite cookie
    document.cookie = `locale=${locale}; path=/; max-age=${60 * 60 * 24 * 365}`;
    // refresh page so server picks new cookie
    router.refresh();
  };

  return (
    <div>
      <button onClick={() => changeLanguage("en")}>English</button>
      <button onClick={() => changeLanguage("ar")}>العربية</button>
    </div>
  );
}
