// Contact form: inline validation, the project/call toggle, package
// prefill, submission to a configurable endpoint (or demo mode) and the
// success state.
import { config } from './env.js';
import { scrollToEl } from './scroll.js';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function smsLink(to, d) {
  const lines = [
    d.intent === 'call' ? 'Hi FD Web Designs, I would like to book a call.' : 'Hi FD Web Designs, I would like to start a website project.',
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
  return `sms:${to}?&body=${encodeURIComponent(lines.join('\n'))}`;
}

export function initForm() {
  const form = document.querySelector('[data-form]');
  if (!form) return;
  const success = document.querySelector('[data-form-success]');
  const status = form.querySelector('[data-form-status]');
  const submitLabel = form.querySelector('[data-submit-label]');
  const intent = form.querySelector('[data-intent]');

  // Project vs. call toggle changes the button wording.
  const setIntent = (value) => {
    intent.value = value;
    submitLabel.textContent = value === 'call' ? 'Request My Call' : 'Start My Project';
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

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = '';
    const results = Object.keys(rules).map((n) => [n, check(n)]);
    const firstBad = results.find(([, ok]) => !ok);
    if (firstBad) { form.elements[firstBad[0]].focus(); return; }
    if (form.elements.company_site.value) return; // honeypot: likely a bot

    const data = Object.fromEntries(new FormData(form));
    data.looking_for = [...form.querySelectorAll('[name="looking_for"]:checked')].map((c) => c.value);
    delete data.company_site;

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
      // The request goes to our phone as a text, sent from the visitor's own messages app.
      if (config.form?.smsTo) window.location.href = smsLink(config.form.smsTo, data);
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
  // the form with "Book a call" selected.
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
