const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', menuButton.dataset.openLabel || 'Open menu');
  mobileNav.hidden = true;
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? (menuButton.dataset.closeLabel || 'Close menu') : (menuButton.dataset.openLabel || 'Open menu'));
  mobileNav.hidden = !open;
});
mobileNav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !mobileNav.hidden) { closeMenu(); menuButton.focus(); }
  const languages = document.querySelector('.language-switcher');
  if (event.key === 'Escape' && languages?.open) { languages.open = false; languages.querySelector('summary').focus(); }
});
document.addEventListener('click', event => {
  const languages = document.querySelector('.language-switcher');
  if (languages?.open && !languages.contains(event.target)) languages.open = false;
});
window.matchMedia('(min-width: 801px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
