import { Eyebrow, SplitHeading, Button } from './Button.js';
import { icon } from './Icons.js';
import { esc, each, isPlaceholder } from '../lib/html.js';

const Field = ({ id, label, type = 'text', required = false, autocomplete = '', inputmode = '', wide = false }) => `
<div class="field${wide ? ' field--wide' : ''}">
  <input class="field__input" id="${id}" name="${id}" type="${type}" placeholder=" "${required ? ' required aria-required="true"' : ''}${autocomplete ? ` autocomplete="${autocomplete}"` : ''}${inputmode ? ` inputmode="${inputmode}"` : ''} aria-describedby="${id}-error">
  <label class="field__label" for="${id}">${esc(label)}${required ? ' <span class="req" aria-hidden="true">*</span>' : ''}</label>
  <span class="field__line" aria-hidden="true"></span>
  <p class="field__error" id="${id}-error" aria-live="polite"></p>
</div>`;

const Chips = ({ name, legend, options, type = 'checkbox' }) => `
<fieldset class="chips field--wide">
  <legend class="chips__legend">${esc(legend)}</legend>
  <div class="chips__list">
    ${each(options, (o, i) => `
    <label class="chip">
      <input type="${type}" name="${name}" value="${esc(o)}" id="${name}-${i}">
      <span>${esc(o)}</span>
    </label>`)}
  </div>
</fieldset>`;

const ContactLine = ({ label, value, href, iconName }) => {
  const filled = !isPlaceholder(value);
  return `
  <li class="contact__line">
    <span class="contact__label">${icon(iconName)}${esc(label)}</span>
    ${filled && href ? `<a class="contact__value" href="${href}">${esc(value)}</a>` : `<span class="contact__value${filled ? '' : ' is-placeholder'}">${esc(value)}</span>`}
  </li>`;
};

export const ContactForm = ({ site, formOptions }) => `
<section class="contact section" id="contact" aria-labelledby="contact-title">
  <div class="container contact__grid">
    <div class="contact__intro">
      ${Eyebrow('Contact')}
      ${SplitHeading(["Let's build your", 'next website.'], { id: 'contact-title' })}
      <p class="lede" data-reveal>Tell us about your business, your goals, and what you want your new website to accomplish.</p>

      <div class="contact__card" data-reveal>
        <p class="contact__brand">${esc(site.name.toUpperCase())}</p>
        <p class="contact__descriptor">${esc(site.descriptor)}</p>
        <ul class="contact__lines" role="list">
          ${ContactLine({ label: 'Email', value: site.email, href: `mailto:${site.email}`, iconName: 'mail' })}
          ${each(site.phones, (ph) => ContactLine({ label: 'Phone', value: ph.display, href: `tel:${ph.tel}`, iconName: 'phone' }))}
          ${ContactLine({ label: 'Service area', value: site.serviceArea, iconName: 'globe' })}
        </ul>
        <ul class="social-links" role="list">
          ${each(site.socials, (s) => `<li><a href="${s.href}" target="_blank" rel="noopener">${icon(s.icon)}<span><b>${esc(s.label)}</b> ${esc(s.handle || '')}</span><span class="sr-only"> (opens in a new tab)</span></a></li>`)}
        </ul>
      </div>

      <div class="book-card" data-reveal>
        <div>
          <p class="book-card__title">Prefer to talk it through?</p>
          <p class="book-card__text">Call ${esc(site.phones[0].display)} to schedule a free meeting. No pressure, no jargon.</p>
        </div>
        ${Button({ label: 'Call to Schedule a Meeting', href: `tel:${site.phones[0].tel}`, variant: 'ghost', iconName: 'phone' })}
      </div>
    </div>

    <div class="form-wrap" data-reveal>
      <form class="form" id="project-form" novalidate data-form>
        <input type="hidden" name="intent" value="project" data-intent>
        <div class="form__hp" aria-hidden="true"><label for="company_site">Leave this empty</label><input id="company_site" name="company_site" tabindex="-1" autocomplete="off"></div>

        <div class="form__intent" role="radiogroup" aria-label="How would you like to start?">
          <label class="seg"><input type="radio" name="start" value="project" checked data-start><span>Start a project</span></label>
          <label class="seg"><input type="radio" name="start" value="call" data-start><span>Schedule a meeting</span></label>
        </div>

        <div class="form__grid">
          ${Field({ id: 'name', label: 'Full name', required: true, autocomplete: 'name' })}
          ${Field({ id: 'business', label: 'Business name', autocomplete: 'organization' })}
          ${Field({ id: 'email', label: 'Email', type: 'email', required: true, autocomplete: 'email' })}
          ${Field({ id: 'phone', label: 'Phone number', type: 'tel', autocomplete: 'tel', inputmode: 'tel' })}

          <div class="field field--select">
            <select class="field__input" id="business_type" name="business_type">
              <option value="">Select one</option>
              ${each(formOptions.businessTypes, (o) => `<option>${esc(o)}</option>`)}
            </select>
            <label class="field__label" for="business_type">Business type</label>
            <span class="field__line" aria-hidden="true"></span>
            ${icon('arrowDown', 'field__chev')}
          </div>
          ${Field({ id: 'website', label: 'Current website (if any)', type: 'text', autocomplete: 'url', inputmode: 'url' })}

          ${Chips({ name: 'looking_for', legend: 'What are you looking for?', options: formOptions.lookingFor })}
          ${Chips({ name: 'package', legend: 'Package of interest', options: formOptions.packages, type: 'radio' })}

          <div class="field field--wide field--area">
            <textarea class="field__input" id="message" name="message" rows="4" placeholder=" " required aria-required="true" aria-describedby="message-error"></textarea>
            <label class="field__label" for="message">Tell us about your project <span class="req" aria-hidden="true">*</span></label>
            <span class="field__line" aria-hidden="true"></span>
            <p class="field__error" id="message-error" aria-live="polite"></p>
          </div>
        </div>

        <div class="form__submit">
          <button class="btn btn--primary btn--lg" type="submit" data-magnetic data-submit>
            <span class="btn__label" data-submit-label>Start My Project</span>
            <span class="btn__icon">${icon('arrow')}</span>
          </button>
          <p class="form__fine">Sends as a text to ${esc(site.form.smsDisplay)}. We reply within one business day.</p>
        </div>
        <p class="form__status" role="status" aria-live="polite" data-form-status></p>
      </form>

      <div class="form-success" data-form-success hidden tabindex="-1">
        <span class="form-success__icon">${icon('check')}</span>
        <h3>Almost done, just press send.</h3>
        <p>Your details are ready in your messages app. Press send and we'll get back to you within one business day. If nothing opened, text or call us at <a href="tel:${site.form.smsTo}">${esc(site.form.smsDisplay)}</a>.</p>
        <button class="link-arrow" type="button" data-form-reset>Send another message ${icon('arrow')}</button>
      </div>
    </div>
  </div>
</section>`;
