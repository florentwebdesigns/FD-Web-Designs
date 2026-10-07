// Hero background: a slow perspective "wave field" of dots with a few
// drifting particles. It reacts gently to the pointer, pauses off-screen and
// in background tabs, and renders one still frame for reduced motion.
import { motionOK, finePointer, isMobile } from './env.js';

export function initHeroField() {
  const canvas = document.querySelector('[data-hero-field]');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let w = 0, h = 0, dpr = 1, cols = 0, rows = 0;
  let particles = [];
  let running = false, visible = true, raf = 0;
  const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

  function resize() {
    const r = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    w = r.width; h = r.height;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const mobile = isMobile();
    cols = mobile ? 26 : 56;
    rows = mobile ? 16 : 24;
    const count = mobile ? 18 : 46;
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * w, y: Math.random() * h * 0.8,
      r: Math.random() * 1.2 + 0.3,
      vx: (Math.random() - 0.5) * 0.12, vy: -Math.random() * 0.15 - 0.03,
      a: Math.random() * 0.5 + 0.15,
    }));
  }

  function draw(t) {
    ctx.clearRect(0, 0, w, h);
    mouse.x += (mouse.tx - mouse.x) * 0.06;
    mouse.y += (mouse.ty - mouse.y) * 0.06;

    // Wave field: rows recede toward a horizon at 45% height.
    const horizon = h * 0.5;
    const time = t * 0.00035;
    for (let j = 0; j < rows; j++) {
      const z = j / (rows - 1);              // 0 = far, 1 = near
      const depth = Math.pow(z, 1.7);
      const yBase = horizon + depth * (h - horizon) * 0.92;
      const spread = 0.35 + depth * 1.25;      // near rows are wider
      for (let i = 0; i < cols; i++) {
        const u = i / (cols - 1) - 0.5;
        let x = w * 0.62 + u * w * spread;
        const wave = Math.sin(u * 7 + time * 2 + z * 4) * 0.5 + Math.sin(u * 3 - time * 1.4 + z * 9) * 0.5;
        let y = yBase - wave * (8 + depth * 42);
        const dx = x - mouse.x, dy = y - mouse.y;
        const d2 = dx * dx + dy * dy;
        const lift = d2 < 40000 ? (1 - d2 / 40000) : 0;
        y -= lift * 18;
        if (x < -10 || x > w + 10) continue;
        const alpha = (0.22 + depth * 0.78) * (0.62 + wave * 0.3) + lift * 0.5;
        const size = 1 + depth * 1.7;
        // Blend from violet (far) to cyan (near).
        const r = Math.round(140 - 61 * depth), g = Math.round(110 + 106 * depth), b = 255;
        ctx.fillStyle = `rgba(${r},${g},${b},${Math.max(0, alpha).toFixed(3)})`;
        ctx.fillRect(x - size / 2, y - size / 2, size, size);
      }
    }

    // Drifting particles.
    for (const p of particles) {
      p.x += p.vx; p.y += p.vy;
      if (p.y < -10) { p.y = h * 0.85; p.x = Math.random() * w; }
      if (p.x < -10) p.x = w + 10; else if (p.x > w + 10) p.x = -10;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(190, 210, 255, ${p.a})`;
      ctx.fill();
    }
  }

  function loop(t) {
    draw(t);
    if (running) raf = requestAnimationFrame(loop);
  }
  const start = () => { if (!running && visible && !document.hidden && motionOK()) { running = true; raf = requestAnimationFrame(loop); } };
  const stop = () => { running = false; cancelAnimationFrame(raf); };

  resize();
  if (!motionOK()) { draw(0); return; }

  new IntersectionObserver(([en]) => { visible = en.isIntersecting; visible ? start() : stop(); }).observe(canvas);
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  let rt;
  window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(resize, 150); });
  if (finePointer.matches) {
    canvas.parentElement.parentElement.addEventListener('pointermove', (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - r.left; mouse.ty = e.clientY - r.top;
    });
  }
  start();
}
