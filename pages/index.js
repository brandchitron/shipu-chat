import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function useCounter(target, active, duration = 2200) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return val;
}

export default function Home() {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(false);
  const [slideIdx, setSlideIdx] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -400, y: -400 });

  const [heroRef, heroInView]             = useInView(0.05);
  const [servicesRef, servicesInView]     = useInView();
  const [statsRef, statsInView]           = useInView();
  const [featuresRef, featuresInView]     = useInView();
  const [testimonialRef, testimonialInView] = useInView();

  const s1 = useCounter(10000, statsInView);
  const s2 = useCounter(99,    statsInView);
  const s3 = useCounter(50,    statsInView);
  const s4 = useCounter(70,    statsInView);

  const testimonials = [
    { name: 'Rahul Sharma',  role: 'CEO, TechCorp',           avatar: 'RS', stars: 5, text: 'ShiPu Ai transformed our customer support overnight. Response times dropped 80% in the very first week of deployment.' },
    { name: 'Priya Singh',   role: 'Product Manager, Flipkart',avatar: 'PS', stars: 5, text: 'The AI understands context so naturally — it\'s like having a brilliant team member who never sleeps and never makes mistakes.' },
    { name: 'Amit Patel',    role: 'Founder, StartupXYZ',     avatar: 'AP', stars: 5, text: 'We saw 70% faster response times after going live. Our NPS score jumped 40 points in the first quarter alone.' },
    { name: 'Neha Gupta',    role: 'Head of CX, Meesho',      avatar: 'NG', stars: 5, text: 'Our customers love how natural the conversations feel. ShiPu Ai is now the backbone of our entire support stack.' },
  ];

  const topImgs = [
    'https://images.unsplash.com/photo-1573164713988-3385a4d1aec5?w=600',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600',
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600',
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600',
  ];
  const botImgs = [
    'https://images.unsplash.com/photo-1559136555-9303aea8ebd?w=600',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600',
    'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?w=600',
    'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600',
    'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600',
  ];
  const marqueeItems = ['AI‑Powered','Real‑Time','Enterprise Ready','Multilingual','24/7 Support','Secure','Scalable','Intelligent','Context‑Aware','Zero Downtime'];

  useEffect(() => {
    const t = setInterval(() => setSlideIdx(p => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onMove = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const openHelp  = () => setIsHelpOpen(true);
  const closeHelp = () => setIsHelpOpen(false);

  return (
    <>
      <Head>
        <title>ShiPu Ai — Next‑Gen AI Conversation Platform</title>
        <link rel="icon"             href="https://shipu.c0m.in/logo.png" />
        <link rel="apple-touch-icon" href="https://shipu.c0m.in/logo.png" />
        <link rel="preconnect"       href="https://fonts.googleapis.com" />
        <link rel="preconnect"       href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap" rel="stylesheet" />
      </Head>

      {/* Cursor Glow */}
      <div className="cursor-glow" style={{ left: cursorPos.x, top: cursorPos.y }} />

      <div className="page">

        {/* ── Background ── */}
        <div className="bg-layer" aria-hidden="true">
          <div className="grid-bg" />
          <div className="sphere sp1" />
          <div className="sphere sp2" />
          <div className="sphere sp3" />
        </div>

        {/* ── Header ── */}
        <header className={`header${scrolled ? ' header--solid' : ''}`}>
          <div className="header-inner">
            <a href="#" className="logo-wrap" aria-label="ShiPu Ai home">
              <img
                src="https://shipu.c0m.in/logo.png"
                alt="ShiPu Ai"
                className="logo-img"
                onError={e => { e.target.style.display='none'; e.target.parentElement.innerHTML='<span class="logo-text">ShiPu</span>'; }}
              />
            </a>
            <nav className="nav" aria-label="Main navigation">
              <a href="#features"      className="nav-link">Features</a>
              <a href="#why"           className="nav-link">Why Us</a>
              <a href="#testimonials"  className="nav-link">Reviews</a>
            </nav>
            <button className="btn-cta-nav" onClick={openHelp}>Get Started</button>
          </div>
        </header>

        {/* ── Hero ── */}
        <section className="hero" ref={heroRef} aria-label="Hero">
          <div className={`hero-content${heroInView ? ' iv' : ''}`}>
            <div className="hero-badge">
              <span className="badge-pulse" />
              Now in Public Beta — Join 10,000+ businesses
            </div>

            <h1 className="hero-h1">
              The Future of<br />
              <span className="grad-text">Customer AI</span>
            </h1>

            <p className="hero-sub">
              ShiPu Ai delivers human‑quality conversations at machine speed.<br />
              Transform your support, sales, and engagement overnight.
            </p>

            <div className="hero-btns">
              <button className="btn-primary" onClick={openHelp}>
                Start Free Trial
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="btn-ghost" onClick={openHelp}>
                <span className="play-ico" aria-hidden="true">▶</span>
                Watch Demo
              </button>
            </div>

            <div className="hero-stats-row">
              <div className="h-stat"><b>10K+</b><span>Active Users</span></div>
              <div className="h-div" />
              <div className="h-stat"><b>99.9%</b><span>Uptime SLA</span></div>
              <div className="h-div" />
              <div className="h-stat"><b>50+</b><span>Languages</span></div>
            </div>
          </div>

          {/* Floating deco cards */}
          <div className="hero-deco" aria-hidden="true">
            <div className="deco deco-1">
              <span className="deco-emoji">🤖</span>
              <div><div className="deco-lbl">AI Response</div><div className="deco-val">0.3s avg</div></div>
            </div>
            <div className="deco deco-2">
              <span className="deco-emoji">📊</span>
              <div><div className="deco-lbl">Satisfaction</div><div className="deco-val">98.7%</div></div>
            </div>
            <div className="deco deco-3">
              <span className="deco-emoji">🔒</span>
              <div><div className="deco-lbl">Security</div><div className="deco-val">Enterprise</div></div>
            </div>
          </div>
        </section>

        {/* ── Marquee ── */}
        <div className="marquee-section" aria-hidden="true">
          <div className="marquee-track">
            {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="m-item">
                <span className="m-dot">◆</span>
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* ── Features / Bento ── */}
        <section className="sec" id="features" ref={servicesRef} aria-labelledby="feat-title">
          <p className="sec-label">CAPABILITIES</p>
          <h2 id="feat-title" className={`sec-title${servicesInView ? ' iv' : ''}`}>
            Everything you need<br />in one platform
          </h2>

          <div className={`bento${servicesInView ? ' iv' : ''}`}>
            {/* Large */}
            <div className="b-card b-lg">
              <div className="b-icon-wrap">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                  <rect x="2" y="8" width="24" height="17" rx="4" stroke="#5BB8FF" strokeWidth="1.4"/>
                  <circle cx="9" cy="13" r="2" fill="#5BB8FF"/>
                  <path d="M5 22c0-2.5 1.8-4 4-4s4 1.5 4 4" stroke="#5BB8FF" strokeWidth="1.4" strokeLinecap="round"/>
                  <path d="M16 13h6M16 17h4" stroke="#5BB8FF" strokeWidth="1.4" strokeLinecap="round"/>
                  <path d="M14 3l4-1.5 4 1.5" stroke="#5BB8FF" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="b-title">Human‑Like AI</h3>
              <p className="b-text">Advanced language models trained on billions of conversations. Understands context, emotion, and intent with unprecedented accuracy.</p>
              <span className="b-tag">GPT‑4 Powered</span>
            </div>

            <div className="b-card">
              <div className="b-icon-wrap b-sm">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                  <path d="M11 2L2 13h9l-1 7 10-11h-9l1-7z" stroke="#5BB8FF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="b-title">Instant Response</h3>
              <p className="b-text">Sub‑second answers, 24/7, without fail.</p>
            </div>

            <div className="b-card">
              <div className="b-icon-wrap b-sm">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                  <path d="M11 2L2 6l9 5 9-5-9-5zM2 16l9 4 9-4M2 11l9 5 9-5" stroke="#5BB8FF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="b-title">Deep Analytics</h3>
              <p className="b-text">Real‑time insights into every conversation.</p>
            </div>

            {/* Medium */}
            <div className="b-card b-md">
              <div className="b-icon-wrap b-sm">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                  <path d="M11 20s7-3.5 7-9V4.5L11 2 4 4.5V11c0 5.5 7 9 7 9z" stroke="#5BB8FF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="b-title">Enterprise Security</h3>
              <p className="b-text">SOC 2 Type II certified. End‑to‑end encryption. GDPR compliant. Your data never trains our models.</p>
            </div>

            <div className="b-card">
              <div className="b-icon-wrap b-sm">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                  <circle cx="11" cy="11" r="3" stroke="#5BB8FF" strokeWidth="1.4"/>
                  <path d="M17.5 4.5a10 10 0 010 13M4.5 4.5a10 10 0 000 13" stroke="#5BB8FF" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="b-title">50+ Languages</h3>
              <p className="b-text">Go global effortlessly.</p>
            </div>

            <div className="b-card">
              <div className="b-icon-wrap b-sm">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                  <path d="M9 12a5 5 0 006.5.5l2.5-2.5a5 5 0 00-7-7L9.5 4.5M13 10a5 5 0 00-6.5-.5L4 12a5 5 0 007 7l1.5-1.5" stroke="#5BB8FF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="b-title">Easy Integration</h3>
              <p className="b-text">Connect in minutes, not weeks.</p>
            </div>
          </div>
        </section>

        {/* ── Dual Image Slider ── */}
        <div className="slider-sec">
          <p className="sec-label" style={{ textAlign:'center', marginBottom:'40px' }}>TRUSTED BY INDUSTRY LEADERS</p>
          <div className="slider-wrap">
            <div className="sf-left"  aria-hidden="true" />
            <div className="sf-right" aria-hidden="true" />
            <div className="s-track s-right">
              {[...topImgs, ...topImgs].map((img, i) => (
                <div className="s-card" key={i}>
                  <img src={img} alt="" className="s-img" loading="lazy" />
                  <div className="s-overlay" />
                </div>
              ))}
            </div>
          </div>
          <div className="slider-wrap" style={{ marginTop:'16px' }}>
            <div className="sf-left"  aria-hidden="true" />
            <div className="sf-right" aria-hidden="true" />
            <div className="s-track s-left">
              {[...botImgs, ...botImgs].map((img, i) => (
                <div className="s-card" key={i}>
                  <img src={img} alt="" className="s-img" loading="lazy" />
                  <div className="s-overlay" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Why Choose / Feature Rows ── */}
        <section className="sec why-sec" id="why" ref={featuresRef} aria-labelledby="why-title">
          <p className="sec-label">WHY SHIPU AI</p>
          <h2 id="why-title" className={`sec-title${featuresInView ? ' iv' : ''}`}>
            Built for teams<br />that move fast
          </h2>

          <div className="feat-rows">
            {[
              { img:'https://images.unsplash.com/photo-1551434678-e076c223a692?w=700', tag:'Setup in 10 min',    title:'Seamless Integration', desc:'Connect ShiPu Ai to your existing stack in under 10 minutes. Native plugins for Slack, Intercom, Zendesk, Salesforce, and 100+ more. Zero engineering required.' },
              { img:'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=700', tag:'99.9% uptime',       title:'24/7 Always On',       desc:'While your team sleeps, ShiPu Ai works. Handle unlimited concurrent conversations across every channel — web, mobile, WhatsApp, and email.' },
              { img:'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=700', tag:'Full customization', title:'White‑Label Ready',     desc:'Your brand, our intelligence. Complete white‑label customization — from colors to tone of voice. Customers never know it\'s AI unless you want them to.' },
            ].map((f, i) => (
              <div
                className={`feat-row${featuresInView ? ' iv' : ''}${i % 2 === 1 ? ' feat-row--rev' : ''}`}
                key={i}
                style={{ '--d': `${i * 0.14}s` }}
              >
                <div className="feat-img-wrap">
                  <img src={f.img} alt={f.title} className="feat-img" loading="lazy" />
                  <div className="feat-img-shine" aria-hidden="true" />
                </div>
                <div className="feat-copy">
                  <span className="feat-tag">{f.tag}</span>
                  <h3 className="feat-h3">{f.title}</h3>
                  <p className="feat-p">{f.desc}</p>
                  <button className="btn-outline" onClick={openHelp}>Learn more →</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Stats ── */}
        <div className="stats-sec" ref={statsRef}>
          <div className="stats-inner">
            {[
              { n: s1, suf: '+',   lbl: 'Active Businesses'   },
              { n: s2, suf: '.9%', lbl: 'Uptime Guaranteed'   },
              { n: s3, suf: '+',   lbl: 'Languages Supported' },
              { n: s4, suf: '%',   lbl: 'Faster Responses'    },
            ].map((st, i) => (
              <div className={`stat${statsInView ? ' iv' : ''}`} key={i} style={{ '--d': `${i * 0.1}s` }}>
                <span className="stat-num">{st.n}{st.suf}</span>
                <span className="stat-lbl">{st.lbl}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Testimonials ── */}
        <section className="testi-sec" id="testimonials" ref={testimonialRef} aria-labelledby="testi-title">
          <p className="sec-label">TESTIMONIALS</p>
          <h2 id="testi-title" className={`sec-title${testimonialInView ? ' iv' : ''}`}>
            Loved by teams<br />everywhere
          </h2>
          <div className="testi-wrap">
            <div className="testi-card">
              <div className="testi-stars" aria-label={`${testimonials[slideIdx].stars} stars`}>
                {'★'.repeat(testimonials[slideIdx].stars)}
              </div>
              <p className="testi-text">"{testimonials[slideIdx].text}"</p>
              <div className="testi-author">
                <div className="testi-avatar" aria-hidden="true">{testimonials[slideIdx].avatar}</div>
                <div>
                  <div className="testi-name">{testimonials[slideIdx].name}</div>
                  <div className="testi-role">{testimonials[slideIdx].role}</div>
                </div>
              </div>
            </div>
            <div className="testi-dots" role="tablist" aria-label="Testimonial navigation">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === slideIdx}
                  aria-label={`Testimonial ${i + 1}`}
                  className={`t-dot${i === slideIdx ? ' t-dot--on' : ''}`}
                  onClick={() => setSlideIdx(i)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="cta-sec" aria-label="Call to action">
          <div className="cta-inner">
            <span className="cta-badge">Limited Time Offer</span>
            <h2 className="cta-h2">Start transforming<br />your support today</h2>
            <p className="cta-sub">Join 10,000+ businesses. No credit card required. Cancel anytime.</p>
            <button className="btn-primary btn-primary--lg" onClick={openHelp}>
              Get Started Free
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M3.75 9h10.5M10.5 5.25L14.25 9l-3.75 3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="footer">
          <div className="footer-top">
            <div>
              <span className="f-logo">ShiPu<em>Ai</em></span>
              <p className="f-tag">Next‑generation AI for modern businesses.</p>
            </div>
            <nav className="f-links" aria-label="Footer navigation">
              <a href="#features"     className="f-link">Features</a>
              <a href="#why"          className="f-link">Why Us</a>
              <a href="#testimonials" className="f-link">Reviews</a>
              <a href="#"             className="f-link">Privacy</a>
              <a href="#"             className="f-link">Terms</a>
            </nav>
          </div>
          <div className="footer-bottom">
            © 2026 ShiPu Ai. Developed by Chitron Bhattacharjee.
          </div>
        </footer>

        {/* ── Modal ── */}
        {isHelpOpen && (
          <div className="m-overlay" onClick={closeHelp} role="dialog" aria-modal="true" aria-label="Help Center">
            <div className="m-box" onClick={e => e.stopPropagation()}>
              <div className="m-head">
                <span className="m-title">Help Center</span>
                <button className="m-close" onClick={closeHelp} aria-label="Close">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path d="M13.5 4.5l-9 9M4.5 4.5l9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
              <iframe src="/help" className="m-iframe" title="Help Center" />
            </div>
          </div>
        )}

        {/* ─────────── Global Styles ─────────── */}
        <style jsx global>{`
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          html { scroll-behavior: smooth; }
          body {
            background: #030C18;
            font-family: 'DM Sans', -apple-system, sans-serif;
            color: #E4F0FF;
            overflow-x: hidden;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          /* ── Cursor glow ── */
          .cursor-glow {
            position: fixed;
            width: 500px; height: 500px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(91,184,255,.07) 0%, transparent 65%);
            transform: translate(-50%,-50%);
            pointer-events: none;
            z-index: 9998;
            transition: left .12s ease, top .12s ease;
          }
          @media (hover: none) { .cursor-glow { display: none; } }

          /* ── Page wrapper ── */
          .page { min-height: 100vh; position: relative; overflow: hidden; }

          /* ── Background ── */
          .bg-layer {
            position: fixed; inset: 0; z-index: 0;
            background: #030C18;
          }
          .grid-bg {
            position: absolute; inset: 0;
            background-image:
              linear-gradient(rgba(91,184,255,.025) 1px, transparent 1px),
              linear-gradient(90deg, rgba(91,184,255,.025) 1px, transparent 1px);
            background-size: 64px 64px;
          }
          .sphere {
            position: absolute; border-radius: 50%;
            filter: blur(110px); pointer-events: none;
          }
          .sp1 {
            width: 750px; height: 750px; top: -220px; left: -200px;
            background: radial-gradient(circle, rgba(91,184,255,.16) 0%, transparent 70%);
            animation: spFloat 28s ease-in-out infinite alternate;
          }
          .sp2 {
            width: 650px; height: 650px; bottom: -120px; right: -160px;
            background: radial-gradient(circle, rgba(30,109,255,.2) 0%, transparent 70%);
            animation: spFloat 33s ease-in-out infinite alternate-reverse;
          }
          .sp3 {
            width: 420px; height: 420px; top: 45%; left: 38%;
            background: radial-gradient(circle, rgba(91,184,255,.11) 0%, transparent 70%);
            animation: spFloat 22s ease-in-out infinite alternate;
          }
          @keyframes spFloat {
            0%   { transform: translate(0,0)   scale(1);   }
            100% { transform: translate(35px,35px) scale(1.08); }
          }

          /* ── Header ── */
          .header {
            position: fixed; top: 0; left: 0; right: 0; z-index: 100;
            padding: 22px 48px;
            transition: padding .35s ease, background .35s ease, border-color .35s ease;
          }
          .header--solid {
            background: rgba(3,12,24,.88);
            backdrop-filter: blur(22px);
            -webkit-backdrop-filter: blur(22px);
            border-bottom: 1px solid rgba(91,184,255,.07);
            padding: 14px 48px;
          }
          .header-inner {
            max-width: 1200px; margin: 0 auto;
            display: flex; align-items: center; justify-content: space-between; gap: 28px;
          }
          .logo-wrap {
            width: 46px; height: 46px;
            background: #fff; border-radius: 13px;
            display: flex; align-items: center; justify-content: center; padding: 7px;
            box-shadow: 0 0 0 1px rgba(91,184,255,.22), 0 8px 24px rgba(0,0,0,.45);
            flex-shrink: 0;
            transition: transform .28s ease, box-shadow .28s ease;
            text-decoration: none;
          }
          .logo-wrap:hover { transform: scale(1.06); box-shadow: 0 0 0 1.5px rgba(91,184,255,.5), 0 12px 28px rgba(91,184,255,.22); }
          .logo-img { width:100%; height:100%; object-fit:contain; border-radius:9px; display:block; }
          .logo-text { font-family:'Syne',sans-serif; font-weight:700; font-size:1rem; color:#5BB8FF; }

          .nav { display: flex; align-items: center; gap: 4px; }
          .nav-link {
            padding: 9px 18px;
            font-size: .875rem; font-weight: 400; letter-spacing: .2px;
            color: rgba(190,220,255,.6);
            text-decoration: none; border-radius: 50px;
            transition: all .22s ease;
          }
          .nav-link:hover { color: #E4F0FF; background: rgba(91,184,255,.07); }

          .btn-cta-nav {
            padding: 10px 24px;
            font-family: 'DM Sans', sans-serif; font-size: .875rem; font-weight: 500;
            color: #030C18; background: #5BB8FF;
            border: none; border-radius: 50px; cursor: pointer;
            transition: all .22s ease; white-space: nowrap;
          }
          .btn-cta-nav:hover { background: #7BC9FF; transform: translateY(-1px); box-shadow: 0 8px 22px rgba(91,184,255,.38); }
          .btn-cta-nav:active { transform: translateY(0); }

          /* ── Hero ── */
          .hero {
            position: relative; z-index: 10;
            min-height: 100vh;
            display: flex; align-items: center; justify-content: center;
            padding: 130px 40px 90px;
            overflow: hidden;
          }
          .hero-content {
            max-width: 800px; text-align: center;
            opacity: 0; transform: translateY(44px);
            transition: opacity .95s cubic-bezier(.22,.68,0,1.2), transform .95s cubic-bezier(.22,.68,0,1.2);
          }
          .hero-content.iv { opacity: 1; transform: translateY(0); }

          .hero-badge {
            display: inline-flex; align-items: center; gap: 9px;
            padding: 9px 20px;
            background: rgba(91,184,255,.07); border: 1px solid rgba(91,184,255,.18);
            border-radius: 50px; margin-bottom: 36px;
            font-size: .82rem; color: rgba(175,215,255,.82); letter-spacing: .3px;
          }
          .badge-pulse {
            width: 7px; height: 7px; border-radius: 50%; background: #5BB8FF;
            animation: pulse 2.2s ease-in-out infinite;
          }
          @keyframes pulse {
            0%,100% { opacity:1; transform:scale(1);   box-shadow:0 0 0 0 rgba(91,184,255,.5); }
            50%      { opacity:.6; transform:scale(.7);  box-shadow:0 0 0 5px rgba(91,184,255,0); }
          }

          .hero-h1 {
            font-family: 'Syne', sans-serif;
            font-size: clamp(3.4rem, 9.5vw, 7rem);
            font-weight: 800; line-height: 1.04; letter-spacing: -.045em;
            color: #EDF6FF; margin-bottom: 24px;
          }
          .grad-text {
            background: linear-gradient(130deg, #8FD0FF 0%, #4AADFF 45%, #1E70FF 100%);
            -webkit-background-clip: text; -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .hero-sub {
            font-size: clamp(.95rem, 2.3vw, 1.18rem);
            color: rgba(170,210,255,.65); line-height: 1.8;
            font-weight: 300; margin-bottom: 44px;
          }

          .hero-btns {
            display: flex; align-items: center; justify-content: center;
            gap: 14px; flex-wrap: wrap; margin-bottom: 56px;
          }

          .btn-primary {
            display: inline-flex; align-items: center; gap: 10px;
            padding: 15px 36px;
            font-family: 'DM Sans', sans-serif; font-size: 1rem; font-weight: 500;
            color: #fff;
            background: linear-gradient(135deg, #55B5FF, #1E68FF);
            border: none; border-radius: 60px; cursor: pointer;
            box-shadow: 0 12px 32px -8px rgba(91,184,255,.52), 0 0 0 1px rgba(91,184,255,.18);
            transition: all .3s cubic-bezier(.25,.46,.45,.94);
            position: relative; overflow: hidden; letter-spacing: .15px;
          }
          .btn-primary::before {
            content:''; position:absolute; inset:0;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,.14), transparent);
            transform: translateX(-100%);
            transition: transform .55s ease;
          }
          .btn-primary:hover::before { transform: translateX(100%); }
          .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 18px 42px -8px rgba(91,184,255,.62), 0 0 0 1px rgba(91,184,255,.28); }
          .btn-primary:active { transform: translateY(0); }
          .btn-primary--lg { padding: 17px 48px; font-size: 1.05rem; }

          .btn-ghost {
            display: inline-flex; align-items: center; gap: 10px;
            padding: 15px 28px;
            font-family: 'DM Sans', sans-serif; font-size: 1rem; font-weight: 400;
            color: rgba(175,215,255,.82);
            background: transparent;
            border: 1px solid rgba(91,184,255,.2); border-radius: 60px; cursor: pointer;
            transition: all .25s ease;
          }
          .btn-ghost:hover { background: rgba(91,184,255,.07); border-color: rgba(91,184,255,.38); color: #E4F0FF; }
          .play-ico {
            width: 30px; height: 30px; border-radius: 50%;
            background: rgba(91,184,255,.14);
            display: inline-flex; align-items: center; justify-content: center;
            font-size: .65rem;
          }

          .hero-stats-row {
            display: inline-flex; align-items: center; gap: 28px;
            padding: 20px 32px;
            background: rgba(255,255,255,.03);
            border: 1px solid rgba(91,184,255,.1); border-radius: 18px;
            backdrop-filter: blur(12px);
          }
          .h-stat { text-align: center; }
          .h-stat b { display: block; font-family: 'Syne', sans-serif; font-size: 1.45rem; font-weight: 700; color: #EDF6FF; }
          .h-stat span { font-size: .72rem; color: rgba(140,190,255,.55); margin-top: 3px; display: block; letter-spacing: .4px; }
          .h-div { width: 1px; height: 38px; background: rgba(91,184,255,.13); }

          /* Hero floating cards */
          .hero-deco { display: none; }
          @media (min-width: 1100px) {
            .hero-deco {
              display: block;
              position: absolute; inset: 0;
              pointer-events: none;
            }
            .deco {
              position: absolute; display: flex; align-items: center; gap: 13px;
              padding: 14px 20px;
              background: rgba(255,255,255,.035);
              border: 1px solid rgba(91,184,255,.14); border-radius: 18px;
              backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
              animation: decoF 7s ease-in-out infinite alternate;
            }
            .deco-emoji { font-size: 1.6rem; }
            .deco-lbl { font-size: .68rem; color: rgba(140,190,255,.55); letter-spacing: .6px; text-transform:uppercase; margin-bottom:3px; }
            .deco-val { font-family:'Syne',sans-serif; font-size:.98rem; font-weight:600; color:#EDF6FF; }
            .deco-1 { top:26%; left:1.5%; animation-delay:0s;  }
            .deco-2 { top:33%; right:1.5%; animation-delay:-2.5s; }
            .deco-3 { bottom:22%; left:2%; animation-delay:-4.5s; }
            @keyframes decoF {
              0%   { transform: translateY(0); }
              100% { transform: translateY(-14px); }
            }
          }

          /* ── Marquee ── */
          .marquee-section {
            position: relative; z-index: 10; overflow: hidden;
            background: rgba(91,184,255,.035);
            border-top: 1px solid rgba(91,184,255,.07);
            border-bottom: 1px solid rgba(91,184,255,.07);
            padding: 18px 0;
          }
          .marquee-track {
            display: flex; width: max-content;
            animation: mq 32s linear infinite;
          }
          @keyframes mq { 0%{transform:translateX(0)} 100%{transform:translateX(-33.333%)} }
          .m-item {
            display: inline-flex; align-items: center; gap: 14px;
            padding: 0 30px;
            font-family: 'Syne', sans-serif; font-size: .78rem; font-weight: 500;
            color: rgba(140,190,255,.5); letter-spacing: 1.8px;
            text-transform: uppercase; white-space: nowrap;
          }
          .m-dot { color: rgba(91,184,255,.35); font-size: .48rem; }

          /* ── Section commons ── */
          .sec {
            position: relative; z-index: 10;
            padding: 120px 40px;
            max-width: 1200px; margin: 0 auto;
          }
          .sec-label {
            font-family: 'Syne', sans-serif;
            font-size: .7rem; font-weight: 600; letter-spacing: 3.5px;
            color: rgba(91,184,255,.65); text-transform: uppercase;
            margin-bottom: 14px; text-align: center;
          }
          .sec-title {
            font-family: 'Syne', sans-serif;
            font-size: clamp(2.1rem, 5vw, 3.6rem);
            font-weight: 700; line-height: 1.14; letter-spacing: -.03em;
            color: #EDF6FF; text-align: center; margin-bottom: 64px;
            opacity: 0; transform: translateY(22px);
            transition: opacity .8s ease .1s, transform .8s ease .1s;
          }
          .sec-title.iv { opacity:1; transform:translateY(0); }

          /* ── Bento Grid ── */
          .bento {
            display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px;
            opacity: 0; transform: translateY(28px);
            transition: opacity .8s ease .18s, transform .8s ease .18s;
          }
          .bento.iv { opacity:1; transform:translateY(0); }

          .b-card {
            background: rgba(255,255,255,.03);
            border: 1px solid rgba(91,184,255,.09);
            border-radius: 24px; padding: 32px;
            transition: all .32s cubic-bezier(.25,.46,.45,.94);
            position: relative; overflow: hidden;
          }
          .b-card::after {
            content:''; position:absolute; top:0; left:0; right:0; height:1px;
            background: linear-gradient(90deg, transparent, rgba(91,184,255,.28), transparent);
            opacity:0; transition:opacity .3s ease;
          }
          .b-card:hover { background:rgba(91,184,255,.045); border-color:rgba(91,184,255,.22); transform:translateY(-4px); box-shadow:0 22px 44px -14px rgba(91,184,255,.14); }
          .b-card:hover::after { opacity:1; }
          .b-lg { grid-column: span 2; }
          .b-md { grid-column: span 2; }

          .b-icon-wrap {
            width: 54px; height: 54px;
            background: rgba(91,184,255,.07); border: 1px solid rgba(91,184,255,.14);
            border-radius: 16px;
            display: flex; align-items: center; justify-content: center;
            margin-bottom: 22px;
          }
          .b-icon-wrap.b-sm { width:42px; height:42px; border-radius:12px; margin-bottom:18px; }
          .b-title { font-family:'Syne',sans-serif; font-size:1.2rem; font-weight:600; color:#EDF6FF; margin-bottom:10px; }
          .b-text { font-size:.88rem; color:rgba(155,200,240,.6); line-height:1.72; }
          .b-tag {
            display:inline-block; margin-top:20px;
            padding:5px 14px;
            background:rgba(91,184,255,.09); border:1px solid rgba(91,184,255,.18);
            border-radius:50px; font-size:.76rem; color:rgba(115,185,255,.9); letter-spacing:.3px;
          }

          /* ── Sliders ── */
          .slider-sec {
            position:relative; z-index:10;
            padding:80px 0; overflow:hidden;
          }
          .slider-wrap {
            position:relative; width:100%; overflow:hidden;
          }
          .sf-left, .sf-right {
            position:absolute; top:0; bottom:0; width:130px; z-index:2; pointer-events:none;
          }
          .sf-left  { left:0;  background:linear-gradient(90deg, #030C18, transparent); }
          .sf-right { right:0; background:linear-gradient(-90deg, #030C18, transparent); }
          .s-track {
            display:flex; gap:14px; width:max-content;
          }
          .s-right { animation: sR 38s linear infinite; }
          .s-left  { animation: sL 38s linear infinite; }
          @keyframes sR { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
          @keyframes sL { 0%{transform:translateX(-50%)} 100%{transform:translateX(0)} }
          .s-card {
            flex:0 0 275px; height:175px;
            border-radius:20px; overflow:hidden;
            border:1px solid rgba(91,184,255,.13);
            position:relative;
          }
          .s-img  { width:100%; height:100%; object-fit:cover; display:block; }
          .s-overlay {
            position:absolute; inset:0;
            background:rgba(3,12,24,.28);
            transition:opacity .3s ease;
          }
          .s-card:hover .s-overlay { opacity:0; }

          /* ── Feature Rows ── */
          .why-sec { padding:120px 40px; }
          .feat-rows { display:flex; flex-direction:column; gap:88px; }
          .feat-row {
            display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:center;
            opacity:0; transform:translateY(28px);
            transition:opacity .8s ease var(--d,0s), transform .8s ease var(--d,0s);
          }
          .feat-row.iv { opacity:1; transform:translateY(0); }
          .feat-row--rev .feat-img-wrap { order:2; }

          .feat-img-wrap { position:relative; border-radius:24px; overflow:hidden; }
          .feat-img { width:100%; height:320px; object-fit:cover; display:block; border-radius:24px; }
          .feat-img-shine {
            position:absolute; inset:0;
            background:linear-gradient(135deg, rgba(91,184,255,.1), transparent 60%);
            pointer-events:none; border-radius:24px;
          }
          .feat-copy { display:flex; flex-direction:column; gap:16px; }
          .feat-tag {
            display:inline-flex; align-items:center;
            padding:5px 14px;
            background:rgba(91,184,255,.07); border:1px solid rgba(91,184,255,.18);
            border-radius:50px; font-size:.76rem; color:rgba(115,185,255,.9); letter-spacing:.3px;
            width:fit-content;
          }
          .feat-h3 {
            font-family:'Syne',sans-serif; font-size:1.9rem; font-weight:700;
            color:#EDF6FF; line-height:1.2; letter-spacing:-.025em;
          }
          .feat-p { font-size:.95rem; color:rgba(155,200,240,.62); line-height:1.82; }
          .btn-outline {
            display:inline-flex; align-items:center; gap:6px;
            padding:10px 20px;
            background:none; border:1px solid rgba(91,184,255,.22); border-radius:50px;
            color:rgba(115,185,255,.88);
            font-family:'DM Sans',sans-serif; font-size:.88rem; cursor:pointer;
            width:fit-content; transition:all .22s ease;
          }
          .btn-outline:hover { background:rgba(91,184,255,.07); border-color:rgba(91,184,255,.38); }

          /* ── Stats ── */
          .stats-sec {
            position:relative; z-index:10; padding:88px 40px;
            background:rgba(91,184,255,.03);
            border-top:1px solid rgba(91,184,255,.07);
            border-bottom:1px solid rgba(91,184,255,.07);
          }
          .stats-inner {
            max-width:900px; margin:0 auto;
            display:grid; grid-template-columns:repeat(4,1fr); gap:40px;
          }
          .stat {
            text-align:center;
            opacity:0; transform:translateY(18px);
            transition:opacity .6s ease var(--d,0s), transform .6s ease var(--d,0s);
          }
          .stat.iv { opacity:1; transform:translateY(0); }
          .stat-num {
            display:block; font-family:'Syne',sans-serif;
            font-size:3rem; font-weight:800; color:#5BB8FF;
            letter-spacing:-.04em; line-height:1; margin-bottom:8px;
          }
          .stat-lbl { font-size:.84rem; color:rgba(155,200,240,.55); letter-spacing:.3px; }

          /* ── Testimonials ── */
          .testi-sec {
            position:relative; z-index:10;
            padding:120px 40px; text-align:center;
          }
          .testi-wrap { max-width:680px; margin:0 auto; }
          .testi-card {
            background:rgba(255,255,255,.03);
            border:1px solid rgba(91,184,255,.11); border-radius:32px;
            padding:48px; text-align:left;
          }
          .testi-stars { color:#5BB8FF; font-size:1.05rem; letter-spacing:3px; margin-bottom:20px; }
          .testi-text {
            font-size:1.08rem; color:rgba(215,235,255,.88); line-height:1.85;
            font-weight:300; font-style:italic; margin-bottom:28px;
          }
          .testi-author { display:flex; align-items:center; gap:16px; }
          .testi-avatar {
            width:44px; height:44px; border-radius:50%; flex-shrink:0;
            background:linear-gradient(135deg, rgba(91,184,255,.28), rgba(30,109,255,.28));
            border:1px solid rgba(91,184,255,.22);
            display:flex; align-items:center; justify-content:center;
            font-family:'Syne',sans-serif; font-size:.78rem; font-weight:600; color:#A8D8FF;
          }
          .testi-name { font-family:'Syne',sans-serif; font-size:.92rem; font-weight:600; color:#EDF6FF; }
          .testi-role { font-size:.8rem; color:rgba(140,190,255,.55); margin-top:3px; }
          .testi-dots { display:flex; justify-content:center; gap:8px; margin-top:30px; }
          .t-dot {
            width:8px; height:8px; border-radius:50%;
            background:rgba(91,184,255,.2);
            border:none; cursor:pointer; padding:0;
            transition:all .3s ease;
          }
          .t-dot--on { background:#5BB8FF; width:26px; border-radius:4px; }
          .t-dot:hover { background:rgba(91,184,255,.45); }

          /* ── CTA ── */
          .cta-sec {
            position:relative; z-index:10; padding:140px 40px;
            background:radial-gradient(ellipse 70% 55% at 50% 50%, rgba(91,184,255,.09) 0%, rgba(30,109,255,.04) 55%, transparent 100%);
            border-top:1px solid rgba(91,184,255,.07);
            text-align:center;
          }
          .cta-inner { max-width:680px; margin:0 auto; }
          .cta-badge {
            display:inline-block; padding:6px 16px;
            background:rgba(91,184,255,.07); border:1px solid rgba(91,184,255,.18);
            border-radius:50px; font-size:.76rem; color:rgba(115,185,255,.9);
            letter-spacing:1.2px; text-transform:uppercase; margin-bottom:24px;
          }
          .cta-h2 {
            font-family:'Syne',sans-serif;
            font-size:clamp(2.4rem,6vw,4.2rem);
            font-weight:800; color:#EDF6FF;
            line-height:1.1; letter-spacing:-.04em; margin-bottom:18px;
          }
          .cta-sub { font-size:.97rem; color:rgba(155,200,240,.58); margin-bottom:40px; }

          /* ── Footer ── */
          .footer {
            position:relative; z-index:10;
            padding:64px 48px 40px;
            background:rgba(3,12,24,.85);
            border-top:1px solid rgba(91,184,255,.07);
            backdrop-filter:blur(12px);
          }
          .footer-top {
            max-width:1000px; margin:0 auto;
            display:flex; justify-content:space-between; align-items:center;
            flex-wrap:wrap; gap:32px; margin-bottom:40px;
          }
          .f-logo {
            font-family:'Syne',sans-serif; font-size:1.6rem; font-weight:700; color:#EDF6FF;
            display:block; margin-bottom:8px;
          }
          .f-logo em { color:#5BB8FF; font-style:normal; }
          .f-tag { font-size:.84rem; color:rgba(140,190,255,.45); }
          .f-links { display:flex; gap:24px; flex-wrap:wrap; align-items:center; }
          .f-link {
            font-size:.84rem; color:rgba(140,190,255,.45);
            text-decoration:none; transition:color .2s ease;
          }
          .f-link:hover { color:rgba(140,190,255,.88); }
          .footer-bottom {
            max-width:1000px; margin:0 auto;
            padding-top:24px; border-top:1px solid rgba(91,184,255,.06);
            font-size:.78rem; color:rgba(100,150,200,.35); text-align:center;
          }

          /* ── Modal ── */
          .m-overlay {
            position:fixed; inset:0; z-index:1000;
            background:rgba(0,6,18,.87);
            backdrop-filter:blur(22px); -webkit-backdrop-filter:blur(22px);
            display:flex; align-items:center; justify-content:center;
            padding:24px;
            animation:mFadeIn .25s ease;
          }
          .m-box {
            width:100%; max-width:1000px; height:82vh;
            background:#0A1929;
            border:1px solid rgba(91,184,255,.14); border-radius:24px;
            overflow:hidden;
            box-shadow:0 70px 130px -20px rgba(0,0,0,.85);
            animation:mSlideUp .35s cubic-bezier(.25,.46,.45,.94);
          }
          .m-head {
            padding:16px 24px;
            background:rgba(91,184,255,.04);
            border-bottom:1px solid rgba(91,184,255,.1);
            display:flex; justify-content:space-between; align-items:center;
          }
          .m-title {
            font-family:'Syne',sans-serif; font-size:.82rem; font-weight:600;
            letter-spacing:2.5px; text-transform:uppercase; color:rgba(115,185,255,.75);
          }
          .m-close {
            width:32px; height:32px; border-radius:50%;
            background:rgba(255,255,255,.05); border:1px solid rgba(91,184,255,.14);
            color:rgba(140,190,255,.65); cursor:pointer;
            display:flex; align-items:center; justify-content:center;
            transition:all .22s ease;
          }
          .m-close:hover { background:rgba(91,184,255,.1); color:#EDF6FF; transform:rotate(90deg); }
          .m-iframe { width:100%; height:calc(100% - 57px); border:none; display:block; }

          @keyframes mFadeIn  { from{opacity:0} to{opacity:1} }
          @keyframes mSlideUp {
            from { opacity:0; transform:translateY(18px) scale(.98); }
            to   { opacity:1; transform:translateY(0)    scale(1);   }
          }

          /* ── Responsive ── */
          @media (max-width: 900px) {
            .header { padding:18px 24px; }
            .header--solid { padding:12px 24px; }
            .nav { display:none; }
            .hero { padding:110px 24px 70px; }
            .hero-stats-row { flex-direction:column; gap:18px; padding:18px 24px; }
            .h-div { width:44px; height:1px; }
            .sec { padding:80px 24px; }
            .bento { grid-template-columns:1fr; }
            .b-lg,.b-md { grid-column:span 1; }
            .feat-row { grid-template-columns:1fr; gap:32px; }
            .feat-row--rev .feat-img-wrap { order:unset; }
            .stats-inner { grid-template-columns:repeat(2,1fr); gap:32px; }
            .footer { padding:48px 24px 32px; }
            .footer-top { flex-direction:column; align-items:flex-start; gap:24px; }
          }
          @media (max-width: 480px) {
            .hero-h1 { font-size:2.8rem; }
            .hero-btns { flex-direction:column; align-items:center; }
            .btn-primary,.btn-ghost { width:100%; justify-content:center; }
            .stat-num { font-size:2.4rem; }
          }
        `}</style>
      </div>
    </>
  );
}
