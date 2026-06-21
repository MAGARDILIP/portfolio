import { useState, useEffect, useCallback } from 'react';
import './CertificateModal.css';

/**
 * Determines whether a file path points to an image or PDF.
 */
function getFileType(path) {
  if (!path) return 'unknown';
  const ext = path.split('.').pop().toLowerCase();
  if (['png', 'jpg', 'jpeg', 'webp', 'gif', 'svg'].includes(ext)) return 'image';
  if (ext === 'pdf') return 'pdf';
  return 'unknown';
}

export default function CertificateModal({ cert, certIndex, totalCerts, onClose, onPrev, onNext }) {
  const [closing, setClosing] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(onClose, 250);
  }, [onClose]);

  /* Keyboard navigation */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowLeft' && certIndex > 0) onPrev();
      if (e.key === 'ArrowRight' && certIndex < totalCerts - 1) onNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleClose, onPrev, onNext, certIndex, totalCerts]);

  /* Lock body scroll while modal is open */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  /* Reset state when navigating to a different cert */
  useEffect(() => {
    setImgError(false);
    setZoomed(false);
  }, [certIndex]);

  if (!cert) return null;

  const fileType = getFileType(cert.file);

  return (
    <div
      className={`cert-modal__backdrop ${closing ? 'cert-modal__backdrop--closing' : ''}`}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={`Certificate: ${cert.title}`}
    >
      <div className="cert-modal">
        {/* Header */}
        <div className="cert-modal__header">
          <span className="cert-modal__header-icon">{cert.icon}</span>
          <div className="cert-modal__header-info">
            <div className="cert-modal__title" title={cert.title}>{cert.title}</div>
            <div className="cert-modal__issuer">{cert.issuer}</div>
          </div>
          <button className="cert-modal__close" onClick={handleClose} aria-label="Close modal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="cert-modal__body">
          {/* PDF viewer */}
          {fileType === 'pdf' && (
            <div className="cert-modal__pdf-wrapper">
              <iframe
                className="cert-modal__pdf"
                src={`${cert.file}#toolbar=0&navpanes=0&scrollbar=0`}
                title={`${cert.title} certificate`}
              />
            </div>
          )}

          {/* Image viewer */}
          {fileType === 'image' && !imgError && (
            <div
              className={`cert-modal__image-wrapper ${zoomed ? 'cert-modal__image-wrapper--zoomed' : ''}`}
              onClick={() => setZoomed((z) => !z)}
            >
              <img
                className="cert-modal__image"
                src={cert.file}
                alt={`${cert.title} certificate`}
                onError={() => setImgError(true)}
                draggable={false}
              />
            </div>
          )}

          {/* Fallback if image errors or file type unknown */}
          {(fileType === 'unknown' || (fileType === 'image' && imgError)) && (
            <div className="cert-modal__placeholder">
              <span className="cert-modal__placeholder-icon">🖼️</span>
              <span className="cert-modal__placeholder-text">
                Certificate file not found.<br />
                Add it at: <strong>public{cert.file}</strong>
              </span>
            </div>
          )}

          <div className="cert-modal__description">
            {cert.description}
          </div>
        </div>

        {/* Navigation */}
        <div className="cert-modal__nav">
          <button
            className="cert-modal__nav-btn"
            onClick={onPrev}
            disabled={certIndex <= 0}
            aria-label="Previous certificate"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Prev
          </button>

          <span className="cert-modal__nav-counter">
            {certIndex + 1} / {totalCerts}
          </span>

          <button
            className="cert-modal__nav-btn"
            onClick={onNext}
            disabled={certIndex >= totalCerts - 1}
            aria-label="Next certificate"
          >
            Next
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Keyboard hints — desktop only */}
        <div className="cert-modal__kbd-hint">
          <span><kbd>←</kbd><kbd>→</kbd> Navigate</span>
          <span><kbd>Esc</kbd> Close</span>
        </div>
      </div>
    </div>
  );
}
