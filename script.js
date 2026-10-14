(() => {
  'use strict';

  const FILM_SECONDS = 8;
  const MUSIC_START_SECONDS = 14;
  const MUSIC_END_SECONDS = 230;
  const AUTO_SCROLL_DURATION = 52000;
  const AUTO_SCROLL_RESUME_DELAY = 900;
  const EVENT = {
    title: 'Wedding of Brinda Yellapu & Dr. Malla Venkata Satya Sai Chaitanya',
    start: '2026-11-15T22:14:00+05:30',
    location: 'Pentakota Convention Hall, Near Ring Road, Anakapalle, Andhra Pradesh',
    description: 'Brinda and Sai Chaitanya request the honour of your presence. Muhurtham: 10:14 PM.'
  };

  const $ = id => document.getElementById(id);
  const intro = $('intro');
  const video = $('intro-video');
  const site = $('site');
  const audio = $('wedding-audio');
  const musicControl = $('music-control');
  const musicLabel = $('music-label');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let introFinished = false;
  let introTimer;
  let fadeTimer;
  let toastTimer;
  let autoScrollFrame;
  let autoScrollResumeTimer;
  let autoScrollSpeed;
  let autoScrolling = false;
  let musicPausedByVisitor = false;
  let musicStartSeconds = 0;
  let musicEndSeconds = Infinity;

  function setMusicState(playing) {
    musicControl.classList.toggle('is-playing', playing);
    musicControl.setAttribute('aria-pressed', String(playing));
    musicControl.setAttribute('aria-label', playing ? 'Pause wedding music' : 'Play wedding music');
    musicLabel.textContent = playing ? 'Music playing' : 'Play music';
  }

  function updateMusicWindow() {
    const duration = audio.duration;
    if (!Number.isFinite(duration) || duration <= 0) return false;
    musicEndSeconds = Math.min(duration, MUSIC_END_SECONDS);
    musicStartSeconds = Math.min(MUSIC_START_SECONDS, Math.max(0, musicEndSeconds - .25));
    return true;
  }

  function prepareMusicPosition(restart = false) {
    if (audio.readyState === HTMLMediaElement.HAVE_NOTHING) return false;
    updateMusicWindow();
    if (restart || audio.currentTime < musicStartSeconds || audio.currentTime >= musicEndSeconds) {
      audio.currentTime = musicStartSeconds;
    }
    return true;
  }

  function waitForMetadata(media) {
    if (media.readyState >= HTMLMediaElement.HAVE_METADATA) return Promise.resolve(true);
    return new Promise(resolve => {
      const ready = () => resolve(true);
      const failed = () => resolve(false);
      media.addEventListener('loadedmetadata', ready, { once: true });
      media.addEventListener('error', failed, { once: true });
    });
  }

  function watchMusicLimit() {
    if (audio.currentTime >= musicEndSeconds - .08) {
      audio.currentTime = musicStartSeconds;
      audio.volume = 1;
      if (audio.paused) audio.play().catch(() => setMusicState(false));
    }
  }

  async function playWeddingMusic(restart = false, userInitiated = false) {
    clearInterval(fadeTimer);
    if (userInitiated) musicPausedByVisitor = false;
    prepareMusicPosition(restart);
    audio.muted = false;
    audio.volume = 1;
    try {
      await audio.play();
      setMusicState(true);
      fadeTimer = setInterval(watchMusicLimit, 100);
      return true;
    } catch (_) {
      setMusicState(false);
      return false;
    }
  }

  async function startMusicAutomatically(restart = false) {
    if (!audio.paused || musicPausedByVisitor) return true;
    return playWeddingMusic(restart, false);
  }

  function stopAutoScroll() {
    autoScrolling = false;
    cancelAnimationFrame(autoScrollFrame);
  }

  function resumeAutoScrollAfterInteraction() {
    stopAutoScroll();
    clearTimeout(autoScrollResumeTimer);
    if (!introFinished || reducedMotion) return;
    autoScrollResumeTimer = window.setTimeout(startAutoScroll, AUTO_SCROLL_RESUME_DELAY);
  }

  function startAutoScroll() {
    if (reducedMotion) return;
    stopAutoScroll();
    const destination = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    if (destination <= window.scrollY + 1) return;
    if (!autoScrollSpeed) autoScrollSpeed = Math.max(.024, destination / AUTO_SCROLL_DURATION);
    let previousTime = performance.now();
    autoScrolling = true;
    function step(now) {
      if (!autoScrolling) return;
      const pageEnd = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      const elapsed = Math.min(64, now - previousTime);
      previousTime = now;
      const nextY = Math.min(pageEnd, window.scrollY + autoScrollSpeed * elapsed);
      window.scrollTo({ top: nextY, behavior: 'instant' });
      if (pageEnd - nextY > 1) autoScrollFrame = requestAnimationFrame(step);
      else {
        window.scrollTo({ top: pageEnd, behavior: 'instant' });
        autoScrolling = false;
      }
    }
    autoScrollFrame = requestAnimationFrame(step);
  }

  function finishIntro() {
    if (introFinished) return;
    introFinished = true;
    clearTimeout(introTimer);
    intro.classList.add('is-ending');
    site.removeAttribute('inert');
    document.body.classList.remove('intro-active');
    video.pause();
    window.setTimeout(() => {
      intro.classList.add('is-hidden');
      startMusicAutomatically(false);
      window.setTimeout(startAutoScroll, 350);
    }, reducedMotion ? 20 : 900);
  }

  async function startIntro(userInitiated = false) {
    introFinished = false;
    clearTimeout(introTimer);
    if (userInitiated) audio.pause();
    musicPausedByVisitor = false;
    clearInterval(fadeTimer);
    clearTimeout(autoScrollResumeTimer);
    autoScrollSpeed = null;
    setMusicState(false);
    intro.classList.remove('is-hidden', 'is-ending');
    site.setAttribute('inert', '');
    document.body.classList.add('intro-active');
    video.muted = true;
    const musicAttempt = playWeddingMusic(true, userInitiated);
    const videoReady = await waitForMetadata(video);
    if (introFinished) return;
    if (!videoReady) {
      finishIntro();
      return;
    }
    video.currentTime = 0;
    const [videoPlaying, musicPlaying] = await Promise.all([
      video.play().then(() => true).catch(() => false),
      musicAttempt
    ]);
    if (introFinished) return;
    if (!videoPlaying) {
      finishIntro();
      return;
    }
    if (!musicPlaying) setMusicState(false);
    introTimer = window.setTimeout(finishIntro, 10500);
  }

  video.addEventListener('timeupdate', () => {
    if ((video.currentTime || 0) >= FILM_SECONDS - .08) finishIntro();
  });
  video.addEventListener('ended', finishIntro);
  video.addEventListener('error', finishIntro);
  video.addEventListener('playing', () => startMusicAutomatically(false));
  document.querySelector('.skip-link').addEventListener('click', () => {
    playWeddingMusic(false, true);
    finishIntro();
  });

  musicControl.addEventListener('click', () => {
    if (audio.paused) playWeddingMusic(false, true);
    else {
      musicPausedByVisitor = true;
      audio.pause();
      clearInterval(fadeTimer);
      setMusicState(false);
    }
  });

  $('replay-opening').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    startIntro(true);
  });

  async function unlockMusicFromGesture(event) {
    if (event.target.closest('#music-control, #replay-opening') || musicPausedByVisitor || !audio.paused) return;
    if (!introFinished && video.currentTime > 0) {
      audio.currentTime = Math.min(musicEndSeconds - .25, musicStartSeconds + video.currentTime);
    }
    const playing = await playWeddingMusic(false, true);
    if (playing) {
      document.removeEventListener('pointerdown', unlockMusicFromGesture);
      document.removeEventListener('keydown', unlockMusicFromGesture);
    }
  }
  ['pointerdown', 'keydown'].forEach(eventName => {
    document.addEventListener(eventName, unlockMusicFromGesture);
  });

  audio.addEventListener('loadedmetadata', () => {
    updateMusicWindow();
    if (audio.currentTime < musicStartSeconds || audio.currentTime >= musicEndSeconds) {
      audio.currentTime = musicStartSeconds;
    }
  });
  audio.addEventListener('canplay', () => startMusicAutomatically(false), { once: true });
  window.addEventListener('load', () => startMusicAutomatically(false), { once: true });
  window.addEventListener('pageshow', () => {
    startMusicAutomatically(false);
  });
  audio.addEventListener('play', () => setMusicState(true));
  audio.addEventListener('pause', () => setMusicState(false));
  audio.addEventListener('error', () => {
    clearInterval(fadeTimer);
    setMusicState(false);
    musicLabel.textContent = 'Music unavailable';
  });

  ['pointerdown', 'wheel', 'touchstart', 'touchmove', 'keydown'].forEach(eventName => {
    window.addEventListener(eventName, resumeAutoScrollAfterInteraction, { passive: true });
  });
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && introFinished && !reducedMotion) resumeAutoScrollAfterInteraction();
  });
  window.addEventListener('resize', () => {
    if (introFinished && !reducedMotion && !autoScrolling) resumeAutoScrollAfterInteraction();
  }, { passive: true });

  audio.addEventListener('ended', () => {
    if (!musicPausedByVisitor) playWeddingMusic(true);
  });
  if (reducedMotion) finishIntro();
  else startIntro(false);

  if ('IntersectionObserver' in window && !reducedMotion) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .12, rootMargin: '0px 0px -25px' });
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
  } else {
    document.querySelectorAll('.reveal').forEach(element => element.classList.add('is-visible'));
  }

  const weddingInstant = new Date(EVENT.start).getTime();
  const pad = number => String(number).padStart(2, '0');
  function updateCountdown() {
    const remaining = Math.max(0, weddingInstant - Date.now());
    const seconds = Math.floor(remaining / 1000);
    $('days').textContent = pad(Math.floor(seconds / 86400));
    $('hours').textContent = pad(Math.floor((seconds % 86400) / 3600));
    $('minutes').textContent = pad(Math.floor((seconds % 3600) / 60));
    $('seconds').textContent = pad(seconds % 60);
    if (!remaining) $('countdown-message').textContent = 'The beautiful beginning is here ✦';
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  function showToast(message) {
    const toast = $('toast');
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 3000);
  }

  const escapeIcs = value => value.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
  const icsDate = value => new Date(value).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  $('save-date').addEventListener('click', () => {
    const start = new Date(EVENT.start);
    const end = new Date(start.getTime() + 60 * 60 * 1000);
    const calendar = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Brinda and Sai Chaitanya//Wedding Invitation//EN',
      'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', 'BEGIN:VEVENT',
      'UID:brinda-sai-chaitanya-20261115@wedding-invitation',
      `DTSTAMP:${icsDate(new Date())}`, `DTSTART:${icsDate(start)}`, `DTEND:${icsDate(end)}`,
      `SUMMARY:${escapeIcs(EVENT.title)}`, `LOCATION:${escapeIcs(EVENT.location)}`,
      `DESCRIPTION:${escapeIcs(EVENT.description)}`, 'END:VEVENT', 'END:VCALENDAR'
    ].join('\r\n');
    const url = URL.createObjectURL(new Blob([calendar], { type: 'text/calendar;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Brinda-Sai-Chaitanya-Wedding.ics';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    showToast('The wedding date has been added to your downloads');
  });

  $('share-invitation').addEventListener('click', async () => {
    const data = {
      title: 'Brinda & Sai Chaitanya — Wedding Invitation',
      text: 'Brinda and Sai Chaitanya request the honour of your presence on 15 November 2026 in Anakapalle.',
      url: location.href
    };
    try {
      if (navigator.share) await navigator.share(data);
      else {
        await navigator.clipboard.writeText(`${data.text} ${data.url}`);
        showToast('Invitation link copied');
      }
    } catch (error) {
      if (error.name !== 'AbortError') showToast('Please copy the page link to share');
    }
  });
})();
