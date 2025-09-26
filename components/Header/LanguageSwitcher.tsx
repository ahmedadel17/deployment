
'use client'

import {useRouter} from "next/navigation";
import { useState, useEffect } from "react";


function LanguageSwitcher() {
    const router = useRouter();
    const [locale, setLocale] = useState("en");
    
    // Read initial locale from cookie
    useEffect(() => {
        const getCookieValue = (name: string) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop()?.split(';').shift();
            return null;
        };
        
        const cookieLocale = getCookieValue('locale') || 'en';
        setLocale(cookieLocale);
    }, []);
    
    const changeLanguage = (locale: string, event: React.MouseEvent) => {
        event.preventDefault();
        // overwrite cookie
        document.cookie = `locale=${locale}; path=/; max-age=${60 * 60 * 24 * 365}`;
        setLocale(locale);
        // refresh page so server picks new cookie
        router.refresh();
      };
    return (
      <div className="te-navbar-dropdown">
     {locale === "ar" && <a onClick={(e) => changeLanguage("en", e)} className="header-notification text-capitalize relative flex items-center gap-3 cursor-pointer">
          <div className="cart-icon">
              <div className="w-10 h-10 bg-gray-100 dark:bg-gray-900 dark:text-white flex justify-center items-center rounded-full relative">
               EN
                
              </div>
          </div>
      </a>}
      {locale === "en" && <a onClick={(e) => changeLanguage("ar", e)} className="header-notification relative flex items-center gap-3 cursor-pointer">
          <div className="cart-icon">
              <div className="w-10 h-10 text-capitalize bg-gray-100 dark:text-white dark:bg-gray-900 flex justify-center items-center rounded-full relative">
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
  