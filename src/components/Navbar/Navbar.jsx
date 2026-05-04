import React, { useState, useEffect } from 'react';
import './Navbar.css'; // Optional specific styling if not fully covered by global

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled glass-panel' : ''}`}>
      <div className="container navbar-content">
        <div className="logo">
          <span className="text-gradient font-bold">EdGlobal Beyond</span>
        </div>
        <ul className="nav-links">
          <li><a href="#destinos">Destinos</a></li>
          <li><a href="#programas">Programas</a></li>
          <li><a href="#testimonios">Testimonios</a></li>
        </ul>
        <div className="nav-actions">
          <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
            Asesoría Gratuita
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
