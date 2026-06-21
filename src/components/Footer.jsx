import { personalInfo, socialLinks } from '../data/portfolioData';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__left">
            <span className="footer__logo">
              <span className="footer__bracket">&lt;</span>
              {personalInfo.name.split(' ')[0]}
              <span className="footer__bracket"> /&gt;</span>
            </span>
            <p className="footer__tagline">Built with React ⚡</p>
          </div>
          <div className="footer__socials">
            {socialLinks.map((link) => (
              <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" title={link.name}>
                {link.name}
              </a>
            ))}
          </div>
        </div>
        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
