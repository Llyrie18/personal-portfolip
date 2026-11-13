/* Replace these values with your real public contact details. Empty values keep
   explicit placeholders instead of creating fabricated profile links. */
const portfolio = {
  email: 'Eirelltampoc18@gmail.com',
  github: 'https://github.com/Llyrie18',
  facebook: 'https://www.facebook.com/Eiryll18',
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
const iconFallbacks = { 'fa-facebook-f': 'f', 'fa-code': '</>', 'fa-android': 'A', 'fa-html5': '5', 'fa-css3-alt': '3', 'fa-js': 'JS', 'fa-java': '♨', 'fa-python': 'Py', 'fa-php': 'php', 'fa-database': '▤', 'fa-git-alt': '◇', 'fa-graduation-cap': '◇', 'fa-building-columns': '⌂', 'fa-calendar': '▦', 'fa-award': '☆', 'fa-certificate': '▧', 'fa-envelope': '✉', 'fa-github': 'GH', 'fa-location-dot': '⌖' };
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
  cafe: {
    title: 'Café Rencontre',
    type: '2025 · CAFÉ WEBSITE · Role: UI Design',
    providedDetails: true,
    description: "Café Rencontre is a coffee shop website designed to provide customers with a convenient and enjoyable online experience. Visitors can explore the café's menu, learn about the shop, read customer reviews, find its location, and place orders. The website features a warm, coffee-inspired design with a user-friendly interface and responsive layout.",
    scope: [
      'Interactive Menu: Allows customers to browse available coffee, beverages, and food.',
      'About Us Section: Provides information about the café and its background.',
      'Customer Reviews: Displays customer feedback and experiences.',
      "Location Information: Helps visitors find the café's location.",
      'Online Ordering: Includes an "Order Now" button for placing orders.',
      'Responsive Design: Provides a smooth browsing experience on desktop and mobile devices.',
      'Modern UI: Features a warm coffee-themed design with a full-screen hero image.'
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'Vercel'],
    contribution: 'Designed the user interface of Café Rencontre, focusing on creating a clean, visually appealing, and easy-to-navigate website. Contributed to organizing the website layout, choosing suitable colors, and improving the overall user experience.',
    objective: 'To create a modern and responsive café website that allows customers to explore the menu, learn about the business, and access ordering and location information conveniently.',
    liveUrl: 'https://caferecontre.vercel.app/'
  },
  webproject: { title: 'Web Project', description: 'Website available at vercel-live-20261031-182539.vercel.app. The project title, description, and contribution details have not yet been provided.', scope: ['Project features and your contribution: to be added.'], technologies: ['Technology stack to be provided'], liveUrl: 'https://vercel-live-20261031-182539.vercel.app/' },
  labtrack: {
    title: 'LabTrack — RFID-Based Computer Laboratory Monitoring System',
    type: 'Capstone Project / System Development',
    providedDetails: true,
    description: 'LabTrack is an RFID-based computer laboratory monitoring and student authentication system designed to improve laboratory security, student tracking, and computer management. It allows students to verify their identity using RFID cards before accessing laboratory computers. The system helps administrators monitor computer usage, manage laboratory sessions, and maintain accurate student activity records.',
    scope: [
      'RFID Student Authentication: Students tap their registered RFID cards to verify their identity before accessing laboratory computers.',
      'Computer Access Control: Students enter their Student ID in the desktop application to unlock and use a laboratory computer after verification.',
      'Real-Time Computer Monitoring: Administrators can monitor computer availability, student logins, and active laboratory sessions.',
      'Admin and Superadmin Dashboard: Role-based access for managing laboratories, student records, requests, and system operations.',
      'Session History: Records student information, assigned computer, login and logout times, and session duration.',
      'Manual Student Verification: Allows administrators to approve students who forgot or lost their RFID cards.',
      'Reports and Analytics: Provides laboratory usage records, student activity summaries, and monitoring reports.',
      'Laboratory Management: Allows administrators to manage multiple laboratories and report computers that are out of service.'
    ],
    technologies: ['React', 'HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'XAMPP', 'ESP32', 'RC522', 'Visual Studio Code', 'Arduino IDE', 'GitHub'],
    technologyGroups: {
      'Frontend': 'React, HTML, CSS, JavaScript',
      'Backend': 'PHP',
      'Database': 'MySQL',
      'Server Environment': 'XAMPP',
      'Hardware': 'ESP32 Microcontroller, RC522 RFID Reader',
      'Desktop Application': 'React-based interface',
      'Development Tools': 'Visual Studio Code, Arduino IDE, GitHub'
    },
    contribution: 'Participated in the development of LabTrack, focusing on system design, user interface improvements, RFID authentication integration, database connectivity, and laboratory monitoring features. Contributed to creating an organized and user-friendly system for both administrators and students.',
    objective: 'To develop a secure and efficient computer laboratory management system that automates student authentication, improves computer usage tracking, and reduces manual monitoring tasks for laboratory administrators.'
  },
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
  document.querySelector('#dialog-eyebrow').textContent = project.providedDetails ? 'PROJECT OVERVIEW' : 'PROJECT OVERVIEW · EXAMPLE CONTENT';
  const projectType = document.querySelector('#dialog-type');
  projectType.hidden = !project.type;
  projectType.textContent = project.type || '';
  document.querySelector('#dialog-placeholder-note').hidden = Boolean(project.providedDetails);
  ['contribution', 'objective'].forEach(field => {
    document.querySelector(`#dialog-${field}`).hidden = !project[field];
    document.querySelector(`#dialog-${field}-text`).textContent = project[field] || '';
  });
  const sourceImage = button.closest('article').querySelector('img');
  const modalImage = document.querySelector('#dialog-image');
  const fallbackImages = { labtrack: 'assets/images/project1.svg', grades: 'assets/images/project2.svg', library: 'assets/images/project3.svg', cafe: 'assets/images/cafe-website.svg', webproject: 'assets/images/web-project.svg' };
  modalImage.onerror = () => { modalImage.onerror = null; modalImage.src = fallbackImages[button.dataset.project]; };
  modalImage.src = sourceImage.currentSrc || sourceImage.src;
  modalImage.alt = sourceImage.alt;
  const scope = document.querySelector('#dialog-scope');
  scope.replaceChildren(...project.scope.map(text => { const item = document.createElement('li'); item.textContent = text; return item; }));
  document.querySelector('#dialog-technologies').replaceChildren(...project.technologies.map(text => { const tag = document.createElement('span'); tag.textContent = text; return tag; }));
  const groupedStack = document.querySelector('#dialog-stack-details');
  groupedStack.replaceChildren();
  groupedStack.hidden = !project.technologyGroups;
  document.querySelector('#dialog-technologies').hidden = Boolean(project.technologyGroups);
  if (project.technologyGroups) Object.entries(project.technologyGroups).forEach(([label, value]) => {
    const term = document.createElement('dt');
    term.textContent = label;
    const detail = document.createElement('dd');
    detail.textContent = value;
    groupedStack.append(term, detail);
  });
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

['github', 'facebook'].forEach(profile => {
  if (!validPublicUrl(portfolio[profile])) return;
  const profileNames = { github: 'GitHub', facebook: 'Facebook' };
  document.querySelectorAll(`[data-profile="${profile}"]`).forEach(link => { link.href = portfolio[profile]; link.setAttribute('aria-label', `${profileNames[profile]} profile`); });
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
