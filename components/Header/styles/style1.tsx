import HeaderSearch from '../header-search' 
import HeaderNotification from '../header-notification' 
import HeaderWishlist from '../header-wish-list'
import HeaderAccount from '../header-account'
import HeaderCart from '../header-cart'
import HeaderDarkMode from '../header-dark-mode'
import HeaderDesktopMenu from '../header-desktop-menu'
import HeaderMobileMenu from '../header-mobile-menu'

import LanguageSwitcher from '../LanguageSwitcher'
import LoginButton from '../login'
import Link from 'next/link'

function style1() {
  return (
    <nav className="te-navbar whitespace-nowrap mx-auto shadow-sm w-full relative bg-white dark:bg-gray-800" role="navigation" aria-label="Main Navigation">

    <div className="te-navbar-container container">

        <div className="te-navbar-content flex justify-between items-center min-h-20 relative">

            {/* <!-- Logo/Brand Section --> */}
            <div className="te-navbar-brand">
                <Link href="/" className="flex items-center gap-3 no-underline">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">T</div><span className="text-xl font-bold text-gray-600 dark:text-white">Naseem</span>
                </Link>
            </div>

            <HeaderSearch />

            {/* <!-- Header Actions --> */}
            <div className="header-actions flex items-center gap-1 lg:gap-6 w-auto shrink-0">

                <div className="items-center hidden lg:flex gap-2">

                    {/* <!-- Notification --> */}
                    <LanguageSwitcher />
                  {  
                  
                  <>
                  
                  <LoginButton />
                  
                  
                  </>
                  }
                  {
                   
                    <>
                    <HeaderWishlist />
                    <HeaderNotification />
                    <HeaderAccount />
                    </>
                  }
                 


                    {/* <!-- Wishlist --> */}
                    {/* <!-- Account --> */}
                    {/* <!-- Cart --> */}

                   

                </div>

                {/* <!-- Dark Mode Toggle Button --> */}
                <div className="items-center lg:hidden  gap-2">

                <LanguageSwitcher />

                </div>
                <HeaderCart />
                <HeaderDarkMode />

                {/* <!-- Mobile Menu Toggle Button --> */}
                <HeaderMobileMenu />

            </div>
            {/* <!-- header-actions --> */}

        </div>
        {/* <!-- te-navbar-content --> */}

        {/* <!-- Desktop Navigation Menu --> */}
        <HeaderDesktopMenu />

    </div>
</nav>
  )
}

export default style1
