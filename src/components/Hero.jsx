import useTypingEffect from '../hooks/useTypingEffect';
import { personalInfo, socialLinks } from '../data/portfolioData';
import './Hero.css';

export default function Hero() {
  const typedText = useTypingEffect(personalInfo.roles, 90, 50, 2200);

  return (
    <section id="hero" className="hero">
      <div className="dot-grid" />
      <div className="glow-orb glow-orb-1" />
      <div className="glow-orb glow-orb-2" />

      <div className="hero__content container">
        <div className="hero__text">
          <p className="hero__greeting">
            <span className="hero__wave">👋</span> Hey, I'm
          </p>
          <h1 className="hero__name">{personalInfo.name}</h1>
          <div className="hero__role-wrapper">
            <span className="hero__role-prefix">&gt; </span>
            <span className="hero__role">{typedText}</span>
            <span className="hero__cursor">|</span>
          </div>
          <p className="hero__tagline">
            I build production-grade web apps that solve real problems.
          </p>
          <div className="hero__cta">
            <a href={personalInfo.resume} download className="btn btn-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download Resume
            </a>
            <a href="#contact" className="btn btn-secondary" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
              Let's Connect
            </a>
          </div>
          <div className="hero__socials">
            {socialLinks.map((link) => (
              <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="hero__social-link" aria-label={link.name} title={link.name}>
                {link.name}
              </a>
            ))}
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__photo-wrapper">
            <div className="hero__photo-ring" />
            <div className="hero__photo-glow" />
            <img
              className="hero__photo"
              src={personalInfo.photo}
              alt={personalInfo.name}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }}
            />
            <div className="hero__photo-placeholder" style={{ display: 'none' }}>
              <span>{personalInfo.name.split(' ').map(n => n[0]).join('')}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero__scroll-indicator">
        <span>Scroll Down</span>
        <div className="hero__scroll-arrow">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="7 13 12 18 17 13"/><line x1="12" y1="18" x2="12" y2="6"/></svg>
        </div>
      </div>
    </section>
  );
}
