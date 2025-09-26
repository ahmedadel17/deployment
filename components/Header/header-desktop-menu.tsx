import {getTranslations} from 'next-intl/server';
import Link from 'next/link';

async function HeaderDesktopMenu() {
    const t = await getTranslations();
  return (
    <div className="te-navbar-nav te-navbar-nav-desktop border-t border-gray-100 dark:border-gray-700 justify-center hidden lg:flex">

    <Link href="/" className="te-navbar-link te-navbar-link-active">{t("Home")}</Link>

    <div className="te-navbar-mega-dropdown"><a href="#" className="te-navbar-link te-navbar-link-has-mega-menu">{t("Men")}</a>
        <div className="te-navbar-mega-menu te-navbar-mega-menu-2-col">
            <div className="te-navbar-mega-menu-grid">
                <div className="te-navbar-mega-menu-column">
                    <h6 className="te-navbar-mega-menu-title">{t("Men Mega Menu Title")}</h6>
                    <a href="#" className="te-navbar-mega-menu-link">{t("Menu Link 1")}</a>
                    <a href="#" className="te-navbar-mega-menu-link">{t("Menu Link 2")}</a>
                    <a href="#" className="te-navbar-mega-menu-link">{t("Menu Link 3")}</a>
                </div>
                <div className="te-navbar-mega-menu-column">
                    <h6 className="te-navbar-mega-menu-title">{t("Men Mega Menu Title")}</h6>
                    <a href="#" className="te-navbar-mega-menu-link">{t("Menu Link 1")}</a>
                    <a href="#" className="te-navbar-mega-menu-link">{t("Menu Link 2")}</a>
                    <a href="#" className="te-navbar-mega-menu-link">{t("Menu Link 3")}</a>
                </div>
            </div>
        </div>
    </div>
    {/* <!-- .te-navbar-mega-dropdown --> */}

    <div className="te-navbar-mega-dropdown">
        <a href="#" className="te-navbar-link te-navbar-link-has-mega-menu">{t("Women")}</a>
        <div className="te-navbar-mega-menu te-navbar-mega-menu-2-col">
            <div className="te-navbar-mega-menu-grid">
                <div className="te-navbar-mega-menu-column">
                    <h6 className="te-navbar-mega-menu-title">{t("Women Mega Menu Title")}</h6>
                    <a href="#" className="te-navbar-mega-menu-link">{t("Menu Link 1")}</a>
                    <a href="#" className="te-navbar-mega-menu-link">{t("Menu Link 2")}</a>
                    <a href="#" className="te-navbar-mega-menu-link">{t("Menu Link 3")}</a>
                </div>
                <div className="te-navbar-mega-menu-column">
                    <h6 className="te-navbar-mega-menu-title">{t("Women Mega Menu Title")}</h6>
                    <a href="#" className="te-navbar-mega-menu-link">{t("Menu Link 1")}</a>
                    <a href="#" className="te-navbar-mega-menu-link">{t("Menu Link 2")}</a>
                    <a href="#" className="te-navbar-mega-menu-link">{t("Menu Link 3")}</a>
                </div>
            </div>
        </div>
    </div>
    {/* <!-- .te-navbar-mega-dropdown --> */}


    <div className="te-navbar-mega-dropdown"><a href="#" className="te-navbar-link te-navbar-link-has-mega-menu">{t("Kids")}</a>
        <div className="te-navbar-mega-menu te-navbar-mega-menu-2-col">
            <div className="te-navbar-mega-menu-grid">
                <div className="te-navbar-mega-menu-column">
                    <h6 className="te-navbar-mega-menu-title">{t("Kids Mega Menu Title")}</h6>
                    <a href="#" className="te-navbar-mega-menu-link">{t("Menu Link 1")}</a>
                    <a href="#" className="te-navbar-mega-menu-link">{t("Menu Link 2")}</a>
                    <a href="#" className="te-navbar-mega-menu-link">{t("Menu Link 3")}</a>
                </div>
                <div className="te-navbar-mega-menu-column">
                    <h6 className="te-navbar-mega-menu-title">{t("Kids Mega Menu Title")}</h6>
                    <a href="#" className="te-navbar-mega-menu-link">{t("Menu Link 1")}</a>
                    <a href="#" className="te-navbar-mega-menu-link">{t("Menu Link 2")}</a>
                    <a href="#" className="te-navbar-mega-menu-link">{t("Menu Link 3")}</a>
                </div>
            </div>
        </div>
    </div>
    {/* <!-- .te-navbar-mega-dropdown --> */}

    <div className="te-navbar-dropdown">
        <a href="#" className="te-navbar-link te-navbar-link-has-submenu">{t("Accessories")}</a>
        <div className="te-navbar-submenu-content">
            <a href="#" className="te-navbar-submenu-link">{t("Menu Link 1")}</a>
            <a href="#" className="te-navbar-submenu-link">{t("Menu Link 2")}</a>
            <a href="#" className="te-navbar-submenu-link">{t("Menu Link 3")}</a>
            <a href="#" className="te-navbar-submenu-link">{t("Menu Link 4")}</a>
        </div>
    </div>
    {/* <!-- .te-navbar-dropdown --> */}

    <div className="te-navbar-dropdown">
        <a href="#" className="te-navbar-link te-navbar-link-has-submenu">{t("Single")}</a>
        <div className="te-navbar-submenu-content">
            <a href="single.php" className="te-navbar-submenu-link">{t("Single")}</a>
            <a href="single-3d.php" className="te-navbar-submenu-link">{t("Single Gallery 3D")}</a>
            <a href="single-full.php" className="te-navbar-submenu-link">{t("Single Full")}</a>
        </div>
    </div>
    {/* <!-- .te-navbar-dropdown --> */}

    <Link href="/products" className="te-navbar-link">{t("Products")}</Link>
    <a href="cotton.php" className="te-navbar-link">{t("Cotton")}</a>
    <a href="blog.php" className="te-navbar-link">{t("Blog")}</a>
    <a href="contact.php" className="te-navbar-link">{t("Contact Us")}</a>

</div>
  )
}

export default HeaderDesktopMenu
