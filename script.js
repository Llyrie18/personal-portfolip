/* Replace these values with your real public contact details. Empty values keep
   explicit placeholders instead of creating fabricated profile links. */
const portfolio = {
  email: '',
  github: '',
  linkedin: '',
  repositories: { labtrack: '', grades: '', library: '', cafe: '', webproject: '' }
};

// Set each value to Beginner, Intermediate, or Advanced after self-assessment.
// Empty values deliberately show an unrated bar rather than an invented level.
const skillProficiency = {
  HTML5: 'Advanced',
  CSS3: 'Advanced',
  JavaScript: 'Advanced',
  Java: 'Intermediate',
  Python: 'Intermediate',
  PHP: 'Advanced',
  MySQL: 'Intermediate',
  Git: 'Intermediate',
  'VS Code': 'Intermediate',
  'Android Studio': 'Intermediate'
};
const proficiencySteps = { Beginner: 1, Intermediate: 2, Advanced: 3 };
document.querySelectorAll('.skill-tile').forEach(tile => {
  const name = tile.querySelector('span').textContent;
  const configuredLevel = skillProficiency[name];
  const level = Object.hasOwn(proficiencySteps, configuredLevel) ? configuredLevel : 'Not rated';
  const track = document.createElement('div');
  track.className = 'proficiency-track';
  track.setAttribute('role', 'img');
  track.setAttribute('aria-label', `${name} proficiency: ${level}`);
  const fill = document.createElement('span');
  fill.className = 'proficiency-fill';
  fill.style.width = `${((proficiencySteps[level] || 0) / 3) * 100}%`;
  track.append(fill);
  const label = document.createElement('span');
  label.className = 'proficiency-label';
  label.textContent = level;
  tile.append(track, label);
});

const root = document.documentElement;
// Keep recognizable icons visible when the external icon font is unavailable.
const iconFallbacks = { 'fa-code': '</>', 'fa-android': 'A', 'fa-html5': '5', 'fa-css3-alt': '3', 'fa-js': 'JS', 'fa-java': '♨', 'fa-python': 'Py', 'fa-php': 'php', 'fa-database': '▤', 'fa-git-alt': '◇', 'fa-graduation-cap': '◇', 'fa-building-columns': '⌂', 'fa-calendar': '▦', 'fa-award': '☆', 'fa-certificate': '▧', 'fa-envelope': '✉', 'fa-github': 'GH', 'fa-linkedin-in': 'in', 'fa-location-dot': '⌖' };
document.querySelectorAll('i[class*="fa-"]').forEach(icon => {
  const key = Object.keys(iconFallbacks).find(name => icon.classList.contains(name));
  icon.dataset.symbol = iconFallbacks[key] || '•';
});
root.classList.add('fallback-icons');
if (document.fonts) document.fonts.ready.then(() => {
  const iconFontsLoaded = [...document.fonts].some(font => font.family.includes('Font Awesome') && font.status === 'loaded');
  if (iconFontsLoaded) root.classList.remove('fallback-icons');
});
const themeButton = document.querySelector('#theme-toggle');
let storedTheme;
try { storedTheme = localStorage.getItem('portfolio-theme'); } catch { /* Storage may be blocked. */ }
function setTheme(theme) {
  root.dataset.theme = theme;
  themeButton.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
  themeButton.firstElementChild.textContent = theme === 'dark' ? '☀' : '☾';
}
setTheme(storedTheme === 'dark' ? 'dark' : 'light');
themeButton.addEventListener('click', () => {
  setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
  try { localStorage.setItem('portfolio-theme', root.dataset.theme); } catch { /* Keep the session preference. */ }
});

