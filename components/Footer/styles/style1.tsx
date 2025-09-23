import React from 'react'
import FooterApp from '../footer-app'
import FooterSocialMedia from '../Footer-social-media'
import { getTranslations } from 'next-intl/server'
async function FooterStyle1() {
    const t = await getTranslations()
  return (
      <footer className="te-footer flex-shrink-0">
    <div className="container">

        <div className="te-footer-content ">
            <div className="te-footer-grid te-footer-grid-5">
                {/* Company */}
                <div className="te-footer-widget footer-widget-1">
                    <div className="footer-widget">
                        <div className="te-footer-title">{t("Company")}</div>
                        <div className="menu-footer-container">
                            <ul className="menu">
                                <li><a href="#about" className="te-footer-link">{t("About Us")}</a></li>
                                <li><a href="#careers" className="te-footer-link">{t("Careers")}</a></li>
                                <li><a href="#press" className="te-footer-link">{t("Press")}</a></li>
                                <li><a href="#blog" className="te-footer-link">{t("Blog")}</a></li>
                                <li><a href="#partners" className="te-footer-link">{t("Partners")}</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Support */}
                <div className="te-footer-widget footer-widget-1">
                    <div className="footer-widget">
                        <div className="te-footer-title">{t("Support")}</div>
                        <div className="menu-footer-container">
                            <ul className="menu">
                                <li><a href="#help" className="te-footer-link">{t("Help Center")}   </a></li>
                                <li><a href="#contact" className="te-footer-link">{t("Contact")}</a></li>
                                <li><a href="#faqs" className="te-footer-link">{t("FAQs")}</a></li>
                                <li><a href="#chat" className="te-footer-link">{t("Live Chat")}</a></li>
                                <li><a href="#guides" className="te-footer-link">{t("Guides")}</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Legal */}
                <div className="te-footer-widget footer-widget-1">
                    <div className="footer-widget">
                        <div className="te-footer-title">{t("Legal")}</div>
                        <div className="menu-footer-container">
                            <ul className="menu">
                                <li><a href="/privacy" className="te-footer-link">{t("Privacy Policy")}</a></li>
                                <li><a href="/terms" className="te-footer-link">{t("Terms of Service")}</a></li>
                                <li><a href="/cookies" className="te-footer-link">{t("Cookies")}</a></li>
                                <li><a href="#disclaimer" className="te-footer-link">{t("Disclaimer")}</a></li>
                                <li><a href="#accessibility" className="te-footer-link">{t("Accessibility")}</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Social */}
                <div className="te-footer-widget footer-widget-1">
                    <div className="footer-widget">
                        <div className="te-footer-title">{t("Social")}</div>
                        <div className="menu-footer-container">
                            <ul className="menu">
                                <li><a href="#facebook" className="te-footer-link">{t("Facebook")}</a></li>
                                <li><a href="#twitter" className="te-footer-link">{t("Twitter")}</a></li>
                                <li><a href="#instagram" className="te-footer-link">{t("Instagram")}</a></li>
                                <li><a href="#linkedin" className="te-footer-link">{t("LinkedIn")}</a></li>
                                <li><a href="#youtube" className="te-footer-link">{t("YouTube")}</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* App Download - 5th column (larger) */}
                <FooterApp />
            </div>
        </div>

        <div className="te-footer-bottom ">
            <div className="te-footer-bottom-content">

                <div className="te-footer-copyright">
                    <p>© 2025 Naseem. {t("All rights reserved")}. </p>
                </div>

                <div className="te-footer-bottom-links">
                    <FooterSocialMedia />
                </div>

            </div>
        </div>
        
    </div>
</footer>
  )
}

export default FooterStyle1
