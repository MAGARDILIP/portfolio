import { useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import { achievements, certifications } from '../data/portfolioData';
import CertificateModal from './CertificateModal';
import './Achievements.css';

export default function Achievements() {
  const ref = useScrollReveal();
  const [selectedCertIndex, setSelectedCertIndex] = useState(null);
  const [expanded, setExpanded] = useState(false);

  /* Show 4 certs by default; rest behind "Show More" */
  const VISIBLE_COUNT = 4;
  const visibleCerts = expanded ? certifications : certifications.slice(0, VISIBLE_COUNT);
  const hasMore = certifications.length > VISIBLE_COUNT;

  const openCert = (index) => setSelectedCertIndex(index);
  const closeCert = () => setSelectedCertIndex(null);
  const prevCert = () => setSelectedCertIndex((i) => Math.max(0, i - 1));
  const nextCert = () => setSelectedCertIndex((i) => Math.min(certifications.length - 1, i + 1));

  return (
    <section id="achievements" className="section achievements">
      <div className="container">
        <div className="section-header">
          <span className="section-label">// Achievements</span>
          <h2 className="section-title">Milestones &amp; Certifications</h2>
          <div className="section-divider" />
        </div>

        <div className="reveal" ref={ref}>
          <div className="achievements__grid">
            {achievements.map((item, i) => (
              <div key={i} className="achievements__card reveal-child">
                <span className="achievements__icon">{item.icon}</span>
                <div className="achievements__value-wrapper">
                  <span className="achievements__value">
                    {item.title === 'HackerRank'
                      ? '★'.repeat(Number(item.value))
                      : item.value}
                  </span>
                  <span className="achievements__unit">{item.unit}</span>
                </div>
                <h3 className="achievements__title">{item.title}</h3>
                <p className="achievements__desc">{item.description}</p>
              </div>
            ))}
          </div>

          {certifications.length > 0 && (
            <div className="certifications">
              <h3 className="certifications__heading">Certifications</h3>
              <div className="certifications__grid">
                {visibleCerts.map((cert, i) => (
                  <button
                    key={i}
                    className={`certifications__card${i < VISIBLE_COUNT ? ' reveal-child' : ''}`}
                    onClick={() => openCert(i)}
                    aria-label={`View certificate: ${cert.title}`}
                  >
                    <span className="certifications__icon">{cert.icon}</span>
                    <div>
                      <span className="certifications__title">{cert.title}</span>
                      <span className="certifications__issuer">{cert.issuer}</span>
                    </div>
                    <svg className="certifications__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                  </button>
                ))}
              </div>

              {hasMore && (
                <button
                  className="certifications__toggle"
                  onClick={() => setExpanded((e) => !e)}
                  aria-expanded={expanded}
                >
                  {expanded ? (
                    <>
                      Show Less
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
                    </>
                  ) : (
                    <>
                      Show More ({certifications.length - VISIBLE_COUNT} more)
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Certificate Viewer Modal */}
      {selectedCertIndex !== null && (
        <CertificateModal
          cert={certifications[selectedCertIndex]}
          certIndex={selectedCertIndex}
          totalCerts={certifications.length}
          onClose={closeCert}
          onPrev={prevCert}
          onNext={nextCert}
        />
      )}
    </section>
  );
}