const navigation = document.querySelector('#navigation');
const menuButton = document.querySelector('#menu-toggle');
function closeMenu() { navigation.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Open navigation'); }
menuButton.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && navigation.classList.contains('open')) { closeMenu(); menuButton.focus(); } });
document.addEventListener('click', event => { if (!event.target.closest('.header')) closeMenu(); });
window.matchMedia('(min-width: 768px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

// One scroll calculation consistently selects the last section above the header.
const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...navigation.querySelectorAll('a')];
const topButton = document.querySelector('#back-to-top');
let scrollPending = false;
function updateScroll() {
  let current = sections[0].id;
  for (const section of sections) if (section.getBoundingClientRect().top <= 160) current = section.id;
  if (window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) current = 'contact';
  navLinks.forEach(link => {
    const active = link.hash === `#${current}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
  });
  topButton.hidden = window.scrollY < 500;
  scrollPending = false;
}
window.addEventListener('scroll', () => { if (!scrollPending) { scrollPending = true; requestAnimationFrame(updateScroll); } }, { passive: true });
window.addEventListener('resize', updateScroll);
updateScroll();
topButton.addEventListener('click', () => { document.querySelector('.brand').focus({ preventScroll: true }); window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); });

const projects = {
  cafe: { title: 'Café Website', description: 'Website available at caferecontre.vercel.app. The official project title, description, and contribution details have not yet been provided.', scope: ['Project features and your contribution: to be added.'], technologies: ['Technology stack to be provided'], liveUrl: 'https://caferecontre.vercel.app/' },
  webproject: { title: 'Web Project', description: 'Website available at vercel-live-20261031-182539.vercel.app. The project title, description, and contribution details have not yet been provided.', scope: ['Project features and your contribution: to be added.'], technologies: ['Technology stack to be provided'], liveUrl: 'https://vercel-live-20261031-182539.vercel.app/' },
  labtrack: { title: 'LabTrack — RFID-Based Computer Laboratory Tracking System', description: 'A computer laboratory monitoring system that uses RFID technology to authenticate students, track computer usage, and help administrators manage laboratory activities.', scope: ['RFID-based student authentication', 'Computer usage and laboratory activity tracking', 'Administrative monitoring of laboratory records'], technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'RFID', 'Arduino / ESP32'] },
  grades: { title: 'Student Grade Management System', description: 'A Java-based application designed to manage student information, subjects, and academic grades using object-oriented programming principles.', scope: ['Organize student information and subjects', 'Manage academic grade records', 'Apply object-oriented programming to a structured application'], technologies: ['Java', 'Object-Oriented Programming'] },
  library: { title: 'Library Management System', description: 'A Java-based application that manages books, library members, borrowing records, and book returns through a structured management interface.', scope: ['Organize books and library members', 'Maintain borrowing and return records', 'Present library operations through a structured interface'], technologies: ['Java', 'Object-Oriented Programming'] }
};
function validPublicUrl(value) {
  try { return new URL(value).protocol === 'https:'; } catch { return false; }
}
const dialog = document.querySelector('#project-dialog');
let dialogTrigger;
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
  const project = projects[button.dataset.project];
  dialogTrigger = button;
  document.querySelector('#dialog-title').textContent = project.title;
  document.querySelector('#dialog-description').textContent = project.description;
  const sourceImage = button.closest('article').querySelector('img');
  const modalImage = document.querySelector('#dialog-image');
  const fallbackImages = { labtrack: 'assets/images/project1.svg', grades: 'assets/images/project2.svg', library: 'assets/images/project3.svg', cafe: 'assets/images/cafe-website.svg', webproject: 'assets/images/web-project.svg' };
  modalImage.onerror = () => { modalImage.onerror = null; modalImage.src = fallbackImages[button.dataset.project]; };
  modalImage.src = sourceImage.currentSrc || sourceImage.src;
  modalImage.alt = sourceImage.alt;
  const scope = document.querySelector('#dialog-scope');
  scope.replaceChildren(...project.scope.map(text => { const item = document.createElement('li'); item.textContent = text; return item; }));
  document.querySelector('#dialog-technologies').replaceChildren(...project.technologies.map(text => { const tag = document.createElement('span'); tag.textContent = text; return tag; }));
  const repository = document.querySelector('#dialog-repository');
  let liveWebsite = document.querySelector('#dialog-live');
  if (!liveWebsite) {
    liveWebsite = document.createElement('p');
    liveWebsite.id = 'dialog-live';
    repository.before(liveWebsite);
  }
  liveWebsite.replaceChildren();
  liveWebsite.hidden = !validPublicUrl(project.liveUrl);
  if (!liveWebsite.hidden) {
    const link = document.createElement('a');
    link.href = project.liveUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.className = 'button primary';
    link.textContent = 'Visit Live Website ↗';
    link.setAttribute('aria-label', 'Visit live website (opens in a new tab)');
    liveWebsite.append(link);
  }
  repository.textContent = 'Repository URL has not been provided.';
  const url = portfolio.repositories[button.dataset.project];
  if (validPublicUrl(url)) { const link = document.createElement('a'); link.href = url; link.textContent = 'View GitHub repository ↗'; repository.replaceChildren(link); }
  dialog.showModal();
  document.body.style.overflow = 'hidden';
}));
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { const box = dialog.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close(); });
dialog.addEventListener('close', () => {
  document.body.style.overflow = '';
  // Native dialogs normally restore focus. Only supply a fallback if focus was
  // lost; a queued close event must not pull focus away from another control.
  if (document.activeElement === document.body || dialog.contains(document.activeElement)) dialogTrigger?.focus();
});

['github', 'linkedin'].forEach(profile => {
  if (!validPublicUrl(portfolio[profile])) return;
  document.querySelectorAll(`[data-profile="${profile}"]`).forEach(link => { link.href = portfolio[profile]; link.setAttribute('aria-label', `${profile === 'github' ? 'GitHub' : 'LinkedIn'} profile`); });
  const contactLink = document.createElement('a'); contactLink.href = portfolio[profile]; contactLink.textContent = portfolio[profile];
  document.querySelector(`#contact-${profile}`).replaceChildren(contactLink);
});
const configuredEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(portfolio.email) && !/[\r\n]/.test(portfolio.email);
if (configuredEmail) {
  const link = document.createElement('a'); link.href = `mailto:${portfolio.email}`; link.textContent = portfolio.email;
  document.querySelector('#contact-email').replaceChildren(link);
  document.querySelector('#form-help').textContent = 'This form opens a draft in your email app. Review it there and send when ready.';
}
const form = document.querySelector('#contact-form');
const fields = [...form.querySelectorAll('input, textarea')];
function validateField(field) {
  let error = '';
  if (!field.value.trim()) error = 'Please complete this field.';
  else if (field.type === 'email' && !field.validity.valid) error = 'Enter a valid email address.';
  else if (field.value.length > field.maxLength) error = 'Please shorten this entry.';
  field.setAttribute('aria-invalid', String(Boolean(error)));
  document.querySelector(`#${field.id}-error`).textContent = error;
  return !error;
}
fields.forEach(field => field.addEventListener('input', () => { if (field.getAttribute('aria-invalid') === 'true') validateField(field); }));
form.addEventListener('submit', event => {
  event.preventDefault();
  const results = fields.map(validateField);
  const status = document.querySelector('#form-status');
  if (results.includes(false)) { status.textContent = 'Please check the highlighted fields.'; fields[results.indexOf(false)].focus(); return; }
  if (!configuredEmail) { status.textContent = 'Contact is not configured yet. The portfolio owner needs to add their email address in script.js. No message was sent.'; return; }
  const subject = encodeURIComponent(form.elements.subject.value.trim());
  const body = encodeURIComponent(`From: ${form.elements.name.value.trim()}\nReply email: ${form.elements.email.value.trim()}\n\n${form.elements.message.value.trim()}`);
  window.location.href = `mailto:${portfolio.email}?subject=${subject}&body=${body}`;
  status.textContent = 'An email draft was requested. If your email app opens, review and send the draft there. This website has not sent your message.';
});
document.querySelector('#year').textContent = new Date().getFullYear();

if (configuredEmail) document.querySelectorAll('[data-email]').forEach(link => { link.href = `mailto:${portfolio.email}`; });
