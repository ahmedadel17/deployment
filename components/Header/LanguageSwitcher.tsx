
'use client'

import {useRouter} from "next/navigation";
import { useState } from "react";


function LanguageSwitcher() {
    const router = useRouter();
    const [locale, setLocale] = useState("en");
    const changeLanguage = (locale: string) => {
        // overwrite cookie
        document.cookie = `locale=${locale}`;
        setLocale(locale);
        // refresh page so server picks new cookie
        router.refresh();
      };
    return (
      <div className="te-navbar-dropdown">
     {locale === "ar" && <a onClick={() => changeLanguage("en")} className="header-notification text-capitalize relative flex items-center gap-3 cursor-pointer">
          <div className="cart-icon">
              <div className="w-10 h-10 bg-gray-100 dark:bg-gray-900 flex justify-center items-center rounded-full relative">
               EN
                
              </div>
          </div>
      </a>}
      {locale === "en" && <a onClick={() => changeLanguage("ar")} className="header-notification relative flex items-center gap-3 cursor-pointer">
          <div className="cart-icon">
              <div className="w-10 h-10 text-capitalize bg-gray-100 dark:bg-gray-900 flex justify-center items-center rounded-full relative">
               <span className=" text-uppercase">
                    Ar
               </span>
              </div>
          </div>
      </a>}
  </div>
    )
  }
  
  export default LanguageSwitcher
  