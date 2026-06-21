import { useEffect, useRef } from 'react';
import './CustomCursor.css';

export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    // Only on desktop
    if ('ontouchstart' in window) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMove = (e) => {
      cursor.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`;
    };

    const onDown = () => cursor.classList.add('cursor--click');
    const onUp = () => cursor.classList.remove('cursor--click');

    const onHover = () => cursor.classList.add('cursor--hover');
    const onLeave = () => cursor.classList.remove('cursor--hover');

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);

    const observer = new MutationObserver(() => {
      document.querySelectorAll('a, button, input, textarea, .card, .btn, .navbar__link').forEach((el) => {
        el.removeEventListener('mouseenter', onHover);
        el.removeEventListener('mouseleave', onLeave);
        el.addEventListener('mouseenter', onHover);
        el.addEventListener('mouseleave', onLeave);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
    document.querySelectorAll('a, button, input, textarea, .card, .btn, .navbar__link').forEach((el) => {
      el.addEventListener('mouseenter', onHover);
      el.addEventListener('mouseleave', onLeave);
    });

    document.body.classList.add('custom-cursor-active');

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      observer.disconnect();
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  return <div className="custom-cursor" ref={cursorRef} />;
}
