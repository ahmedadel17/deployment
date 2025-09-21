import React from "react";

type Link = {
  name: string;
  url: string;
};

type FooterMenu = {
  title: string;
  links: Link[];
};

const footerMenus: FooterMenu[] = [
  {
    title: "Company",
    links: [
      { name: "About Us", url: "#about" },
      { name: "Careers", url: "#careers" },
      { name: "Press", url: "#press" },
      { name: "Blog", url: "#blog" },
      { name: "Partners", url: "#partners" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Help Center", url: "#help" },
      { name: "Contact", url: "#contact" },
      { name: "FAQs", url: "#faqs" },
      { name: "Live Chat", url: "#chat" },
      { name: "Guides", url: "#guides" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", url: "privacy-page.php" },
      { name: "Terms of Service", url: "terms-page.php" },
      { name: "Cookies", url: "cookies-page.php" },
      { name: "Disclaimer", url: "#disclaimer" },
      { name: "Accessibility", url: "#accessibility" },
    ],
  },
  {
    title: "Social",
    links: [
      { name: "Facebook", url: "#facebook" },
      { name: "Twitter", url: "#twitter" },
      { name: "Instagram", url: "#instagram" },
      { name: "LinkedIn", url: "#linkedin" },
      { name: "YouTube", url: "#youtube" },
    ],
  },
];

const FooterMenu: React.FC = () => {
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
                      {link.name}
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
