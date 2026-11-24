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
  const officers = Array.from({ length: 4 }, (_, index) =>
    '<article class="pc">' +
      '<h3>First Last</h3>' +
      '<div class="ph" aria-label="Portrait placeholder"><span></span></div>' +
    '</article>'
  ).join('');

  root.innerHTML = [
    '<header>',
      '<a class="logo" href="/"><img src="/media/logo.png" alt="">BASTION<span class="tag">Investment Society</span></a>',
      '<nav id="nav"><a href="/">Our Purpose</a><a href="/what-we-do">What We Do</a><a href="/our-fund">Our Fund</a><div class="dd"><a href="/executive-board" class="ddt on" aria-haspopup="true">Our Team</a><div class="ddm"><a href="/executive-board">Executive Board</a><a href="/chapters" class="on">Our Chapters</a></div></div></nav>',
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
          '<h2>Lorem Ipsum<em>Dolor Sit Amet.</em></h2>',
          '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vitae semper sapien. Suspendisse potenti, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>',
        '</div>',
      '</section>',
      '<section class="pgroup chapter-officials">',
        '<div class="chapter-wrap">',
          '<h2>Chapter Officials</h2>',
          '<div class="pgrid">' + officers + '</div>',
        '</div>',
      '</section>',
      '<section class="pgroup alt chapter-activity">',
        '<div class="chapter-wrap">',
          '<h2>What We Are Up To</h2>',
          '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>',
        '</div>',
      '</section>',
    '</main>',
    '<footer>',
      '<div class="row">',
        '<img src="/media/logo-white.png" alt="Bastion">',
        '<nav><a href="/">Our Purpose</a><a href="/what-we-do">What We Do</a><a href="/our-fund">Our Fund</a><a href="/executive-board">Our Team</a></nav>',
      '</div>',
      '<p>Bastion Investment Society is an independent organization made up of students, mentors, and partners. It is not affiliated with, sponsored by, or endorsed by Harvard, Yale, Princeton, the University of Pennsylvania, Columbia, Brown, Cornell, Dartmouth, or any other university. We do not provide investment advice on this website. This site has not been reviewed by those universities, and they are not responsible for viewers\' investment decisions.</p>',
      '<p style="margin-top:14px">Please contact <a href="mailto:bastioninvestmentsociety@gmail.com">bastioninvestmentsociety@gmail.com</a> for more information.</p>',
      '<p style="margin-top:14px">Campus photograph: <a href="' + credit.source + '">' + chapter.landmark + ' by ' + credit.author + '</a> (' + license + '). Image resized for web and displayed with a responsive crop.</p>',
    '</footer>'
  ].join('');
})();
