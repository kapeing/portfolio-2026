
/* Mobile Navigation */

const navToggle = document.querySelector(".nav__toggle");
const navList = document.querySelector(".nav__list");

if (navToggle && navList) {
  const closeMenu = () => {
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "メニューを開く");
    navList.classList.remove("is-open");
  };

  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";

    navToggle.setAttribute("aria-expanded", String(!isOpen));
    navToggle.setAttribute(
      "aria-label",
      isOpen ? "メニューを開く" : "メニューを閉じる"
    );

    navList.classList.toggle("is-open", !isOpen);
  });

  navList.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
}

const viewButtons=[...document.querySelectorAll('[data-view-button]')];const viewPanels=[...document.querySelectorAll('[data-view-panel]')];function setPortfolioView(view,scroll=false,updateUrl=true){const selected=['design','frontend'].includes(view)?view:'frontend';viewButtons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.viewButton===selected)));viewPanels.forEach(p=>p.hidden=p.dataset.viewPanel!==selected);if(updateUrl){const u=new URL(location.href);u.searchParams.set('view',selected);history.replaceState(null,'',u)}if(scroll)document.getElementById('projects')?.scrollIntoView({behavior:'smooth'})}viewButtons.forEach(b=>b.addEventListener('click',()=>setPortfolioView(b.dataset.viewButton,true)));setPortfolioView(new URLSearchParams(location.search).get('view'),false,false);


// Floating back-to-top button
const backToTop = document.querySelector('.back-to-top');
if (backToTop) {
  const updateBackToTop = () => { backToTop.hidden = window.scrollY < 500; };
  window.addEventListener('scroll', updateBackToTop, { passive: true });
  updateBackToTop();
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  });
}
