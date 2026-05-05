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
        <a href="#" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="/assets/logo_cropped.png" alt="EdGlobal" className="nav-logo-img" />
          <span className="text-gradient font-bold">EdGlobal Beyond</span>
        </a>
        <ul className="nav-links">
          <li><a href="#destinos">Destinos</a></li>
          <li><a href="#programas">Programas</a></li>
          <li><a href="#nosotros">Nosotros</a></li>
          <li><a href="#testimonios">Testimonios</a></li>
        </ul>
        <div className="nav-actions">
          <a href="#contacto" className="btn btn-primary btn-sm">
            Asesoría Gratuita
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
