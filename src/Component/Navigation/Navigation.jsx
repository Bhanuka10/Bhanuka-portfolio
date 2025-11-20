import React, { useState, useEffect, useRef } from 'react';
import './Navigation.css';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // refs: better than document.querySelector
  const navMenuRef = useRef(null);
  const hamburgerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobileMenuOpen &&
        navMenuRef.current &&
        !navMenuRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  const handleLinkClick = (linkName, e) => {
    e.preventDefault();
    setActiveLink(linkName);
    scrollToSection(linkName);

    // Ripple Effect
    const rect = e.currentTarget.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

    e.currentTarget.appendChild(ripple);

    setTimeout(() => ripple.remove(), 500);
  };

  const scrollToSection = (linkName) => {
    const sectionMap = {
      home: '.profile',
      about: '.about-me',
      projects: '.projects-container',
      skills: '.skill-section',
      contact: '.contact',
      email: '.email-contact-section'
    };

    const selector = sectionMap[linkName] || `#${linkName}`;
    const target = document.querySelector(selector) || document.body;

    target.scrollIntoView({ behavior: 'smooth', block: 'start' });

    if (linkName === 'email') {
      target.classList.add('active');
      setTimeout(() => target.classList.remove('active'), 3000);
    }
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleMobileLinkClick = (linkName, e) => {
    handleLinkClick(linkName, e);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">

        {/* Logo */}
        <div className="nav-logo">
          <span className="logo-text">
            <span className="logo-icon">⚡</span>
            <span className="logo-name">BHANUKA</span>
          </span>
        </div>

        {/* Desktop / Mobile Menu */}
        <div ref={navMenuRef} className={`nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          <ul className="nav-list">
            {['home','about','projects','skills','contact'].map((item) => (
              <li key={item} className="nav-item">
                <a
                  href={`#${item}`}
                  className={`nav-link ${activeLink === item ? 'active' : ''}`}
                  onClick={(e) => handleMobileLinkClick(item, e)}
                >
                  <span className="link-text">{item.charAt(0).toUpperCase() + item.slice(1)}</span>
                  <span className="link-dot"></span>
                  <span className="link-bg"></span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Hamburger */}
        <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          <div ref={hamburgerRef} className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
            <span></span><span></span><span></span>
          </div>
        </div>

        {/* CTA */}
        <div className="nav-cta">
          <button
            className="hire-btn"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setActiveLink('email');
              scrollToSection('email');
            }}
            onTouchStart={(e) => {
              e.preventDefault();
              setActiveLink('email');
              scrollToSection('email');
            }}
          >
            <span className="btn-text">Let's Work</span>
          </button>
        </div>
      </div>

      {/* Backdrop */}
      <div
        className={`mobile-backdrop ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>
    </nav>
  );
};

export default Navigation;
