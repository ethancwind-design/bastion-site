(() => {
  const CONFIG = {
    scene: { width: 1440, height: 900, paper: '#f2efe4', ink: '#062056', durationMs: 3000 },
    flight: {
      delayMs: 50,
      durationMs: 2600,
      path: 'M1120 245 C1115 110 1005 70 900 135 C780 210 670 430 520 590 C365 755 200 820 40 860 C-80 890 -220 970 -490 1060',
      startScale: 0.155,
      endScale: 0.86,
      scalePower: 1.18,
      peakProgress: 0.103,
      branchToPeakMs: 540,
      speedBlendMs: 200,
      anchor: { x: 300, y: 500 },
      glidePitch: -5,
      pitchBlend: 0.10,
      maxDivePitch: -42,
      maxLaunchPitch: 48
    },
    wings: { farAngle: -3, nearAngle: 5 },
    dots: {
      clusterCount: 24,
      dotsPerCluster: 3,
      seedRadiusMin: 2.5,
      seedRadiusMax: 7,
      finalRadius: 1700,
      lagMs: 35,
      seedGrowMs: 90,
      spreadSpeed: 0.95,
      minSpreadDurationMs: 420,
      maxSpreadDurationMs: 1300,
      dropDurationMs: 260,
      dropDistance: 18,
      firstProgress: 0.10,
      lastProgress: 0.84,
      expandStartProgress: 0.74
    }
  };

  const svg = document.querySelector('#scene');
  const path = document.querySelector('#flight-path');
  path.setAttribute('d', CONFIG.flight.path);
  const paper = document.querySelector('.scene-paper');
  const dotLayer = document.querySelector('#dot-trail');
  const motion = document.querySelector('#bird-motion');
  const scaleGroup = document.querySelector('#bird-scale');
  const pitchGroup = document.querySelector('#bird-pitch');
  const origin = document.querySelector('#bird-origin');
  const farWing = document.querySelector('#wing-far');
  const nearWing = document.querySelector('#wing-near');
  const tail = document.querySelector('#tail');
  const replay = document.querySelector('#replay');
  const art = document.querySelector('#engraving');
  const branch = document.querySelector('.branch');
  const forestBranches = document.querySelector('#forest-branches');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const totalLength = path.getTotalLength();
  const anchor = CONFIG.flight.anchor;
  const peakBaseFraction = inverseBaseProgress(CONFIG.flight.peakProgress);
  const peakBaseTimeMs = peakBaseFraction * CONFIG.flight.durationMs;
  const launchVelocity = CONFIG.flight.peakProgress / CONFIG.flight.branchToPeakMs;
  const bridgeBaseTimeMs = findBridgeBaseTime();
  const bridgeEndVelocity = baseFlightVelocity(bridgeBaseTimeMs);
  const totalFlightMs = CONFIG.flight.branchToPeakMs + CONFIG.flight.speedBlendMs +
    CONFIG.flight.durationMs - bridgeBaseTimeMs;

  let widthScale = 1;
  let startTime = 0;
  let frameId = 0;
  let dots = [];

  function makeDots() {
    dotLayer.replaceChildren();
    dots = [];
    const { clusterCount, dotsPerCluster, firstProgress, lastProgress } = CONFIG.dots;
    let seed = 927461;
    const random = () => {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      return seed / 4294967296;
    };
    const { clusterRadiusX, clusterRadiusY, seedRadiusMin, seedRadiusMax } = CONFIG.dots;

    for (let group = 0; group < clusterCount; group += 1) {
      const progress = firstProgress + (lastProgress - firstProgress) * group / (clusterCount - 1);
      // Give each burst one shared point on the wake so its dots read as a
      // cluster instead of a chain of unrelated specks.
      const trailProgress = Math.max(0, progress - 0.04 - random() * 0.025);
      const trailLength = trailProgress * totalLength;
      const trailPoint = path.getPointAtLength(trailLength);
      const trailBefore = path.getPointAtLength(Math.max(0, trailLength - 3));
      const trailAfter = path.getPointAtLength(Math.min(totalLength, trailLength + 3));
      const trailAngle = Math.atan2(trailAfter.y - trailBefore.y, trailAfter.x - trailBefore.x);
      const normalX = -Math.sin(trailAngle);
      const normalY = Math.cos(trailAngle);
      const pose = poseAtProgress(progress);
      const tailOffset = 706 * pose.scale;
      const angle = pose.pitch * Math.PI / 180;
      const fromX = pose.point.x + Math.cos(angle) * tailOffset;
      const fromY = pose.point.y + Math.sin(angle) * tailOffset * widthScale;
      const clusterLaunchAt = CONFIG.flight.delayMs + inverseFlightProgress(progress) + CONFIG.dots.lagMs;
      const clusterRadius = 24 + progress * 58;
      const clusterOffsets = [];
      for (let i = 0; i < dotsPerCluster; i += 1) {
        // Spread the members of each burst across a loose wake, with enough
        // spacing that small circles remain distinct instead of merging.
        let lateralOffset = 0;
        let tangentOffset = 0;
        for (let attempt = 0; attempt < 24; attempt += 1) {
          const angle = random() * Math.PI * 2;
          const radius = Math.sqrt(random()) * clusterRadius;
          const candidateLateral = Math.cos(angle) * radius;
          const candidateTangent = Math.sin(angle) * radius * 0.78;
          const separated = clusterOffsets.every(offset =>
            Math.hypot(candidateLateral - offset.lateral, candidateTangent - offset.tangent) >= 19
          );
          lateralOffset = candidateLateral;
          tangentOffset = candidateTangent;
          if (separated) break;
        }
        clusterOffsets.push({ lateral: lateralOffset, tangent: tangentOffset });
        const targetX = Math.max(16, Math.min(CONFIG.scene.width - 16,
          trailPoint.x + normalX * lateralOffset + Math.cos(trailAngle) * tangentOffset));
        const targetY = Math.max(16, Math.min(CONFIG.scene.height - 16,
          trailPoint.y + normalY * lateralOffset + Math.sin(trailAngle) * tangentOffset));
        const distance = Math.hypot(targetX - fromX, targetY - fromY);
        const travelDuration = Math.max(CONFIG.dots.minSpreadDurationMs,
          Math.min(CONFIG.dots.maxSpreadDurationMs, distance / CONFIG.dots.spreadSpeed));
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('r', '0');
        circle.setAttribute('fill', CONFIG.scene.ink);
        dotLayer.append(circle);
        dots.push({
          circle,
          fromX: fromX + (random() - 0.5) * 6,
          fromY: fromY + (random() - 0.5) * 6,
          toX: targetX,
          toY: targetY,
          travelDuration,
          radius: seedRadiusMin + random() * (seedRadiusMax - seedRadiusMin),
          // Release each object individually; neighboring releases still
          // settle near one another to form loose, organic clumps.
          arrival: clusterLaunchAt + i * 62 + random() * 18
        });
      }
    }
  }

  function updateDots(elapsed, flightProgressValue) {
    const { finalRadius, seedGrowMs, expandStartProgress } = CONFIG.dots;
    const expanding = smoothstep((flightProgressValue - expandStartProgress) / (1 - expandStartProgress));
    for (const dot of dots) {
      const age = elapsed - dot.arrival;
      const born = smoothstep(age / seedGrowMs);
      const spread = smoothstep(age / dot.travelDuration);
      const x = dot.fromX + (dot.toX - dot.fromX) * spread;
      const y = dot.fromY + (dot.toY - dot.fromY) * spread;
      const radius = age < 0 ? 0 : born * (dot.radius + (finalRadius - dot.radius) * expanding);
      const drop = smoothstep(Math.max(0, age) / CONFIG.dots.dropDurationMs);
      dot.circle.setAttribute('cx', `${x * widthScale}`);
      dot.circle.setAttribute('cy', `${y + CONFIG.dots.dropDistance * drop}`);
      dot.circle.setAttribute('r', `${radius}`);
    }
  }

  function resizeScene() {
    const sceneWidth = CONFIG.scene.height * (innerWidth / innerHeight);
    widthScale = sceneWidth / CONFIG.scene.width;
    svg.setAttribute('viewBox', `0 0 ${sceneWidth} ${CONFIG.scene.height}`);
    forestBranches.setAttribute('transform', `scale(${widthScale} 1)`);
    branch.setAttribute('x', `${1020 * widthScale}`);
    branch.setAttribute('y', '258');
    branch.setAttribute('width', `${420 * widthScale}`);
    branch.setAttribute('height', `${141 * widthScale}`);
    for (const dot of dots) dot.circle.setAttribute('cx', `${dot.fromX * widthScale}`);
  }

  function smoothstep(t) {
    const x = Math.max(0, Math.min(1, t));
    return x * x * (3 - 2 * x);
  }

  function baseFlightProgress(timeFraction) {
    const t = Math.max(0, Math.min(1, timeFraction));
    return 0.82 * t + 0.18 * t * t;
  }

  function inverseBaseProgress(progress) {
    return (-0.82 + Math.sqrt(0.82 * 0.82 + 4 * 0.18 * progress)) / (2 * 0.18);
  }

  function baseFlightVelocity(elapsedMs) {
    return (0.82 + 0.36 * elapsedMs / CONFIG.flight.durationMs) / CONFIG.flight.durationMs;
  }

  function findBridgeBaseTime() {
    let time = peakBaseTimeMs;
    for (let i = 0; i < 20; i += 1) {
      const endVelocity = baseFlightVelocity(time);
      const endProgress = CONFIG.flight.peakProgress +
        (launchVelocity + endVelocity) * CONFIG.flight.speedBlendMs / 2;
      time = inverseBaseProgress(endProgress) * CONFIG.flight.durationMs;
    }
    return time;
  }

  function flightProgress(elapsedMs) {
    const { durationMs, branchToPeakMs, peakProgress } = CONFIG.flight;
    if (elapsedMs < branchToPeakMs) {
      return peakProgress * elapsedMs / branchToPeakMs;
    }
    if (elapsedMs < branchToPeakMs + CONFIG.flight.speedBlendMs) {
      const t = elapsedMs - branchToPeakMs;
      const acceleration = (bridgeEndVelocity - launchVelocity) / CONFIG.flight.speedBlendMs;
      return peakProgress + launchVelocity * t + 0.5 * acceleration * t * t;
    }
    const resumedBaseTime = bridgeBaseTimeMs + elapsedMs - branchToPeakMs - CONFIG.flight.speedBlendMs;
    return baseFlightProgress(resumedBaseTime / durationMs);
  }

  function poseAtProgress(progress) {
    const length = progress * totalLength;
    const point = path.getPointAtLength(length);
    const before = path.getPointAtLength(Math.max(0, length - 2));
    const after = path.getPointAtLength(Math.min(totalLength, length + 2));
    const heading = Math.atan2(after.y - before.y, (after.x - before.x) * widthScale);
    let desiredPitch = heading * 180 / Math.PI - 180;
    desiredPitch = ((desiredPitch + 540) % 360) - 180;
    desiredPitch = Math.max(CONFIG.flight.maxDivePitch,
      Math.min(CONFIG.flight.maxLaunchPitch, desiredPitch));
    const pitchBlend = smoothstep(progress / CONFIG.flight.pitchBlend);
    const pitch = CONFIG.flight.glidePitch * (1 - pitchBlend) + desiredPitch * pitchBlend;
    const scale = CONFIG.flight.startScale +
      (CONFIG.flight.endScale - CONFIG.flight.startScale) * Math.pow(progress, CONFIG.flight.scalePower);
    return { point, pitch, scale };
  }

  function inverseFlightProgress(progress) {
    let low = 0;
    let high = totalFlightMs;
    for (let i = 0; i < 24; i += 1) {
      const mid = (low + high) / 2;
      if (flightProgress(mid) < progress) low = mid;
      else high = mid;
    }
    return (low + high) / 2;
  }

  function updateBird(point, scale, pitch, farAngle, nearAngle, tailAngle, bob) {
    motion.setAttribute('transform', `translate(${point.x * widthScale} ${point.y + bob})`);
    scaleGroup.setAttribute('transform', `scale(${scale * widthScale})`);
    pitchGroup.setAttribute('transform', `rotate(${pitch} ${anchor.x} ${anchor.y})`);
    origin.setAttribute('transform', `translate(${-anchor.x} ${-anchor.y})`);
    farWing.setAttribute('transform', `rotate(${farAngle} 350 432)`);
    nearWing.setAttribute('transform', `rotate(${nearAngle} 315 524)`);
    tail.setAttribute('transform', `rotate(${tailAngle} 445 520)`);
  }

  function frame(now) {
    const elapsed = now - startTime;
    const flightElapsed = Math.max(0, elapsed - CONFIG.flight.delayMs);
    const progress = flightProgress(Math.min(flightElapsed, totalFlightMs));
    const pose = poseAtProgress(progress);
    updateBird(pose.point, pose.scale, pose.pitch,
      CONFIG.wings.farAngle, CONFIG.wings.nearAngle, 0, 0);
    updateDots(elapsed, progress);

    if (elapsed < CONFIG.scene.durationMs) frameId = requestAnimationFrame(frame);
    else frameId = 0;
  }

  async function play() {
    cancelAnimationFrame(frameId);
    await Promise.all([art.decode(), branch.decode()]);
    resizeScene();
    paper.setAttribute('fill', CONFIG.scene.paper);
    makeDots();
    const start = path.getPointAtLength(0);
    updateBird(start, CONFIG.flight.startScale, 0,
      CONFIG.wings.farAngle, CONFIG.wings.nearAngle, 0, 0);
    startTime = performance.now();
    frameId = requestAnimationFrame(frame);
  }

  addEventListener('resize', resizeScene, { passive: true });
  replay.addEventListener('click', play);
  resizeScene();

  if (reducedMotion.matches) {
    updateBird(path.getPointAtLength(0), CONFIG.flight.startScale, 0,
      CONFIG.wings.farAngle, CONFIG.wings.nearAngle, 0, 0);
    replay.disabled = true;
    replay.textContent = 'Motion reduced';
  } else {
    play();
  }
})();
