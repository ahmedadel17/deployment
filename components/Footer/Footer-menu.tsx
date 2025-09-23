import React from "react";
import { useTranslations } from "next-intl";
type Link = {
  name: string;
  url: string;
};

type FooterMenu = {
  title: string;
  links: Link[];
};


const FooterMenu: React.FC = () => {
  const t = useTranslations();
  const footerMenus: FooterMenu[] = [
    {
      title: t("Company"),
      links: [
        { name: t("About Us"), url: "#about" },
        { name: t("Careers"), url: "#careers" },
        { name: t("Press"), url: "#press" },
        { name: t("Blog"), url: "#blog" },
        { name: t("Partners"), url: "#partners" },
      ],
    },
    {
      title: t("Support"),
      links: [
        { name: t("Help Center"), url: "#help" },
        { name: t("Contact"), url: "#contact" },
        { name: t("FAQs"), url: "#faqs" },
        { name: t("Live Chat"), url: "#chat" },
        { name: t("Guides"), url: "#guides" },
      ],
    },
    {
      title: t("Legal"),
      links: [
        { name: t("Privacy Policy"), url: "privacy-page.php" },
        { name: t("Terms of Service"), url: "terms-page.php" },
        { name: t("Cookies"), url: "cookies-page.php" },
        { name: t("Disclaimer"), url: "#disclaimer" },
        { name: t("Accessibility"), url: "#accessibility" },
      ],
    },
    {
      title: t("Social"),
      links: [
        { name: t("Facebook"), url: "#facebook" },
        { name: t("Twitter"), url: "#twitter" },
        { name: t("Instagram"), url: "#instagram" },
        { name: t("LinkedIn"), url: "#linkedin" },
        { name: t("YouTube"), url: "#youtube" },
      ],
    },
  ];
  return (
    <footer className="footer">
      {footerMenus.map((menu, idx) => (
        <div key={idx} className="te-footer-widget footer-widget-1">
          <div className="footer-widget ">
            <div className="te-footer-title">{menu.title}</div>
            <div className="menu-footer-container">
              <ul className="menu">
                {menu.links.map((link, i) => (
                  <li key={i}>
                    <a href={link.url} className="te-footer-link">
                      {(link.name)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </footer>
  );
};

export default FooterMenu;
