(() => {
  const intro = document.querySelector('.bird-intro');
  const scene = intro?.querySelector('.bird-scene');
  const flight = intro?.querySelector('.bird-flight');
  const perched = intro?.querySelector('.bird-perched');
  const poses = [...(intro?.querySelectorAll('.bird-pose') ?? [])];
  if (!intro || !scene || !flight || !perched || poses.length < 3) return;

  // Adjust the path, scale, and wing-pose timing independently here.
  const CONFIG = {
    durationMs: 4100,
    flightDurationMs: 2370,
    takeover: { startMs: 2600, endMs: 3200 },
    launch: { startMs: 440, fadeMs: 360 },
    flightPath: {
      desktop: [
        { at: 0,    x: 72.8, y: 19.3, width: 10.9, rotation: 0, opacity: 0 },
        { at: 440,  x: 72.8, y: 19.3, width: 10.9, rotation: 0, opacity: 0 },
        { at: 700,  x: 70.4, y: 24.0, width: 12.2, rotation: 4, opacity: 1 },
        { at: 960,  x: 66.5, y: 40.1, width: 14.2, rotation: 14, opacity: 1 },
        { at: 1250, x: 51.0, y: 42.7, width: 20.3, rotation: 18, opacity: 1 },
        { at: 1500, x: 32.4, y: 45.1, width: 26.6, rotation: 10, opacity: 1 },
        { at: 1750, x: 7.6,  y: 40.7, width: 39.9, rotation: -3, opacity: 1 },
        { at: 2030, x: -25,  y: 30.0, width: 55.0, rotation: -8, opacity: 1 },
        { at: 2370, x: -92,  y: 12.0, width: 70.0, rotation: -6, opacity: 0 }
      ],
      portrait: [
        { at: 0,    x: 65, y: 19, width: 15, rotation: 0, opacity: 0 },
        { at: 440,  x: 65, y: 19, width: 15, rotation: 0, opacity: 0 },
        { at: 700,  x: 62, y: 25, width: 18, rotation: 4, opacity: 1 },
        { at: 960,  x: 56, y: 40, width: 23, rotation: 14, opacity: 1 },
        { at: 1250, x: 45, y: 43, width: 34, rotation: 18, opacity: 1 },
        { at: 1500, x: 30, y: 45, width: 45, rotation: 10, opacity: 1 },
        { at: 1750, x: 6,  y: 41, width: 62, rotation: -3, opacity: 1 },
        { at: 2030, x: -28, y: 30, width: 85, rotation: -8, opacity: 1 },
        { at: 2370, x: -112,y: 12, width: 100,rotation: -6, opacity: 0 }
      ]
    },
    wings: {
      cycleMs: 680,
      startMs: 700,
      endMs: 2350,
      sequence: ['06', '07', '08', '07']
    }
  };

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    intro.remove();
    return;
  }

  const beginAnimation = () => {
    const duration = CONFIG.durationMs;
    const isPortrait = matchMedia('(max-width: 600px)').matches;
    const path = isPortrait ? CONFIG.flightPath.portrait : CONFIG.flightPath.desktop;
    const flightFrames = path.map((point) => ({
      offset: point.at / CONFIG.flightDurationMs,
      left: `${point.x}%`,
      top: `${point.y}%`,
      width: `${point.width}%`,
      opacity: point.opacity,
      transform: `rotate(${point.rotation}deg)`,
        easing: 'linear'
    }));

    flight.animate(flightFrames, { duration: CONFIG.flightDurationMs, fill: 'forwards', easing: 'linear' });
    perched.animate([
      { opacity: 1, transform: 'translateY(0) rotate(0deg)' },
      { opacity: 0, transform: 'translateY(3px) rotate(-7deg)' }
    ], { duration: CONFIG.launch.fadeMs, delay: CONFIG.launch.startMs, fill: 'forwards', easing: 'ease-in' });
    scene.animate([
      { backgroundColor: '#f7f6ed', offset: 0 },
      { backgroundColor: '#f7f6ed', offset: CONFIG.takeover.startMs / duration },
      { backgroundColor: '#062056', offset: CONFIG.takeover.endMs / duration },
      { backgroundColor: '#062056', offset: 1 }
    ], { duration, fill: 'forwards', easing: 'linear' });

    const poseById = Object.fromEntries(poses.map((pose) => [
      pose.className.match(/bird-pose-(\d+)/)?.[1], pose
    ]));
    let activePose = CONFIG.wings.sequence[0];
    let wingTimer;
    const setPose = (nextId) => {
      const current = poseById[activePose];
      const next = poseById[nextId];
      if (!current || !next || current === next) return;
      current.style.opacity = '0';
      next.style.opacity = '1';
      activePose = nextId;
    };

    let wingStep = 0;
    const wingInterval = CONFIG.wings.cycleMs / CONFIG.wings.sequence.length;
    const wingLoop = () => {
      if (performance.now() - startTime >= CONFIG.wings.endMs) return;
      wingStep = (wingStep + 1) % CONFIG.wings.sequence.length;
      setPose(CONFIG.wings.sequence[wingStep]);
      wingTimer = setTimeout(wingLoop, wingInterval);
    };

    const finish = () => {
      clearTimeout(wingTimer);
      intro.classList.add('is-done');
      setTimeout(() => intro.remove(), 600);
    };
    const startTime = performance.now();
    wingTimer = setTimeout(wingLoop, CONFIG.wings.startMs);
    setTimeout(finish, duration);
  };

  const artwork = [...intro.querySelectorAll('img')];
  Promise.all(artwork.map((image) => image.decode()))
    .then(beginAnimation)
    .catch(() => intro.remove());
})();
