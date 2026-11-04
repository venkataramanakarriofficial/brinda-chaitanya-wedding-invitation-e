'use client';

import { useEffect } from 'react';

const EVENT = {
  start: '2026-11-15T22:14:00+05:30',
  title: 'Wedding of Brinda Yellapu & Dr. Malla Venkata Satya Sai Chaitanya',
  location: 'Pentakota Convention Hall, Near Ring Road, Anakapalle, Andhra Pradesh',
  description: 'You are invited to celebrate with Brinda and Sai Chaitanya. Wedding muhurtham at 10:14 PM IST.'
};

export default function InvitationController() {
  useEffect(() => {
    const find = id => document.getElementById(id);
    const film = find('film');
    const video = find('film-video');
    const audio = find('wedding-audio');
    const music = find('music-control');
    const musicLabel = find('music-label');
    if (!film || !video || !audio || !music || !musicLabel) return;

    const controller = new AbortController();
    const listen = (target, type, handler, options = {}) => target?.addEventListener(type, handler, { ...options, signal: controller.signal });
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let filmClosed = false;
    let filmFallback;
    let toastTimer;
    let countdownTimer;
    let filmHideTimer;
    let observer;

    const toast = message => {
      const element = find('toast');
      if (!element) return;
      element.textContent = message;
      element.classList.add('is-visible');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => element.classList.remove('is-visible'), 3400);
    };

    const setMusic = () => {
      const playing = !audio.paused;
      music.setAttribute('aria-pressed', String(playing));
      music.setAttribute('aria-label', playing ? 'Pause wedding music' : 'Play wedding music');
      musicLabel.textContent = playing ? 'Music on' : 'Music off';
      music.classList.toggle('is-playing', playing);
    };
    const startMusic = () => audio.play().then(setMusic).catch(() => { setMusic(); });
    listen(music, 'click', () => { if (audio.paused) startMusic(); else audio.pause(); });
    listen(audio, 'play', setMusic);
    listen(audio, 'pause', setMusic);
    listen(audio, 'error', () => { setMusic(); toast('Music is unavailable on this device.'); });

    const closeFilm = () => {
      if (filmClosed) return;
      filmClosed = true;
      clearTimeout(filmFallback);
      video.pause();
      film.classList.add('film--closed');
      film.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('film-active');
      filmHideTimer = window.setTimeout(() => { film.hidden = true; }, 780);
    };

    const openFilm = () => {
      clearTimeout(filmFallback);
      clearTimeout(filmHideTimer);
      filmClosed = false;
      film.hidden = false;
      film.setAttribute('aria-hidden', 'false');
      film.classList.remove('film--closed');
      document.body.classList.add('film-active');
      const progress = find('film-progress');
      if (progress) progress.style.width = '0%';
      video.currentTime = 0;
      video.muted = true;
      const result = video.play();
      result?.catch(() => { find('film-enter')?.classList.add('film__enter--emphasis'); });
      filmFallback = setTimeout(closeFilm, 12500);
    };

    listen(find('film-skip'), 'click', closeFilm);
    listen(find('film-enter'), 'click', closeFilm);
    listen(find('skip-opening'), 'click', closeFilm);
    listen(find('replay-opening'), 'click', () => { window.scrollTo({ top: 0, behavior: 'instant' }); openFilm(); });
    listen(video, 'ended', closeFilm);
    listen(video, 'error', closeFilm);
    listen(video, 'timeupdate', () => {
      if (video.duration && Number.isFinite(video.duration)) {
        const progress = find('film-progress');
        if (progress) progress.style.width = `${Math.min(100, video.currentTime / video.duration * 100)}%`;
      }
    });
    listen(document, 'keydown', event => { if (event.key === 'Escape' && !filmClosed) closeFilm(); });

    // Never make the soundtrack a prerequisite for entering the invitation.
    // Mobile browsers normally require a user gesture to start audio.
    if (reducedMotion) closeFilm();
    else openFilm();

    if ('IntersectionObserver' in window && !reducedMotion) {
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } });
      }, { threshold: 0.09, rootMargin: '0px 0px -25px 0px' });
      document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
    } else document.querySelectorAll('.reveal').forEach(element => element.classList.add('is-visible'));

    const target = new Date(EVENT.start).getTime();
    const pad = num => String(num).padStart(2, '0');
    const updateClock = () => {
      const remaining = Math.max(0, Math.floor((target - Date.now()) / 1000));
      [['days', Math.floor(remaining / 86400)], ['hours', Math.floor((remaining % 86400) / 3600)], ['minutes', Math.floor((remaining % 3600) / 60)], ['seconds', remaining % 60]].forEach(([id, value]) => { const item = find(id); if (item) item.textContent = pad(value); });
      if (remaining === 0) find('countdown-message').textContent = 'The beautiful celebration is here. ✿';
    };
    updateClock();
    countdownTimer = setInterval(updateClock, 1000);

    const escapeIcs = text => text.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
    const icsDate = value => new Date(value).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    listen(find('save-date'), 'click', () => {
      const start = new Date(EVENT.start);
      const end = new Date(start.getTime() + 60 * 60 * 1000);
      const contents = [
        'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Wedding of Brinda and Sai Chaitanya//EN', 'CALSCALE:GREGORIAN',
        'BEGIN:VEVENT', 'UID:brinda-sai-chaitanya-wedding-20261115@invitation', `DTSTAMP:${icsDate(new Date())}`, `DTSTART:${icsDate(start)}`, `DTEND:${icsDate(end)}`,
        `SUMMARY:${escapeIcs(EVENT.title)}`, `LOCATION:${escapeIcs(EVENT.location)}`, `DESCRIPTION:${escapeIcs(EVENT.description)}`, 'END:VEVENT', 'END:VCALENDAR'
      ].join('\r\n');
      const url = URL.createObjectURL(new Blob([contents], { type: 'text/calendar;charset=utf-8' }));
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Brinda-and-Sai-Chaitanya-Wedding.ics';
      document.body.appendChild(link);
      link.click(); link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      toast('Calendar invitation downloaded.');
    });

    listen(find('share-invitation'), 'click', async () => {
      const data = { title: 'Brinda & Sai Chaitanya — Wedding Invitation', text: 'Please celebrate our wedding on Sunday, 15 November 2026 at 10:14 PM in Anakapalle.', url: window.location.href.split('#')[0] };
      try {
        if (navigator.share) await navigator.share(data);
        else if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(`${data.text}\n${data.url}`); toast('Invitation link copied!'); }
        else { const temp = document.createElement('textarea'); temp.value = data.url; document.body.appendChild(temp); temp.select(); document.execCommand('copy'); temp.remove(); toast('Invitation link copied!'); }
      } catch (error) { if (error?.name !== 'AbortError') toast('Please copy the link from your browser to share.'); }
    });

    // Original uploaded movie ends with "06.00 PM"; the site intentionally uses
    // its opening sequence only because the confirmed project muhurtham is 10:14 PM.
    return () => {
      controller.abort();
      clearTimeout(filmFallback);
      clearTimeout(filmHideTimer);
      clearTimeout(toastTimer);
      clearInterval(countdownTimer);
      observer?.disconnect();
      video.pause(); audio.pause();
    };
  }, []);
  return null;
}
