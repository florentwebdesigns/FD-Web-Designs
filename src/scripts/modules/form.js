// Contact form: inline validation, the project/call toggle, package
// prefill, submission to a configurable endpoint (or demo mode) and the
// success state.
import { config } from './env.js';
import { scrollToEl } from './scroll.js';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function smsText(d) {
  const lines = [
    d.intent === 'call' ? 'Hi FD Web Designs, I would like to schedule a meeting.' : 'Hi FD Web Designs, I would like to start a website project.',
    '',
    `Name: ${d.name}`,
    d.business && `Business: ${d.business}`,
    `Email: ${d.email}`,
    d.phone && `Phone: ${d.phone}`,
    d.business_type && `Business type: ${d.business_type}`,
    d.website && `Current website: ${d.website}`,
    d.looking_for.length && `Looking for: ${d.looking_for.join(', ')}`,
    d.package && `Package: ${d.package}`,
    `Details: ${d.message}`,
  ].filter((l, i) => i === 1 || Boolean(l));
  return lines.join('\n');
}
const smsLink = (to, text) => `sms:${to}?&body=${encodeURIComponent(text)}`;
const isPhone = () => matchMedia('(hover: none) and (pointer: coarse)').matches;

// Google Sheets log (docs/booking-log.gs). Form-encoded + no-cors so Apps
// Script accepts it without a CORS preflight; failures never block the visitor.
// sendBeacon first: it is built to survive the page handing off to Messages
// or the phone app, which can cancel a normal request on phones.
function logToSheet(fields) {
  const url = config.form?.sheetLog;
  if (!url) return;
  const body = new URLSearchParams({ ...fields, device: isPhone() ? 'Phone' : 'Computer', page: location.href });
  try {
    if (navigator.sendBeacon?.(url, body)) return;
  } catch { /* fall through to fetch */ }
  try {
    fetch(url, { method: 'POST', mode: 'no-cors', keepalive: true, body });
  } catch { /* logging is best-effort */ }
}

