// One requestAnimationFrame loop for the whole site. Modules register
// callbacks instead of running their own loops.
const callbacks = new Set();
let running = false;

function frame(time) {
  for (const cb of callbacks) cb(time);
  if (callbacks.size) requestAnimationFrame(frame);
  else running = false;
}

export function onFrame(cb) {
  callbacks.add(cb);
  if (!running) { running = true; requestAnimationFrame(frame); }
  return () => callbacks.delete(cb);
}
