import React from 'react'
import FooterApp from '../footer-app'
import FooterSocialMedia from '../Footer-social-media'

function FooterStyle1() {
  return (
      <footer className="te-footer flex-shrink-0">
    <div className="container">

        <div className="te-footer-content ">
            <div className="te-footer-grid te-footer-grid-5">
                {/* Company */}
                <div className="te-footer-widget footer-widget-1">
                    <div className="footer-widget">
                        <div className="te-footer-title">Company</div>
                        <div className="menu-footer-container">
                            <ul className="menu">
                                <li><a href="#about" className="te-footer-link">About Us</a></li>
                                <li><a href="#careers" className="te-footer-link">Careers</a></li>
                                <li><a href="#press" className="te-footer-link">Press</a></li>
                                <li><a href="#blog" className="te-footer-link">Blog</a></li>
                                <li><a href="#partners" className="te-footer-link">Partners</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Support */}
                <div className="te-footer-widget footer-widget-1">
                    <div className="footer-widget">
                        <div className="te-footer-title">Support</div>
                        <div className="menu-footer-container">
                            <ul className="menu">
                                <li><a href="#help" className="te-footer-link">Help Center</a></li>
                                <li><a href="#contact" className="te-footer-link">Contact</a></li>
                                <li><a href="#faqs" className="te-footer-link">FAQs</a></li>
                                <li><a href="#chat" className="te-footer-link">Live Chat</a></li>
                                <li><a href="#guides" className="te-footer-link">Guides</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Legal */}
                <div className="te-footer-widget footer-widget-1">
                    <div className="footer-widget">
                        <div className="te-footer-title">Legal</div>
                        <div className="menu-footer-container">
                            <ul className="menu">
                                <li><a href="/privacy" className="te-footer-link">Privacy Policy</a></li>
                                <li><a href="/terms" className="te-footer-link">Terms of Service</a></li>
                                <li><a href="/cookies" className="te-footer-link">Cookies</a></li>
                                <li><a href="#disclaimer" className="te-footer-link">Disclaimer</a></li>
                                <li><a href="#accessibility" className="te-footer-link">Accessibility</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Social */}
                <div className="te-footer-widget footer-widget-1">
                    <div className="footer-widget">
                        <div className="te-footer-title">Social</div>
                        <div className="menu-footer-container">
                            <ul className="menu">
                                <li><a href="#facebook" className="te-footer-link">Facebook</a></li>
                                <li><a href="#twitter" className="te-footer-link">Twitter</a></li>
                                <li><a href="#instagram" className="te-footer-link">Instagram</a></li>
                                <li><a href="#linkedin" className="te-footer-link">LinkedIn</a></li>
                                <li><a href="#youtube" className="te-footer-link">YouTube</a></li>
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
                    <p>© 2025 Naseem. All rights reserved. </p>
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