export function initForm() {
  // Every tap on a phone number (nav, contact card, footer...) is logged as a call.
  document.addEventListener('click', (e) => {
    const link = e.target.closest?.('a[href^="tel:"]');
    if (link) logToSheet({ source: 'Call button', button: link.textContent.replace(/\s+/g, ' ').trim().slice(0, 80) });
  });

  const form = document.querySelector('[data-form]');
  if (!form) return;
  const success = document.querySelector('[data-form-success]');
  const status = form.querySelector('[data-form-status]');
  const submitLabel = form.querySelector('[data-submit-label]');
  const intent = form.querySelector('[data-intent]');

  // Project vs. call toggle changes the button wording.
  const setIntent = (value) => {
    intent.value = value;
    submitLabel.textContent = value === 'call' ? 'Request a Meeting' : 'Start My Project';
    const radio = form.querySelector(`[data-start][value="${value}"]`);
    if (radio) radio.checked = true;
  };
  form.querySelectorAll('[data-start]').forEach((r) => r.addEventListener('change', () => setIntent(r.value)));

  // Validation
  const rules = {
    name: (v) => (v.trim().length >= 2 ? '' : 'Please enter your name.'),
    email: (v) => (EMAIL.test(v.trim()) ? '' : 'Please enter a valid email address, like name@business.com.'),
    phone: (v) => (!v.trim() || v.replace(/\D/g, '').length >= 7 ? '' : 'That phone number looks too short.'),
    message: (v) => (v.trim().length >= 10 ? '' : 'Tell us a little about your project (at least 10 characters).'),
  };
  const check = (name) => {
    const input = form.elements[name];
    if (!input || !rules[name]) return true;
    const msg = rules[name](input.value);
    const field = input.closest('.field');
    field?.classList.toggle('is-invalid', !!msg);
    input.setAttribute('aria-invalid', String(!!msg));
    const err = document.getElementById(`${name}-error`);
    if (err) err.textContent = msg;
    return !msg;
  };
  Object.keys(rules).forEach((name) => {
    const input = form.elements[name];
    input?.addEventListener('blur', () => input.value && check(name));
    input?.addEventListener('input', () => input.closest('.field')?.classList.contains('is-invalid') && check(name));
  });

  let smsBody = '';
  const copyBtn = document.querySelector('[data-sms-copy]');
  copyBtn?.addEventListener('click', async () => {
    const label = copyBtn.querySelector('[data-sms-copy-label]');
    try {
      await navigator.clipboard.writeText(smsBody);
      label.textContent = 'Copied';
    } catch {
      label.textContent = 'Copy failed';
    }
    setTimeout(() => { label.textContent = 'Copy Message'; }, 2500);
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = '';
    const results = Object.keys(rules).map((n) => [n, check(n)]);
    const firstBad = results.find(([, ok]) => !ok);
    if (firstBad) { form.elements[firstBad[0]].focus(); return; }
    // Honeypot: browser autofill can fill it for real people too, so a filled
    // trap only flags the request instead of silently dropping it.
    const flagged = Boolean(form.elements.fd_hp.value);

    const data = Object.fromEntries(new FormData(form));
    data.looking_for = [...form.querySelectorAll('[name="looking_for"]:checked')].map((c) => c.value);
    delete data.fd_hp;

    form.classList.add('is-sending');
    submitLabel.dataset.label = submitLabel.textContent;
    submitLabel.textContent = 'Sending…';
    try {
      const endpoint = config.form?.endpoint;
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
      }
      logToSheet({
        source: (data.intent === 'call' ? 'Meeting request' : 'Project request') + (flagged ? ' (spam check)' : ''),
        name: data.name, business: data.business || '', email: data.email, phone: data.phone || '',
        business_type: data.business_type || '', website: data.website || '',
        looking_for: data.looking_for.join(', '), package: data.package || '', message: data.message,
      });
      // The request goes to our phone as a text, sent from the visitor's own
      // messages app. Phones open it right away; everyone gets a Send Text Now
      // button (a real link, which browsers reliably hand to Messages) and a
      // copy fallback for devices that can't text.
      if (config.form?.smsTo) {
        smsBody = smsText(data);
        const href = smsLink(config.form.smsTo, smsBody);
        const send = document.querySelector('[data-sms-send]');
        if (send) send.href = href;
        // Short pause so the Sheet log leaves before the phone opens Messages.
        if (isPhone()) setTimeout(() => { window.location.href = href; }, 350);
      }
      form.hidden = true;
      success.hidden = false;
      success.focus();
    } catch (err) {
      status.textContent = 'Your message could not be sent. Check your connection and try again, or email us directly.';
    } finally {
      form.classList.remove('is-sending');
      submitLabel.textContent = submitLabel.dataset.label;
    }
  });

  document.querySelector('[data-form-reset]')?.addEventListener('click', () => {
    form.reset();
    setIntent('project');
    success.hidden = true;
    form.hidden = false;
    form.elements.name.focus();
  });

  // "Choose <plan>" buttons prefill the message.
  document.querySelectorAll('[data-plan]').forEach((btn) => btn.addEventListener('click', () => {
    setIntent('project');
    const pkg = form.querySelector(`[name="package"][value="${btn.dataset.plan}"]`);
    if (pkg) pkg.checked = true;
    const msg = form.elements.message;
    const line = `I'm interested in the ${btn.dataset.plan} package.`;
    if (!msg.value.includes(line)) msg.value = msg.value ? `${line}\n\n${msg.value}` : `${line} `;
  }));

  // Booking buttons: open the scheduling link if configured, otherwise jump to
  // the form with "Schedule a meeting" selected.
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-book]');
    if (!btn) return;
    const url = config.booking?.url;
    e.preventDefault();
    if (url) { window.open(url, '_blank', 'noopener'); return; }
    setIntent('call');
    const contact = document.getElementById('contact');
    if (contact) scrollToEl(contact, { onComplete: () => form.elements.name.focus({ preventScroll: true }) });
  });
}
