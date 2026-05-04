import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <h3 className="footer-logo text-gradient">EdGlobal Beyond</h3>
          <p className="footer-desc">
            Transformando el futuro de los jóvenes a través de experiencias educativas internacionales de primer nivel.
          </p>
        </div>
        
        <div className="footer-links">
          <h4>Navegación</h4>
          <ul>
            <li><a href="#">Inicio</a></li>
            <li><a href="#destinos">Destinos</a></li>
            <li><a href="#programas">Programas</a></li>
            <li><a href="#testimonios">Testimonios</a></li>
          </ul>
        </div>
        
        <div className="footer-contact">
          <h4>Contacto</h4>
          <ul>
            <li>📧 info@edglobalbeyond.com</li>
            <li>📱 +1 234 567 8900</li>
            <li>📍 Ciudad de México, México</li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container bottom-content">
          <p>&copy; {new Date().getFullYear()} EdGlobal Beyond. Todos los derechos reservados.</p>
          <div className="legal-links">
            <a href="#">Aviso de Privacidad</a>
            <a href="#">Términos y Condiciones</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
