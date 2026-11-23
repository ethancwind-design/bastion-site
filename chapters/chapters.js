(() => {
  const mapImage = document.querySelector('.chapter-map-art');
  const locationDots = document.querySelectorAll('.chapter-locations circle');
  let mapSvg = null;
  let activeLink = null;

  function setActiveChapter(link) {
    activeLink?.classList.remove('is-active');
    locationDots.forEach((dot) => dot.classList.remove('is-active'));
    mapSvg?.querySelectorAll('.state.is-active').forEach((state) => state.classList.remove('is-active'));
    activeLink = link;
    if (!link) return;

    link.classList.add('is-active');
    document.querySelector(`[data-location="${link.dataset.chapter}"]`)?.classList.add('is-active');
    mapSvg?.querySelector(`#state-${link.dataset.state}`)?.classList.add('is-active');
  }

  if (mapImage) {
    fetch(mapImage.src)
      .then((response) => {
        if (!response.ok) throw new Error('Map unavailable');
        return response.text();
      })
      .then((markup) => {
        const svg = new DOMParser().parseFromString(markup, 'image/svg+xml').documentElement;
        if (svg.localName !== 'svg') return;
        svg.classList.add('chapter-map-art');
        mapImage.replaceWith(svg);
        mapSvg = svg;
        if (activeLink) setActiveChapter(activeLink);
      })
      .catch(() => {});
  }

  document.querySelectorAll('.chapter-node').forEach((link) => {
    link.addEventListener('pointerenter', () => setActiveChapter(link));
    link.addEventListener('pointerleave', () => {
      if (activeLink === link && document.activeElement !== link) setActiveChapter(null);
    });
    link.addEventListener('focus', () => setActiveChapter(link));
    link.addEventListener('blur', () => {
      if (activeLink === link) setActiveChapter(null);
    });
  });
})();
