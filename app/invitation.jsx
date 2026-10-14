export default function Invitation() {
  return (
    <>
      <a className="skip-link" href="#invitation">Skip opening film</a>

      <div className="intro" id="intro" aria-label="Wedding invitation opening film">
        <video id="intro-video" autoPlay muted playsInline preload="auto" poster="/assets/hero-mandap-v2.png">
          <source src="/assets/opening-eight-seconds.mp4" type="video/mp4" />
        </video>
        <div className="intro__fade" aria-hidden="true" />
      </div>

      <audio id="wedding-audio" preload="auto" autoPlay>
        <source src="/assets/jashn-e-bahaaraa-flute.mp3" type="audio/mpeg" />
      </audio>

      <div className="site" id="site" inert={true}>
        <header className="nav-bar">
          <a className="crest" href="#home" aria-label="Brinda and Sai Chaitanya, back to top">
            <span>B</span><i aria-hidden="true">♥</i><span>C</span>
          </a>
          <nav aria-label="Invitation sections">
            <a href="#story">The Couple</a>
            <a href="#ceremony">The Ceremony</a>
            <a href="#venue">The Venue</a>
          </nav>
          <button className="music-control" id="music-control" type="button" aria-label="Play wedding music" aria-pressed="false">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18V5l11-2v13M9 9l11-2M6 21c-1.7 0-3-1-3-2.3s1.3-2.3 3-2.3 3 1 3 2.3S7.7 21 6 21Zm11-2c-1.7 0-3-1-3-2.3s1.3-2.3 3-2.3 3 1 3 2.3-1.3 2.3-3 2.3Z" /></svg>
            <span id="music-label">Play music</span>
            <span className="music-control__pulse" aria-hidden="true" />
          </button>
        </header>

        <main id="invitation">
          <section className="hero" id="home" aria-labelledby="hero-title">
            <img className="hero__image" src="/assets/hero-mandap-v2.png" alt="An elegant flower-filled South Indian wedding mandap at golden hour" />
            <div className="hero__shade" aria-hidden="true" />
            <div className="hero__frame" aria-hidden="true" />
            <div className="hero__content">
              <p className="eyebrow reveal">With joyful hearts &amp; the blessings of our families</p>
              <h1 id="hero-title" className="reveal"><span>Brinda</span><i className="hero__love" aria-label="and"><b aria-hidden="true">♥</b></i><span>Sai Chaitanya</span></h1>
              <p className="hero__request reveal">request the joy of your presence<br />as two families become one and forever begins.</p>
              <div className="hero__date reveal"><b>15</b><span>Sunday<br />November 2026</span><em /><span>10:14 PM<br />Anakapalle</span></div>
              <a className="hero__arrow reveal" href="#story" aria-label="Continue to invitation"><span>Enter the celebration</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5" /></svg></a>
            </div>
          </section>

          <section className="welcome" id="story" aria-labelledby="welcome-title">
            <div className="welcome__ornament" aria-hidden="true"><span /><img src="/assets/lotus-mark.svg" alt="" /><span /></div>
            <p className="chapter reveal">01 · WITH EVERY BLESSING</p>
            <h2 id="welcome-title" className="reveal">A promise carried by love,<br /><em>blessed by family.</em></h2>
            <p className="welcome__intro reveal">A wedding lives for a day, but its blessings echo for a lifetime. Come stand beside us as two hearts, two families, and countless prayers become one beautiful forever.</p>

            <div className="names">
              <article className="name-card reveal">
                <span>The bride</span>
                <h3>Brinda <small>Yellapu</small></h3>
                <p className="degree">BHMS</p>
                <div className="name-card__rule" />
                <p className="relation">Beloved daughter of</p>
                <p className="parents">Yellapu Devendra Kumar<br /><i>&amp;</i> Priya Darshini</p>
              </article>
              <div className="names__amp reveal" aria-hidden="true"><img src="/assets/lotus-mark.svg" alt="" /></div>
              <article className="name-card reveal">
                <span>The groom</span>
                <h3>Sai Chaitanya</h3>
                <p className="degree">MBBS, MD</p>
                <div className="name-card__rule" />
                <p className="relation">Beloved son of</p>
                <p className="parents">Malla Murali<br /><i>&amp;</i> Sujatha</p>
              </article>
            </div>
            <p className="full-name reveal">Brinda Yellapu <i>&amp;</i> Dr. Malla Venkata Satya Sai Chaitanya</p>
          </section>

          <section className="promise" aria-labelledby="promise-title">
            <div className="promise__image-wrap reveal">
              <img src="/assets/sacred-details-v2.png" alt="Gold wedding rings, jasmine, lotus petals and a glowing brass lamp on ivory silk" />
              <span className="promise__image-label">A PROMISE FOR ALL OUR TOMORROWS</span>
            </div>
            <div className="promise__copy reveal">
              <p className="chapter">A NOTE FROM US</p>
              <span className="quote-mark" aria-hidden="true">“</span>
              <h2 id="promise-title">We found in each other<br /><em>a home for every tomorrow.</em></h2>
              <p>Come witness the vows, share the laughter, and bless the first page of the life we are about to write together.</p>
              <strong>Brinda <i>&amp;</i> Sai Chaitanya</strong>
            </div>
          </section>

          <section className="ceremony" id="ceremony" aria-labelledby="ceremony-title">
            <div className="ceremony__heading reveal">
              <p className="chapter chapter--gold">02 · THE SACRED MOMENT</p>
              <h2 id="ceremony-title">When two paths<br /><em>become one.</em></h2>
              <p>We would be honoured by your presence and blessings as sacred vows are spoken and a beautiful new chapter begins.</p>
            </div>

            <div className="ceremony__layout">
              <div className="date-card reveal">
                <span className="date-card__small">Sunday</span>
                <strong>15</strong>
                <span className="date-card__month">November <i>2026</i></span>
                <div className="date-card__flower" aria-hidden="true">✦</div>
                <span className="date-card__small">Auspicious Muhurtham</span>
                <p className="date-card__time">10:14 <small>PM</small></p>
                <p className="date-card__venue">Pentakota Convention Hall<br />Near Ring Road, Anakapalle</p>
                <button className="outline-action" id="save-date" type="button">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 2v4m12-4v4M3 9h18M5 4h14a2 2 0 0 1 2 2v14H3V6a2 2 0 0 1 2-2Zm7 8v5m-2.5-2.5h5" /></svg>
                  Save the date
                </button>
              </div>
              <div className="ceremony__image reveal">
                <img src="/assets/ceremony-aisle-v2.png" alt="A candlelit flower-lined ceremonial aisle leading to an ornate mandap" />
              </div>
            </div>
          </section>

          <section className="countdown" aria-labelledby="countdown-title">
            <p className="chapter reveal">COUNTING DOWN TO THE CELEBRATION</p>
            <h2 id="countdown-title" className="reveal">Every passing moment<br /><em>brings us closer to you.</em></h2>
            <div className="countdown__clock reveal" aria-label="Countdown to the wedding">
              <div><strong id="days">00</strong><span>Days</span></div><i>:</i>
              <div><strong id="hours">00</strong><span>Hours</span></div><i>:</i>
              <div><strong id="minutes">00</strong><span>Minutes</span></div><i>:</i>
              <div><strong id="seconds">00</strong><span>Seconds</span></div>
            </div>
            <p id="countdown-message" className="countdown__message">until the beginning of forever</p>
          </section>

          <section className="venue" id="venue" aria-labelledby="venue-title">
            <div className="venue__panel venue__panel--image" aria-hidden="true" />
            <div className="venue__panel venue__panel--copy reveal">
              <p className="chapter chapter--gold">03 · THE GATHERING PLACE</p>
              <h2 id="venue-title">Pentakota<br /><em>Convention Hall</em></h2>
              <div className="venue__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d="M12 22s7-6.1 7-13a7 7 0 1 0-14 0c0 6.9 7 13 7 13Zm0-10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" /></svg>
              </div>
              <p className="venue__address">Near Ring Road<br />Anakapalle, Andhra Pradesh</p>
              <p className="venue__note">Come for the vows, stay for the joy, and leave with a heart full of memories.</p>
              <a className="gold-action" href="https://www.google.com/maps/search/?api=1&amp;query=Pentakota%20Convention%20Hall%20Near%20Ring%20Road%20Anakapalle" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18-6 3V6l6-3 6 3 6-3v15l-6 3-6-3Zm0 0V3m6 18V6" /></svg>
                Get directions
              </a>
            </div>
          </section>

          <section className="closing" aria-labelledby="closing-title">
            <div className="closing__frame reveal">
              <img src="/assets/lotus-mark.svg" alt="" />
              <p className="chapter">FROM OUR HEARTS</p>
              <h2 id="closing-title">The vows will make us one.<br /><em>Your presence will make the memory whole.</em></h2>
              <p>Stand beside us, share our happiness, and bless the beginning of all our tomorrows.</p>
              <strong>With love,<br /><i>Brinda &amp; Sai Chaitanya</i></strong>
              <small>15 · 11 · 2026 | ANAKAPALLE</small>
            </div>
          </section>
        </main>

        <footer className="footer">
          <div className="footer__crest">B <i>&amp;</i> C</div>
          <p>Two hearts · one promise · a lifetime together</p>
          <div className="footer__actions">
            <button type="button" id="share-invitation">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 8a3 3 0 1 0-2.8-4M6 15a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm12 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM8.6 16.5l6.8-3M8.6 7.5l6.8 3" /></svg>
              Share invitation
            </button>
            <button type="button" id="replay-opening">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4v6h6M5.3 16A8 8 0 1 0 6 7.3L4 10" /></svg>
              Replay opening
            </button>
          </div>
        </footer>
        <div className="toast" id="toast" role="status" aria-live="polite" />
      </div>
    </>
  );
}
