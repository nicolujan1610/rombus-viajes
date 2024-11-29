import React from "react";
import facebookLogo from "../assets/facebook.png";
import instagramLogo from "../assets/instagram.png";
import twitterLogo from "../assets/twitter.png";
import youtubeLogo from "../assets/youtube.png";
import "../estilos/Footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-column">
        <h1 className="footer-title">Rombus Viajes</h1>
      </div>
      <div className="footer-column">
        <h2>Información</h2>
        <ul>
          <li>
            <a href="#destino">
              Destinos
            </a>
          </li>
          <li>
            <a href="#atencion">
              Hace tu consulta aca
            </a>
          </li>
        </ul>
      </div>
      <div className="footer-column">
        <h2>Redes Sociales</h2>
        <ul>
          <li className="social-item">
            <img src={facebookLogo} alt="Facebook" className="footer-logo" />
            <a href="https://facebook.com" target="_blank">
              Facebook
            </a>
          </li>
          <li className="social-item">
            <img src={instagramLogo} alt="Instagram" className="footer-logo" />
            Instagram
          </li>
          <li className="social-item">
            <img src={twitterLogo} alt="Twitter" className="footer-logo" />
            Twitter
          </li>
          <li className="social-item">
            <img src={youtubeLogo} alt="YouTube" className="footer-logo" />
            YouTube
          </li>
        </ul>
      </div>
      <p className="footer-rights">© 2024 Rombus Viajes. Todos los derechos reservados.</p>
    </div>
  );
};
