(() => {
  const key = document.body.dataset.chapter;
  const chapter = window.BASTION_CHAPTERS && window.BASTION_CHAPTERS[key];
  const root = document.getElementById('chapter-root');
  if (!chapter || !root) return;

  document.title = chapter.name + ' Chapter | Bastion Investment Society';
  const credit = chapter.credit;
  const license = credit.licenseUrl
    ? '<a href="' + credit.licenseUrl + '">' + credit.license + '</a>'
    : credit.license;
  const PRESIDENTS = {"harvard": {"name": "Daniel Adibi", "url": "https://www.linkedin.com/in/daniel-adibi-05885a239/", "photo": "/media/people/daniel-adibi.jpg"}, "princeton": {"name": "Luke Pierce", "url": "https://www.linkedin.com/in/luke-w-pierce/", "photo": "/media/people/luke-pierce.jpg"}, "penn": {"name": "Ethan Wind", "url": "https://www.linkedin.com/in/ethanwind/", "photo": "/media/people/ethan-wind.jpg"}, "columbia": {"name": "Fateh Arif Kerimli", "url": "https://www.linkedin.com/in/fateh-arif-kerimli/", "photo": "/media/people/fateh-arif-kerimli.jpg"}, "cornell": {"name": "Sisi Xu", "url": "https://www.linkedin.com/in/sisixu08/", "photo": "/media/people/sisi-xu.jpg"}};
  const pres = PRESIDENTS[key];
  const presCard = pres
    ? '<a class="pc" href="' + pres.url + '" target="_blank" rel="noopener"><h3>' + pres.name + '</h3><p class="pt">Campus President</p>' + (pres.photo ? '<div class="ph pic"><img src="' + pres.photo + '" alt="' + pres.name + '" loading="lazy"></div>' : '<div class="ph"><span></span></div>') + '</a>'
    : '<article class="pc"><h3>First Last</h3><p class="pt">Campus President</p><div class="ph" aria-label="Portrait placeholder"><span></span></div></article>';
  const officers = presCard + Array.from({ length: 3 }, () =>
    '<article class="pc">' +
      '<h3>First Last</h3>' +
      '<div class="ph" aria-label="Portrait placeholder"><span></span></div>' +
    '</article>'
  ).join('');

  root.innerHTML = [
    '<header>',
      '<a class="logo" href="/"><img src="/media/logo.png" alt="">BASTION<span class="tag">Investment Society</span></a>',
      '<nav id="nav"><a href="/">Our Purpose</a><a href="/what-we-do">What We Do</a><a href="/our-fund">Our Funds</a><div class="dd"><a href="/chapters" class="ddt on" aria-haspopup="true">Our Team</a><div class="ddm"><a href="/chapters" class="on">Chapters</a><a href="/investment-team">Committees</a></div></div></nav>',
      '<a class="login" href="#" id="loginBtn">Client Login</a>',
      '<button class="burger" id="burger" aria-label="Menu"></button>',
    '</header>',
    '<main class="chapter-page">',
      '<section class="chapter-hero" aria-labelledby="chapter-title">',
        '<div class="chapter-wrap chapter-hero-inner">',
          '<div class="chapter-hero-copy">',
            '<div class="chapter-breadcrumb"><a href="/chapters/">Our Chapters</a><span aria-hidden="true">/</span><span>' + chapter.name + '</span></div>',
            '<img class="chapter-hero-crest" src="' + chapter.crest + '" alt="' + chapter.name + ' crest">',
            '<h1 id="chapter-title">' + chapter.name + '</h1>',
            '<p class="chapter-location">' + chapter.location + '</p>',
            '<p class="chapter-hero-description">' + chapter.intro + '</p>',
          '</div>',
          '<figure class="chapter-hero-photo" style="--photo-position:' + chapter.photoPosition + '">',
            '<img src="' + chapter.photo + '" alt="' + chapter.landmark + ' at ' + chapter.name + '" fetchpriority="high">',
          '</figure>',
        '</div>',
      '</section>',
      '<section class="chapter-navy">',
        '<div class="chapter-wrap chapter-navy-inner">',
          '<h2>Want to join?<em>How to apply.</em></h2>',
          '<p>Apply on the <a href="/application">application page</a>, or contact <a href="mailto:bastioninvestmentsociety@gmail.com">bastioninvestmentsociety@gmail.com</a>.</p>',
        '</div>',
      '</section>',
      '<section class="pgroup chapter-officials" id="officials">',
        '<div class="chapter-wrap">',
          '<h2>Chapter Officials</h2>',
          '<div class="pgrid">' + officers + '</div>',
        '</div>',
      '</section>',
      '<section class="pgroup alt chapter-activity">',
        '<div class="chapter-wrap">',
          '<h2>What We Are Up To</h2>',
          '<p>This chapter is currently under development during Thanksgiving break. Please come back at the start of the spring semester.</p>',
        '</div>',
      '</section>',
    '</main>',
    '<footer>',
      '<div class="row">',
        '<img src="/media/logo-white.png" alt="Bastion">',
        '<nav><a href="/">Our Purpose</a><a href="/what-we-do">What We Do</a><a href="/our-fund">Our Funds</a><a href="/chapters">Our Team</a></nav>',
      '</div>',
      '<div class="fsoc"><a href="https://www.linkedin.com/company/bastion-investment-society/" target="_blank" rel="noopener" aria-label="LinkedIn"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.1c0-1.22-.02-2.78-1.7-2.78-1.7 0-1.96 1.33-1.96 2.7V21h-4z"/></svg></a><a href="https://www.instagram.com/bastioninvestmentsociety/" target="_blank" rel="noopener" aria-label="Instagram"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2zm0 4.86a4.94 4.94 0 1 0 0 9.88 4.94 4.94 0 0 0 0-9.88zm0 8.15a3.21 3.21 0 1 1 0-6.42 3.21 3.21 0 0 1 0 6.42zm5.14-9.5a1.15 1.15 0 1 0 0 2.3 1.15 1.15 0 0 0 0-2.3z"/></svg></a></div>',
      '<p>Bastion Investment Society is an independent organization made up of students, mentors, and partners. It is not affiliated with, sponsored by, or endorsed by Harvard, Yale, Princeton, the University of Pennsylvania, Columbia, Brown, Cornell, Dartmouth, or any other university. We do not provide investment advice on this website. This site has not been reviewed by those universities, and they are not responsible for viewers\' investment decisions.</p>',
      '<p style="margin-top:14px">Please contact <a href="mailto:bastioninvestmentsociety@gmail.com">bastioninvestmentsociety@gmail.com</a> for more information.</p>',
      '<p style="margin-top:14px">Campus photograph: <a href="' + credit.source + '">' + chapter.landmark + ' by ' + credit.author + '</a> (' + license + '). Image resized for web and displayed with a responsive crop.</p>',
    '</footer>'
  ].join('');
  if (location.hash === '#officials') {
    const go = () => { const el = document.getElementById('officials'); if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 120); };
    requestAnimationFrame(go); window.addEventListener('load', go);
  }
})();
