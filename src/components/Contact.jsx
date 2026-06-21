import { useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import { personalInfo, socialLinks } from '../data/portfolioData';
import './Contact.css';

const FORMSPREE_URL = 'https://formspree.io/f/mlgyrdla';

export default function Contact() {
  const ref = useScrollReveal();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send via Formspree
    setStatus('sending');
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _replyto: formData.email,
          _subject: `Portfolio Contact from ${formData.name}`,
        }),
      });

      if (res.ok) {
        setStatus('sent');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const buttonContent = {
    idle: (
      <>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        Send Message
      </>
    ),
    sending: (
      <>
        <span className="contact__spinner" />
        Sending...
      </>
    ),
    sent: <>✅ Message Sent!</>,
    error: <>❌ Failed — Try Again</>,
  };

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="section-header">
          <span className="section-label">// Get In Touch</span>
          <h2 className="section-title">Let's Work Together</h2>
          <div className="section-divider" />
        </div>

        <div className="contact__content reveal" ref={ref}>
          <p className="contact__intro">
            I'm currently open to opportunities and collaborations. Whether you have a project idea, a question, or just want to say hi — feel free to reach out!
          </p>

          <div className="contact__grid">
            <a href={`mailto:${personalInfo.email}`} className="contact__card reveal-child">
              <span className="contact__card-icon">✉️</span>
              <div className="contact__card-info">
                <span className="contact__card-label">Email</span>
                <span className="contact__card-value">{personalInfo.email}</span>
              </div>
            </a>
            <a href={`tel:${personalInfo.phone}`} className="contact__card reveal-child">
              <span className="contact__card-icon">📱</span>
              <div className="contact__card-info">
                <span className="contact__card-label">Phone</span>
                <span className="contact__card-value">{personalInfo.phone}</span>
              </div>
            </a>
            <div className="contact__card reveal-child">
              <span className="contact__card-icon">📍</span>
              <div className="contact__card-info">
                <span className="contact__card-label">Location</span>
                <span className="contact__card-value">{personalInfo.location}</span>
              </div>
            </div>
          </div>

          <div className="contact__form-wrapper reveal-child">
            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="contact__form-row">
                <div className="contact__field">
                  <label htmlFor="contact-name">Name</label>
                  <input type="text" id="contact-name" name="name"
                    placeholder="Your Name" required
                    value={formData.name} onChange={handleChange}
                    disabled={status === 'sending'} />
                </div>
                <div className="contact__field">
                  <label htmlFor="contact-email">Email</label>
                  <input type="email" id="contact-email" name="email"
                    placeholder="your@email.com" required
                    value={formData.email} onChange={handleChange}
                    disabled={status === 'sending'} />
                </div>
              </div>
              <div className="contact__field">
                <label htmlFor="contact-message">Message</label>
                <textarea id="contact-message" name="message"
                  placeholder="Your message..." rows="5" required
                  value={formData.message} onChange={handleChange}
                  disabled={status === 'sending'} />
              </div>
              <button
                type="submit"
                className={`btn btn-primary contact__submit contact__submit--${status}`}
                disabled={status === 'sending'}
              >
                {buttonContent[status]}
              </button>
            </form>
          </div>

          <div className="contact__socials">
            {socialLinks.map((link) => (
              <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="contact__social-btn">
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
