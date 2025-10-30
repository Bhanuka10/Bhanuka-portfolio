import React, { useCallback } from 'react'
import './Footer.css'
import { FaWhatsapp, FaLinkedinIn, FaGithub, FaFacebookF, FaArrowUp } from 'react-icons/fa'

const Footer = () => {
  const scrollToTop = useCallback(() => {
    console.log('=== SMOOTH SCROLL TO TOP STARTED ===');
    
    const startPosition = window.pageYOffset || document.documentElement.scrollTop;
    const targetPosition = 0;
    const distance = startPosition - targetPosition;
    const duration = 800; // 800ms for smooth animation
    let startTime = null;
    
    console.log('Starting scroll from:', startPosition);
    
    // Custom smooth scroll animation using requestAnimationFrame
    const smoothScrollAnimation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      // Easing function for smooth animation (ease-out)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      const currentPosition = startPosition - (distance * easeOutQuart);
      
      // Apply scroll to multiple elements for compatibility
      window.scrollTo(0, currentPosition);
      document.documentElement.scrollTop = currentPosition;
      document.body.scrollTop = currentPosition;
      
      // Continue animation if not finished
      if (progress < 1) {
        requestAnimationFrame(smoothScrollAnimation);
      } else {
        console.log('✅ Smooth scroll animation completed!');
        // Final position check
        setTimeout(() => {
          const finalPosition = window.pageYOffset || document.documentElement.scrollTop;
          console.log('Final position:', finalPosition);
        }, 50);
      }
    };
    
    // Start the animation
    requestAnimationFrame(smoothScrollAnimation);
  }, []);

  const handleScrollClick = useCallback((e) => {
    console.log('=== BUTTON CLICKED ===');
    console.log('Event type:', e.type);
    console.log('Target:', e.target);
    
    e.preventDefault();
    e.stopPropagation();
    
    scrollToTop();
  }, [scrollToTop]);

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Left Section - Name and Description */}
          <div className="footer-left">
            <h3 className="footer-name">Sahan Bhanuka</h3>
            <p className="footer-description">
              AI-powered web developer creating intelligent solutions with modern technologies and machine learning integration.
            </p>
          </div>

          {/* Center Section - Social Media */}
          <div className="footer-center">
            <div className="social-links">
              <a href="https://wa.me/94778988024" className="social-link" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp />
              </a>
              <a href="https://www.linkedin.com/in/bhanuka-bandaranayake-0a1968302" className="social-link" target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn />
              </a>
              <a href="https://github.com/Bhanuka10" className="social-link" target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </a>
              <a href="https://web.facebook.com/profile.php?id=61575244409434" className="social-link" target="_blank" rel="noopener noreferrer">
                <FaFacebookF />
              </a>
            </div>
          </div>

          {/* Right Section - Copyright and Scroll Top */}
          <div className="footer-right">
            <p className="copyright">© 2025 All Rights Reserved</p>
            <button 
              className="scroll-to-top" 
              onClick={handleScrollClick}
              aria-label="Scroll to top"
              type="button"
            >
              <FaArrowUp />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer