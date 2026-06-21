import { useEffect, useRef, useState, useCallback } from 'react';
import './PixelCharacter.css';

/*
 * Pixel Character — The star attraction
 * - L-shaped movement: walks HORIZONTAL first, then VERTICAL
 * - This makes left/right AND up/down clearly visible
 * - Waypoints across every section
 * - 4-direction body views
 * - Speech bubbles + hover wave
 */

const SPEED = 1.3;
const CHAR_SIZE = 48;
const PAUSE_MIN = 2000;
const PAUSE_MAX = 4000;
const HOVER_RADIUS = 130;

const SECTION_MESSAGES = {
  hero: ['👋 Hey there!', 'Welcome!', '✨ Hi!'],
  about: ['📖 Cool story!', '🤔 Interesting...'],
  skills: ['💪 Nice skills!', '🚀 MERN Stack!'],
  projects: ['🔥 Great work!', '💻 Impressive!'],
  education: ['🎓 Smart!', '📚 Keep going!'],
  achievements: ['🏆 Wow!', '⭐ Amazing!'],
  contact: ['📬 Say hi!', '💌 Reach out!'],
};

function getSectionAtY(y) {
  const sections = ['hero', 'about', 'skills', 'projects', 'education', 'achievements', 'contact'];
  for (const id of sections) {
    const el = document.getElementById(id);
    if (!el) continue;
    const rect = el.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    if (y >= top && y <= top + rect.height) return id;
  }
  return null;
}

function generateWaypoints() {
  const sections = ['hero', 'about', 'skills', 'projects', 'education', 'achievements', 'contact'];
  const waypoints = [];
  const pageW = document.documentElement.clientWidth;
  const isMobile = pageW < 768;
  // Tighter margins on mobile to avoid edge overflow
  const margin = isMobile ? 40 : 80;

  for (const id of sections) {
    const el = document.getElementById(id);
    if (!el) continue;
    const rect = el.getBoundingClientRect();
    const top = rect.top + window.scrollY;

    // Fewer waypoints per section on mobile
    const count = isMobile ? 1 + Math.floor(Math.random() * 2) : 2 + Math.floor(Math.random() * 2);
    for (let i = 0; i < count; i++) {
      waypoints.push({
        x: margin + Math.random() * Math.max(pageW - margin * 2, 60),
        y: top + margin + Math.random() * Math.max(rect.height - margin * 2, 40),
        section: id,
      });
    }
  }

  // Shuffle so it doesn't go section-by-section in order
  for (let i = waypoints.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [waypoints[i], waypoints[j]] = [waypoints[j], waypoints[i]];
  }
  return waypoints;
}

function randomMsg(section) {
  const msgs = SECTION_MESSAGES[section];
  if (!msgs) return null;
  return msgs[Math.floor(Math.random() * msgs.length)];
}

// Movement phases: HORIZONTAL first, then VERTICAL
const PHASE_H = 'horizontal'; // walk left/right
const PHASE_V = 'vertical';   // walk up/down

