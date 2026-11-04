const Icon = ({ name }) => {
  const paths = {
    arrow: <><path d="M4 12h16"/><path d="m13 5 7 7-7 7"/></>,
    down: <><path d="m6 9 6 6 6-6"/></>,
    sound: <><path d="M9 9 5.5 12H3v0h2.5L9 15V9Z"/><path d="M13 9a5 5 0 0 1 0 6M16 6a9 9 0 0 1 0 12"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="1"/><path d="M7 3v4M17 3v4M3 10h18"/></>,
    pin: <><path d="M20 10c0 5.5-8 12-8 12S4 15.5 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.6"/></>,
    share: <><circle cx="18" cy="5" r="2"/><circle cx="6" cy="12" r="2"/><circle cx="18" cy="19" r="2"/><path d="m8 11 8-5M8 13l8 5"/></>,
    replay: <><path d="M3 11a9 9 0 1 1 2 7"/><path d="M3 4v7h7"/></>,
    close: <><path d="M5 5 19 19M19 5 5 19"/></>
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
};

const Flourish = () => <div className="flourish" aria-hidden="true"><span/><b>✿</b><span/></div>;

export default function Invitation() {
  return <>
    <div className="film" id="film" role="dialog" aria-modal="true" aria-label="Wedding invitation opening film">
      <div className="film__envelope-stage">
        <div className="film__envelope">
          <img className="film__envelope-image" src="/assets/minimalist-sage-ivory-envelope.png" alt="Sage and ivory wedding envelope with a gold wax seal"/>
          <button type="button" className="film__open" id="film-open" aria-label="Open the wedding invitation"/>
        </div>
      </div>
      <div className="film__video-stage">
        <video id="film-video" playsInline preload="auto" poster="/assets/floral-mandap-watercolor.webp" aria-label="Brinda and Chaitanya wedding opening film"><source src="/assets/floral-opening-film.mp4" type="video/mp4" /></video>
      </div>
    </div>

    <audio id="wedding-audio" preload="auto" loop><source src="/assets/yemaaya-chesave-manasaa-full.mp3" type="audio/mpeg" /></audio>

    <div className="site" id="site">
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Brinda and Chaitanya, top of page"><span className="brand__monogram">B<span>&</span>C</span><span className="brand__small">THE WEDDING</span></a>
        <nav className="site-header__nav" aria-label="Main navigation"><a href="#couple">Our story</a><a href="#celebration">The celebration</a><a href="#venue">The venue</a></nav>
        <button className="audio-button" type="button" id="music-control" aria-pressed="false" aria-label="Play wedding music"><Icon name="sound"/><span id="music-label">Music off</span><span className="audio-button__dot"/></button>
      </header>

      <main>
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="hero__art reveal" aria-label="Floral watercolor wedding invitation for Brinda and Chaitanya">
            <img src="/assets/floral-arch-watercolor.webp" alt="Hand painted ivory arch, blush pink roses, sage greenery and gold detailing" fetchPriority="high"/>
            <div className="hero__art-copy"><span className="hero__invite-label">JOYFULLY INVITE YOU TO CELEBRATE</span><h1 id="hero-title"><span>Brinda</span><span className="hero__and">&</span><span>Chaitanya</span></h1><Flourish/><p>Sunday, 15 November 2026</p><small>Auspicious Muhurtham · 10:14 PM</small></div>
            <span className="hero__art-corner">A DAY TO REMEMBER • A LOVE TO CELEBRATE</span>
          </div>
        </section>

        <section className="couple section-shell" id="couple" aria-labelledby="couple-title">
          <div className="section-heading reveal"><span className="section-number">01 / THE TWO HEARTS</span><p className="handwritten">A little note from us</p><h2 id="couple-title">A new chapter,<br/><em>written together.</em></h2><Flourish/><p className="section-heading__description">With the love of our families and the blessings of those closest to us, we begin our forever. Your presence will make our day complete.</p></div>
          <div className="couple__cards">
            <article className="person-card reveal"><div className="person-card__leaf" aria-hidden="true">❀</div><p className="person-card__role">THE BRIDE</p><h3>Brinda</h3><p className="person-card__degree">BHMS</p><span className="person-card__divider"/><p className="person-card__relationship">Loving daughter of</p><p className="person-card__parents">Yellapu Devendra Kumar <i>&</i><br/>Priya Darshini</p></article>
            <div className="couple__between reveal"><span className="couple__rule"/><b>&</b><span className="couple__rule"/></div>
            <article className="person-card reveal"><div className="person-card__leaf" aria-hidden="true">❀</div><p className="person-card__role">THE GROOM</p><h3>Chaitanya</h3><p className="person-card__degree">MBBS, MD</p><span className="person-card__divider"/><p className="person-card__relationship">Loving son of</p><p className="person-card__parents">Malla Murali <i>&</i><br/>Sujatha</p></article>
          </div>
          <p className="couple__formal reveal">Brinda Yellapu <i>&</i> Chaitanya</p>
        </section>

        <section className="feature" aria-label="A moment of togetherness">
          <div className="feature__visual reveal"><img src="/assets/floral-mandap-watercolor.webp" alt="Watercolor floral arch leading to a beautifully decorated wedding mandap" loading="lazy"/><span className="feature__picture-label">A BEAUTIFUL BEGINNING</span></div>
        </section>

        <section className="celebration section-shell" id="celebration" aria-labelledby="celebration-title">
          <div className="section-heading reveal"><span className="section-number">02 / MARK YOUR CALENDAR</span><p className="handwritten">Save our special day</p><h2 id="celebration-title">The day we say <em>“I do.”</em></h2><Flourish/></div>
          <div className="event-card reveal"><div className="event-card__date"><p>NOVEMBER</p><strong>15</strong><span>SUNDAY · 2026</span></div><div className="event-card__line"/><div className="event-card__info"><p className="event-card__eyebrow">THE WEDDING CEREMONY</p><h3>Dinner · 7 PM</h3><div className="event-card__detail"><span>✧</span><p>Auspicious Muhurtham<br/><strong>10:14 PM · IST</strong></p></div><div className="event-card__detail"><span>✧</span><p>Pentakota Convention Hall<br/><strong>Near Ring Road, Anakapalle</strong></p></div><button className="button button--sage" type="button" id="save-date"><Icon name="calendar"/> Save to calendar</button></div></div>
          <div className="countdown reveal" aria-labelledby="countdown-title"><p id="countdown-title">COUNTING THE DAYS TO FOREVER</p><div className="countdown__values" aria-live="off"><div><strong id="days">00</strong><span>DAYS</span></div><div><strong id="hours">00</strong><span>HOURS</span></div><div><strong id="minutes">00</strong><span>MINUTES</span></div><div><strong id="seconds">00</strong><span>SECONDS</span></div></div><p id="countdown-message">Every moment brings us closer to you.</p></div>
        </section>

        <section className="venue" id="venue" aria-labelledby="venue-title"><div className="venue__image" aria-hidden="true"><img src="/assets/floral-arch-watercolor.webp" alt="" loading="lazy"/></div><div className="venue__card reveal"><span className="section-number">03 / WHERE LOVE GATHERS</span><p className="handwritten">Find your way to us</p><h2 id="venue-title">The wedding<br/><em>venue.</em></h2><Flourish/><h3>Pentakota<br/>Convention Hall</h3><p>Near Ring Road<br/>Anakapalle, Andhra Pradesh</p><a className="button button--sage" href="https://www.google.com/maps/search/?api=1&query=Pentakota%20Convention%20Hall%20Near%20Ring%20Road%20Anakapalle" data-map-link target="_blank" rel="noopener noreferrer"><Icon name="pin"/> Get directions</a><span className="venue__footnote">Your presence is the greatest gift.</span></div></section>

        <section className="ending section-shell" aria-labelledby="ending-title"><div className="ending__inner reveal"><span className="ending__flower" aria-hidden="true">❀</span><span className="section-number">WITH GRATEFUL HEARTS</span><h2 id="ending-title"><span>Our story begins with love.</span><em>It becomes unforgettable with you.</em></h2><p>Please join us for a beautiful celebration of joy, togetherness, and a lifetime of memories.</p><p className="ending__names">Brinda <i>&</i> Chaitanya</p><p className="ending__date">15 • 11 • 2026 — ANAKAPALLE</p><button type="button" className="button button--outline" id="share-invitation"><Icon name="share"/> Share this invitation</button></div></section>
      </main>
      <footer className="footer"><span className="footer__brand">B <i>&</i> C</span><span>MADE WITH LOVE FOR OUR BEAUTIFUL DAY</span><button type="button" id="replay-opening"><Icon name="replay"/> Replay opening</button></footer>
    </div>
    <div className="toast" id="toast" role="status" aria-live="polite"/>
  </>;
}
