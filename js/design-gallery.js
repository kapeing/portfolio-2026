(() => {
  const modal = document.getElementById('design-lightbox');
  if (!modal) return;
  const image = modal.querySelector('.design-lightbox__image');
  const count = modal.querySelector('.design-lightbox__count');
  const prev = modal.querySelector('.design-lightbox__prev');
  const next = modal.querySelector('.design-lightbox__next');
  const close = modal.querySelector('.design-lightbox__close');
  let images = [];
  let index = 0;
  let opener = null;
  function render() {
    image.src = images[index];
    image.alt = `制作画像 ${index + 1} / ${images.length}`;
    count.textContent = `${index + 1} / ${images.length}`;
    prev.hidden = next.hidden = images.length < 2;
  }
  function hide() {
    modal.hidden = true;
    document.body.classList.remove('design-lightbox-open');
    image.removeAttribute('src');
    if (opener) opener.focus();
  }
  document.querySelectorAll('[data-gallery-images]').forEach(button => {
    button.addEventListener('click', () => {
      try { images = JSON.parse(button.dataset.galleryImages); }
      catch { return; }
      if (!images.length) return;
      index = 0;
      opener = button;
      render();
      modal.hidden = false;
      document.body.classList.add('design-lightbox-open');
      close.focus();
    });
  });
  modal.querySelectorAll('[data-gallery-close]').forEach(el => el.addEventListener('click', hide));
  prev.addEventListener('click', () => { index = (index - 1 + images.length) % images.length; render(); });
  next.addEventListener('click', () => { index = (index + 1) % images.length; render(); });
  document.addEventListener('keydown', event => {
    if (modal.hidden) return;
    if (event.key === 'Escape') hide();
    if (event.key === 'ArrowLeft' && images.length > 1) prev.click();
    if (event.key === 'ArrowRight' && images.length > 1) next.click();
    if (event.key === 'Tab') {
      const focusable = [close, ...(images.length > 1 ? [prev, next] : [])];
      const pos = focusable.indexOf(document.activeElement);
      if (event.shiftKey && pos === 0) { event.preventDefault(); focusable.at(-1).focus(); }
      else if (!event.shiftKey && pos === focusable.length - 1) { event.preventDefault(); focusable[0].focus(); }
    }
  });
})();
