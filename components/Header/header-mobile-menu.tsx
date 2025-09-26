'use client'
import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react'

function HeaderMobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<Set<string>>(new Set());
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        // Also check if the click is not on the toggle button
        const toggleButton = document.querySelector('.te-navbar-toggle');
        if (toggleButton && !toggleButton.contains(target)) {
          setIsOpen(false);
          setOpenSubmenus(new Set());
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => {
    const newIsOpen = !isOpen;
    console.log('Toggle clicked - current isOpen:', isOpen, 'newIsOpen:', newIsOpen);
    setIsOpen(newIsOpen);
    if (!newIsOpen) {
      setOpenSubmenus(new Set());
    }
  };

  const toggleSubmenu = (submenuName: string) => {
    const newOpenSubmenus = new Set(openSubmenus);
    if (newOpenSubmenus.has(submenuName)) {
      newOpenSubmenus.delete(submenuName);
    } else {
      newOpenSubmenus.add(submenuName);
    }
    setOpenSubmenus(newOpenSubmenus);
  };
  return (
    <>
      <button 
        className="te-navbar-toggle te-navbar-icon-button lg:hidden" 
        aria-label="Toggle mobile menu" 
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        onClick={toggleMobileMenu}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>

{/* // <!-- Mobile Navigation Menu --> */}
<div className={`te-navbar-nav-mobile ${isOpen ? 'te-navbar-nav-mobile-show' : ''}`} id="mobile-navigation" aria-label="Mobile Navigation" ref={dropdownRef}>
    <div className="flex flex-col">

        <Link href="/" className="te-navbar-link-mobile te-navbar-link-active">Home</Link>

        <a
          href="#" 
          className={`te-navbar-link-mobile te-navbar-link-mobile-has-submenu  dark:text-white${openSubmenus.has('men') ? 'te-mobile-submenu-open dark:text-white' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            toggleSubmenu('men');
          }}
        >
          Men
        </a>
        <div className={`te-navbar-submenu-mobile  ${openSubmenus.has('men') ? 'te-submenu-mobile-open ' : ' '}`}>
            <a href="#" className="te-navbar-submenu-mobile-link">Menu Link 1</a>
            <a href="#" className="te-navbar-submenu-mobile-link">Menu Link 2</a>
            <a href="#" className="te-navbar-submenu-mobile-link">Menu Link 3</a>
            <a href="#" className="te-navbar-submenu-mobile-link">Menu Link 4</a>
            <a href="#" className="te-navbar-submenu-mobile-link">Menu Link 5</a>
            <a href="#" className="te-navbar-submenu-mobile-link">Menu Link 6</a>
        </div>

        <a 
          href="#" 
          className={`te-navbar-link-mobile te-navbar-link-mobile-has-submenu dark:text-white ${openSubmenus.has('women') ? 'te-mobile-submenu-open dark:text-white' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            toggleSubmenu('women');
          }}
        >
          Women
        </a>
        <div className={`te-navbar-submenu-mobile ${openSubmenus.has('women') ? 'te-submenu-mobile-open' : ''}`}>
            <a href="#" className="te-navbar-submenu-mobile-link">Menu Link 1</a>
            <a href="#" className="te-navbar-submenu-mobile-link">Menu Link 2</a>
            <a href="#" className="te-navbar-submenu-mobile-link">Menu Link 3</a>
            <a href="#" className="te-navbar-submenu-mobile-link">Menu Link 4</a>
            <a href="#" className="te-navbar-submenu-mobile-link">Menu Link 5</a>
            <a href="#" className="te-navbar-submenu-mobile-link">Menu Link 6</a>
        </div>

        <a 
          href="#" 
          className={`te-navbar-link-mobile te-navbar-link-mobile-has-submenu dark:text-white ${openSubmenus.has('kids') ? 'te-mobile-submenu-open dark:text-white' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            toggleSubmenu('kids');
          }}
        >
          Kids
        </a>
        <div className={`te-navbar-submenu-mobile ${openSubmenus.has('kids') ? 'te-submenu-mobile-open' : ''}`}>
            <a href="#" className="te-navbar-submenu-mobile-link">Menu Link 1</a>
            <a href="#" className="te-navbar-submenu-mobile-link">Menu Link 2</a>
            <a href="#" className="te-navbar-submenu-mobile-link">Menu Link 3</a>
            <a href="#" className="te-navbar-submenu-mobile-link">Menu Link 4</a>
            <a href="#" className="te-navbar-submenu-mobile-link">Menu Link 5</a>
            <a href="#" className="te-navbar-submenu-mobile-link">Menu Link 6</a>
        </div>

        <a 
          href="#" 
          className={`te-navbar-link-mobile te-navbar-link-mobile-has-submenu dark:text-white ${openSubmenus.has('accessories') ? 'te-mobile-submenu-open dark:text-white' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            toggleSubmenu('accessories');
          }}
        >
          Accessories
        </a>
        <div className={`te-navbar-submenu-mobile dark:text-white ${openSubmenus.has('accessories') ? 'te-submenu-mobile-open dark:text-white' : ''}`}>
            <a href="#" className="te-navbar-submenu-mobile-link">Menu Link 1</a>
            <a href="#" className="te-navbar-submenu-mobile-link">Menu Link 2</a>
            <a href="#" className="te-navbar-submenu-mobile-link">Menu Link 3</a>
            <a href="#" className="te-navbar-submenu-mobile-link">Menu Link 4</a>
        </div>


        <Link href="/products" className="te-navbar-link-mobile dark:text-white">Products</Link>
        <a href="#" className="te-navbar-link-mobile dark:text-white">New Arrivals</a>
        <a href="blog.php" className="te-navbar-link-mobile dark:text-white">Blog</a>
        <a href="contact.php" className="te-navbar-link-mobile dark:text-white">Contact Us</a>

    </div>
</div>
    </>
  
  )
}

export default HeaderMobileMenu
