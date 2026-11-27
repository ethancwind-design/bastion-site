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
  const PRESIDENTS = {"harvard": {"name": "Daniel Adibi", "url": "https://www.linkedin.com/in/daniel-adibi-05885a239/", "photo": "/media/people/daniel-adibi.jpg"}, "princeton": {"name": "Luke Pierce", "url": "https://www.linkedin.com/in/luke-w-pierce/", "photo": "/media/people/luke-pierce.jpg"}, "penn": {"name": "Ethan Wind", "url": "https://www.linkedin.com/in/ethanwind/", "photo": "/media/people/ethan-wind.jpg"}, "cornell": {"name": "Sisi Xu", "url": "https://www.linkedin.com/in/sisixu08/", "photo": "/media/people/sisi-xu.jpg"}, "dartmouth": {"name": "Karen Park", "url": "https://www.linkedin.com/in/jiminkarenpark/", "photo": "/media/people/karen-park.jpg"}, "columbia": {"name": "Lela DiCrescenzo", "url": "https://www.linkedin.com/in/lela-dicrescenzo-b72959371/", "photo": "/media/people/lela-dicrescenzo.jpg"}};
  const pres = PRESIDENTS[key];
  const presCard = pres
    ? '<a class="pc" href="' + pres.url + '" target="_blank" rel="noopener"><h3>' + pres.name + '</h3><p class="pt">Campus President</p>' + (pres.photo ? '<div class="ph pic"><img src="' + pres.photo + '" alt="' + pres.name + '" loading="lazy"></div>' : '<div class="ph"><span></span></div>') + '</a>'
    : '';
  const ph = '<div class="ph" aria-label="Portrait placeholder"><span></span></div>';
  const card = (p) => {
    const inner = '<h3>' + p.name + '</h3>' + (p.role ? '<p class="pt">' + p.role + '</p>' : '') +
      (p.photo ? '<div class="ph pic"><img src="' + p.photo + '" alt="' + p.name + '" loading="lazy"></div>' : ph);
    return p.url ? '<a class="pc" href="' + p.url + '" target="_blank" rel="noopener">' + inner + '</a>' : '<article class="pc">' + inner + '</article>';
  };
  const VP_ROLES = ['Vice President of Internal Affairs', 'Vice President of External Affairs', 'Vice President of Community Outreach'];
  const OFFICERS = {
    penn: { 'Vice President of External Affairs': { name: 'James Horangic', url: 'https://www.linkedin.com/in/james-horangic-314026364/', photo: '/media/people/james-horangic.jpg' } },
    columbia: { 'Vice President of Community Outreach': { name: 'Hugo Eechaute', url: 'https://www.linkedin.com/in/hugoeechaute/', photo: '/media/people/hugo-eechaute.jpg' }, 'Vice President of Internal Affairs': { name: 'Sophia Kalochoritis', url: 'https://www.linkedin.com/in/skalochoritis/', photo: '/media/people/sophia-kalochoritis.jpg' }, 'Vice President of External Affairs': { name: 'Fateh Arif Kerimli', url: 'https://www.linkedin.com/in/fateh-arif-kerimli/', photo: '/media/people/fateh-arif-kerimli.jpg', suffix: ' &amp; Co-Founder' } }
  };
  const officers = presCard + VP_ROLES.map((role) => { const o = (OFFICERS[key] || {})[role]; return o ? card(Object.assign({}, o, { role: role + (o.suffix || '') })) : ''; }).join('');
  const interviewing = key !== 'penn' && key !== 'columbia';
  const MEMBERS = {
    yale: [
      { name: 'Johnny Guo', role: 'Associate Portfolio Manager, Global Quantitative Strategies', url: 'https://www.linkedin.com/in/johnny-guo-212bb22a5/', photo: '/media/people/johnny-guo.jpg' },
    ],
    princeton: [
      { name: 'Krish Bharwani', role: 'Member, Equities: Financials', url: 'https://www.linkedin.com/in/krish-bharwani-aa0626313/' }
    ],
    harvard: [
      { name: 'Ryan Casey', role: 'Associate Portfolio Manager, Global Quantitative Strategies', url: 'https://www.linkedin.com/in/ryancasey-/', photo: '/media/people/ryan-casey.jpg' },
      { name: 'Buhlebenkosi Mhlongo', role: 'Associate Portfolio Manager, Equities: Retail', url: 'https://www.linkedin.com/in/buhlebenkosi-mhlongo-895285361/', photo: '/media/people/buhlebenkosi-mhlongo.jpg' }
    ],
    penn: [
      { name: 'Albert Armin', role: 'Head of Risk', url: 'https://www.linkedin.com/in/albert-armin-07110026b/', photo: '/media/people/albert-armin.jpg' },
      { name: 'Ryan Watach', role: 'Portfolio Manager, Venture Capital', url: 'https://www.linkedin.com/in/ryan-watach/', photo: '/media/people/ryan-watach.jpg' },
      { name: 'Asher Wan', role: 'Portfolio Manager, Equities: Financials', url: 'https://www.linkedin.com/in/asherwan/', photo: '/media/people/asher-wan.jpg' },
      { name: 'Arna Rakhimbergenova', role: 'Portfolio Manager, Energy &amp; Infrastructure', url: 'https://www.linkedin.com/in/arnusikon/', photo: '/media/people/arna-rakhimbergenova.jpg' },
      { name: 'David Bratucu', role: 'Co-Founder &amp; Chief Investment Officer', url: 'https://www.linkedin.com/in/david-bratucu/', photo: '/media/people/david-bratucu.jpg' },
      { name: 'Giacomo Maffre', role: 'Head of Portfolio Analytics', url: 'https://www.linkedin.com/in/giacomo-maffre/', photo: '/media/people/giacomo-maffre.jpg?v=2' },
      { name: 'Rasmus Suonio', role: 'Head of Trading &amp; Execution', url: 'https://www.linkedin.com/in/rasmus-suonio/', photo: '/media/people/rasmus-suonio.jpg' },
      { name: 'Adam Polzien', role: 'Portfolio Manager, Equities: Industrials', url: 'https://www.linkedin.com/in/adam-polzien-0a29a1262/', photo: '/media/people/adam-polzien.jpg' },
      { name: 'Jonah Begley', role: 'Member &amp; Co-Founder, Equities: Tech', url: 'https://www.linkedin.com/in/jonah-begley-b0b92322a/', photo: '/media/people/jonah-begley.jpg' },
      { name: 'Stanley Yang', role: 'Associate Portfolio Manager, Venture Capital', url: 'https://www.linkedin.com/in/stanley-yang-933652369/', photo: '/media/people/stanley-yang.jpg' }
    ],
    columbia: [
      { name: 'Andrew Watcharananan', role: 'Portfolio Manager, Global Quantitative Strategies', url: 'https://www.linkedin.com/in/andrew-watcharananan-627aa9348/', photo: '/media/people/andrew-watcharananan.jpg' },
      { name: 'Dean Karuhadej', role: 'Associate Portfolio Manager, Global Quantitative Strategies', url: 'https://www.linkedin.com/in/varis-karuhadej-542616330/', photo: '/media/people/dean-karuhadej.jpg' },
      { name: 'Aituar Kurmambay', role: 'Associate Portfolio Manager, Global Quantitative Strategies', url: 'https://www.linkedin.com/in/aituar-kurmambay-4238bb3a1/', photo: '/media/people/aituar-kurmambay.jpg' },
      { name: 'Manuel Trelles', role: 'Associate Portfolio Manager, Fixed Income', url: 'https://www.linkedin.com/in/manuel-trelles-a559a437a/', photo: '/media/people/manuel-trelles.jpg' },
      { name: 'Pavani Rhoads', role: 'Portfolio Manager, Real Estate', url: 'https://www.linkedin.com/in/pavani-rhoads-0348582a5/', photo: '/media/people/pavani-rhoads.jpg' },
      { name: 'Amelie Piergentili', role: 'Member, Equities: Tech', url: 'https://www.linkedin.com/in/amelie-piergentili-b832072a5/', photo: '/media/people/amelie-piergentili.jpg' },
      { name: 'Aura Ackerman Sandoval', role: 'Member, Equities: Industrials', url: 'https://www.linkedin.com/in/aura-ackerman-sandoval-3507b33ba/', photo: '/media/people/aura-ackerman-sandoval.jpg' }
    ]
  };
  const memberList = (MEMBERS[key] || []).filter((m) => m.name !== 'First Last');
  const members = memberList.map(card).join('');

  const SCHOOL_COLORS = {
    harvard: ['#A51C30', '#1E1E1E'], yale: ['#00356B', '#978D85'], princeton: ['#EE7F2D', '#1E1E1E'],
    penn: ['#990000', '#011F5B'], columbia: ['#B9D9EB', '#1D4F91'], brown: ['#ED1C24', '#4E3629'],
    cornell: ['#B31B1B', '#222222'], dartmouth: ['#00693E', '#00693E']
  };
  const sc = SCHOOL_COLORS[key] || ['#1646b8', '#0a2166'];
  document.body.style.setProperty('--school', sc[0]);
  document.body.style.setProperty('--school-2', sc[1]);
  // Heading colors from each school's identity: [main heading, second line / subheadings]
  const SCHOOL_TEXT = {
    harvard: ['#A51C30', '#1E1E1E'], yale: ['#00356B', '#978D85'], princeton: ['#1E1E1E', '#E0701C'],
    penn: ['#011F5B', '#990000'], columbia: ['#1D4F91', '#1D4F91'], brown: ['#4E3629', '#ED1C24'],
    cornell: ['#B31B1B', '#222222'], dartmouth: ['#00693E', '#00693E']
  };
  const st = SCHOOL_TEXT[key] || ['#0a2166', '#1646b8'];
  document.body.style.setProperty('--school-text', st[0]);
  document.body.style.setProperty('--school-text-2', st[1]);
  root.innerHTML = [
    '<header>',
      '<a class="logo" href="/"><img src="/media/logo.png" alt="">BASTION<span class="tag">Investment Society</span></a>',
      '<nav id="nav"><a href="/">Our Purpose</a><a href="/what-we-do">Our Goals</a><a href="/our-fund">Our Fund</a><div class="dd"><a href="/chapters" class="ddt on" aria-haspopup="true">Our Team</a><div class="ddm"><a href="/chapters" class="on">Chapters</a><a href="/investment-team">Committees</a></div></div></nav>',
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
            (chapter.intro ? '<p class="chapter-hero-description">' + chapter.intro + '</p>' : ''),
          '</div>',
          '<figure class="chapter-hero-photo" style="--photo-position:' + chapter.photoPosition + '">',
            '<img src="' + chapter.photo + '" alt="' + chapter.landmark + ' at ' + chapter.name + '" fetchpriority="high">',
          '</figure>',
        '</div>',
      '</section>',
      '<section class="chapter-navy">',
        '<div class="chapter-wrap chapter-navy-inner">',
          '<h2>Want to join?<em>How to apply.</em></h2>',
          '<p>Apply on the <a href="/application">application page</a>, or contact your campus president.</p>',
        '</div>',
      '</section>',
      '<section class="pgroup chapter-officials" id="officials">',
        '<div class="chapter-wrap">',
          '<h2>Chapter Officials</h2>',
          (interviewing ? '<p class="chapter-interviewing">This chapter is still in the interview process. We are currently deciding leadership roles and will share the full team soon.</p>' : ''),
          (officers ? '<div class="pgrid">' + officers + '</div>' : ''),
        '</div>',
      '</section>',
      !members ? '' : '<section class="pgroup chapter-officials chapter-members" id="members">',
        !members ? '' : '<div class="chapter-wrap">',
          !members ? '' : '<h2>Chapter Members</h2>',
          !members ? '' : '<div class="pgrid">' + members + '</div>',
        !members ? '' : '</div>',
      !members ? '' : '</section>',
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
        '<nav><a href="/">Our Purpose</a><a href="/what-we-do">Our Goals</a><a href="/our-fund">Our Fund</a><a href="/chapters">Our Team</a></nav>',
      '</div>',
      '<div class="fsoc"><a href="https://www.linkedin.com/company/bastion-investment-society/" target="_blank" rel="noopener" aria-label="LinkedIn"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.1c0-1.22-.02-2.78-1.7-2.78-1.7 0-1.96 1.33-1.96 2.7V21h-4z"/></svg></a><a href="https://www.instagram.com/bastioninvestmentsociety/" target="_blank" rel="noopener" aria-label="Instagram"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2zm0 4.86a4.94 4.94 0 1 0 0 9.88 4.94 4.94 0 0 0 0-9.88zm0 8.15a3.21 3.21 0 1 1 0-6.42 3.21 3.21 0 0 1 0 6.42zm5.14-9.5a1.15 1.15 0 1 0 0 2.3 1.15 1.15 0 0 0 0-2.3z"/></svg></a><a href="mailto:bastioninvestmentsociety@gmail.com" aria-label="Email"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.8" d="M3 5.5h18v13H3z"/><path fill="none" stroke="currentColor" stroke-width="1.8" d="M3.5 6l8.5 7 8.5-7"/></svg></a></div>',
      '<p>Bastion Investment Society is an independent organization made up of students, mentors, and partners. It is not affiliated with, sponsored by, or endorsed by Harvard, Yale, Princeton, the University of Pennsylvania, Columbia, Brown, Cornell, Dartmouth, or any other university. We do not provide investment advice on this website. This site has not been reviewed by those universities, and they are not responsible for viewers\' investment decisions.</p>',
      '<p style="margin-top:14px">Please contact <a href="mailto:bastioninvestmentsociety@gmail.com">bastioninvestmentsociety@gmail.com</a> for more information.</p>',
    '</footer>'
  ].join('');
  if (location.hash === '#officials') {
    const go = () => { const el = document.getElementById('officials'); if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 120); };
    requestAnimationFrame(go); window.addEventListener('load', go);
  }
})();