export default function PixelCharacter() {
  const charRef = useRef(null);
  const animRef = useRef(null);
  const timerRef = useRef(null);
  const wpsRef = useRef([]);
  const wpIdxRef = useRef(0);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const phaseRef = useRef(PHASE_H); // start with horizontal

  const sRef = useRef({
    x: 200, y: 300,
    facing: 'right',
    idle: false,
    waving: false,
  });

  const [facing, setFacing] = useState('right');
  const [idle, setIdle] = useState(false);
  const [waving, setWaving] = useState(false);
  const [frame, setFrame] = useState(0);
  const [bubble, setBubble] = useState(null);
  const fcRef = useRef(0);

  // Mouse tracker (desktop)
  useEffect(() => {
    const fn = (e) => { mouseRef.current = { x: e.pageX, y: e.pageY }; };
    document.addEventListener('mousemove', fn, { passive: true });
    return () => document.removeEventListener('mousemove', fn);
  }, []);

  // Tap interaction (mobile) — tap anywhere near the character to wave
  useEffect(() => {
    const handleTap = (e) => {
      const touch = e.touches ? e.touches[0] : e;
      const tx = touch.pageX, ty = touch.pageY;
      const s = sRef.current;
      const dist = Math.sqrt((s.x - tx) ** 2 + (s.y - ty) ** 2);

      if (dist < 100 && !s.waving) {
        s.waving = true;
        s.idle = true;
        const mdx = tx - s.x, mdy = ty - s.y;
        s.facing = Math.abs(mdx) > Math.abs(mdy) ? (mdx < 0 ? 'left' : 'right') : (mdy < 0 ? 'up' : 'down');
        setFacing(s.facing);
        setWaving(true);
        setIdle(true);
        setBubble('👋 Hi!');
        setTimeout(() => {
          s.waving = false; s.idle = false;
          setWaving(false); setIdle(false); setBubble(null);
        }, 1500);
      }
    };
    document.addEventListener('touchstart', handleTap, { passive: true });
    return () => document.removeEventListener('touchstart', handleTap);
  }, []);

  const nextWaypoint = useCallback(() => {
    const wps = wpsRef.current;
    if (!wps.length) return;
    wpIdxRef.current = (wpIdxRef.current + 1) % wps.length;
    if (wpIdxRef.current === 0) wpsRef.current = generateWaypoints();
    phaseRef.current = PHASE_H; // always start with horizontal
    sRef.current.idle = false;
    setIdle(false);
    setBubble(null);
  }, []);

  useEffect(() => {
    const init = setTimeout(() => {
      wpsRef.current = generateWaypoints();
      if (wpsRef.current.length) {
        sRef.current.x = wpsRef.current[0].x;
        sRef.current.y = wpsRef.current[0].y;
        wpIdxRef.current = 1;
      }
    }, 600);

    const loop = () => {
      const s = sRef.current;
      const wps = wpsRef.current;

      if (!wps.length) { animRef.current = requestAnimationFrame(loop); return; }

      const target = wps[wpIdxRef.current];
      if (!target) { animRef.current = requestAnimationFrame(loop); return; }

      // --- HOVER WAVE ---
      const mx = mouseRef.current.x, my = mouseRef.current.y;
      const dMouse = Math.sqrt((s.x - mx) ** 2 + (s.y - my) ** 2);

      if (dMouse < HOVER_RADIUS && !s.waving && !s.idle) {
        s.waving = true;
        s.idle = true;
        // Face toward mouse
        const mdx = mx - s.x, mdy = my - s.y;
        s.facing = Math.abs(mdx) > Math.abs(mdy) ? (mdx < 0 ? 'left' : 'right') : (mdy < 0 ? 'up' : 'down');
        setFacing(s.facing);
        setWaving(true);
        setIdle(true);
        setBubble('👋 Hi!');
        setTimeout(() => {
          s.waving = false; s.idle = false;
          setWaving(false); setIdle(false); setBubble(null);
        }, 1500);
        animRef.current = requestAnimationFrame(loop);
        return;
      }

      // --- IDLE ---
      if (s.idle || s.waving) {
        fcRef.current++;
        if (fcRef.current >= 12) { fcRef.current = 0; setFrame(p => (p + 1) % 4); }
        if (charRef.current) charRef.current.style.transform = `translate(${s.x}px, ${s.y}px)`;
        animRef.current = requestAnimationFrame(loop);
        return;
      }

      // --- MOVEMENT (L-shaped: horizontal first, then vertical) ---
      const phase = phaseRef.current;
      let moveX = 0, moveY = 0;
      let arrived = false;

      if (phase === PHASE_H) {
        // Walk horizontally toward target X
        const dx = target.x - s.x;
        if (Math.abs(dx) < 3) {
          // Horizontal done, switch to vertical
          s.x = target.x;
          phaseRef.current = PHASE_V;
        } else {
          moveX = Math.sign(dx) * SPEED;
          s.x += moveX;
          s.facing = dx < 0 ? 'left' : 'right';
        }
      } else {
        // Walk vertically toward target Y
        const dy = target.y - s.y;
        if (Math.abs(dy) < 3) {
          // Arrived at waypoint!
          s.y = target.y;
          arrived = true;
        } else {
          moveY = Math.sign(dy) * SPEED;
          s.y += moveY;
          s.facing = dy < 0 ? 'up' : 'down';
        }
      }

      // Boundary clamping — tighter on mobile to prevent overflow
      const vw = document.documentElement.clientWidth;
      const safeMargin = vw < 768 ? 10 : 20;
      const maxX = vw - CHAR_SIZE - safeMargin;
      const maxY = document.documentElement.scrollHeight - CHAR_SIZE - safeMargin;
      s.x = Math.max(safeMargin, Math.min(s.x, maxX));
      s.y = Math.max(80, Math.min(s.y, maxY));

      // Update facing state
      setFacing(s.facing);

      // --- ARRIVED AT WAYPOINT ---
      if (arrived) {
        s.idle = true;
        s.facing = 'down'; // show face when stopping
        setFacing('down');
        setIdle(true);

        const section = getSectionAtY(s.y);
        const msg = section ? randomMsg(section) : null;
        if (msg) setBubble(msg);

        const pause = PAUSE_MIN + Math.random() * (PAUSE_MAX - PAUSE_MIN);
        timerRef.current = setTimeout(() => {
          setBubble(null);
          nextWaypoint();
        }, pause);
      }

      // Update DOM
      if (charRef.current) charRef.current.style.transform = `translate(${s.x}px, ${s.y}px)`;

      // Walking frame animation
      fcRef.current++;
      if (fcRef.current >= 8) { fcRef.current = 0; setFrame(p => (p + 1) % 4); }

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);

    // --- RESIZE HANDLER: regenerate waypoints & re-clamp position ---
    let resizeTimer = null;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const s = sRef.current;
        const vw = document.documentElement.clientWidth;
        const safeMargin = vw < 768 ? 10 : 20;

        // Re-clamp current position to new viewport
        s.x = Math.max(safeMargin, Math.min(s.x, vw - CHAR_SIZE - safeMargin));

        // Regenerate waypoints for new screen size
        wpsRef.current = generateWaypoints();
        wpIdxRef.current = 0;
        phaseRef.current = PHASE_H;

        // Unstick character if it was idle
        if (s.idle && !s.waving) {
          s.idle = false;
          setIdle(false);
          setBubble(null);
          clearTimeout(timerRef.current);
        }
      }, 300); // debounce 300ms
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(init);
      cancelAnimationFrame(animRef.current);
      clearTimeout(timerRef.current);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, [nextWaypoint]);

  const walkClass = waving ? 'waving' : idle ? 'idle' : 'walking';
  const facingClass = `facing-${facing}`;

  return (
    <div className="pixel-character" ref={charRef} aria-hidden="true">
      {bubble && (
        <div className="pixel-bubble"><span>{bubble}</span></div>
      )}
      <div className={`pixel-person ${walkClass} ${facingClass} frame-${frame}`}>
        <div className="pixel-head" />
        <div className="pixel-body" />
        <div className="pixel-legs">
          <div className="pixel-leg pixel-leg-left" />
          <div className="pixel-leg pixel-leg-right" />
        </div>
      </div>
    </div>
  );
}
