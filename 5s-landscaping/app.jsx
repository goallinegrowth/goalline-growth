const { useState, useEffect, useRef } = React;

// ===== LOGO =====
function LogoIcon({ size }) {
  var s = size || 42;
  return (
    <svg width={s} height={s} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="48" fill="#0a1a0e" stroke="#22c55e" strokeWidth="2.5"/>
      <polygon points="18,76 40,38 62,76" fill="#16a34a"/>
      <polygon points="38,76 62,32 86,76" fill="#22c55e"/>
      <rect x="14" y="73" width="72" height="7" rx="3.5" fill="#4ade80"/>
      <rect x="20" y="60" width="5" height="13" fill="#78350f"/>
      <polygon points="22.5,40 14,62 31,62" fill="#166534"/>
      <polygon points="22.5,50 15,66 30,66" fill="#16a34a"/>
    </svg>
  );
}

// ===== NAV =====
function Nav(props) {
  var scrolled = props.scrolled;
  var mobileOpen = useState(false);
  var isOpen = mobileOpen[0];
  var setOpen = mobileOpen[1];

  return (
    <nav className={'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ' + (scrolled ? 'nav-scrolled' : 'nav-transparent')}>
      <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <LogoIcon size={44} />
          <div>
            <div className="font-outfit font-black text-white text-lg leading-none tracking-tight">5S Landscaping</div>
            <div className="text-lawn text-xs font-semibold tracking-widest uppercase mt-0.5">Amity Gardens, PA</div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#services" className="text-gray-300 hover:text-lawn transition-colors text-sm font-medium">Services</a>
          <a href="#why-us"   className="text-gray-300 hover:text-lawn transition-colors text-sm font-medium">Why 5S</a>
          <a href="#areas"    className="text-gray-300 hover:text-lawn transition-colors text-sm font-medium">Areas</a>
          <a href="#contact"  className="text-gray-300 hover:text-lawn transition-colors text-sm font-medium">Contact</a>
          <a href="tel:4849401922" className="btn-cta-green">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{display:'inline-block',verticalAlign:'middle',marginRight:'4px'}}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.02a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 15z"/></svg>
            (484) 940-1922
          </a>
        </div>

        <button className="md:hidden text-white p-2 rounded-lg" onClick={function() { setOpen(!isOpen); }}>
          {isOpen ? (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg>
          ) : (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
          )}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-forest border-t border-grove px-5 pb-6">
          <div className="flex flex-col gap-5 pt-5">
            <a href="#services" className="text-gray-300 hover:text-lawn text-base font-medium" onClick={function() { setOpen(false); }}>Services</a>
            <a href="#why-us"   className="text-gray-300 hover:text-lawn text-base font-medium" onClick={function() { setOpen(false); }}>Why 5S</a>
            <a href="#areas"    className="text-gray-300 hover:text-lawn text-base font-medium" onClick={function() { setOpen(false); }}>Areas</a>
            <a href="#contact"  className="text-gray-300 hover:text-lawn text-base font-medium" onClick={function() { setOpen(false); }}>Contact</a>
            <a href="tel:4849401922" className="btn-cta-green justify-center text-base py-3">Call (484) 940-1922</a>
          </div>
        </div>
      )}
    </nav>
  );
}

// ===== HERO =====
function Hero() {
  var heroRef = useRef(null);

  useEffect(function() {
    gsap.fromTo('.hero-headline', { opacity: 0, y: 70 }, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', delay: 0.15 });
    gsap.fromTo('.hero-sub',      { opacity: 0, y: 45 }, { opacity: 1, y: 0, duration: 1,   ease: 'power3.out', delay: 0.45 });
    gsap.fromTo('.hero-ctas',     { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1,   ease: 'power3.out', delay: 0.75 });
    gsap.fromTo('.hero-proof',    { opacity: 0         }, { opacity: 1,       duration: 1,   ease: 'power2.out', delay: 1.1  });
  }, []);

  return (
    <section className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden" ref={heroRef}>
      <div className="hero-bg absolute inset-0"></div>
      <div className="hero-gradient absolute inset-0"></div>
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-5 text-center pt-28 pb-20">
        <div className="hero-proof inline-flex items-center gap-2 bg-grove bg-opacity-80 border border-lawn border-opacity-30 rounded-full px-5 py-2 mb-10">
          <span className="w-2 h-2 rounded-full bg-lawn" style={{animation:'pulse 1.5s ease-in-out infinite'}}></span>
          <span className="text-lawn text-sm font-semibold">Serving Lehigh, Bucks &amp; Lancaster Counties, PA</span>
        </div>

        <h1 className="hero-headline font-outfit font-black text-white mb-6" style={{lineHeight:'1.03'}}>
          Curb Appeal<br />
          <span className="text-lawn">Starts Here.</span>
        </h1>

        <p className="hero-sub text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          Professional landscaping for homeowners and businesses across Pennsylvania.
          <br />
          <span className="text-white font-bold">Fast. Affordable. Reliable.</span>
        </p>

        <div className="hero-ctas flex flex-col sm:flex-row gap-4 justify-center">
          <a href="tel:4849401922" className="btn-primary-green text-lg px-9 py-4">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{display:'inline-block',marginRight:'9px',verticalAlign:'middle'}}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.02a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 15z"/></svg>
            Call Now — (484) 940-1922
          </a>
          <a href="#services" className="btn-outline-green text-lg px-9 py-4">
            View Services
          </a>
        </div>

        <div className="hero-proof mt-14 flex flex-col sm:flex-row items-center justify-center gap-7 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <span style={{color:'#f59e0b',fontSize:'1.1rem'}}>&#9733;&#9733;&#9733;&#9733;&#9733;</span>
            <span><strong className="text-white">100%</strong> Recommend</span>
          </div>
          <span className="hidden sm:block text-grove">|</span>
          <div className="flex items-center gap-2">
            <span className="text-lawn font-bold">&#10003;</span>
            <span><strong className="text-white">12+</strong> 5-Star Reviews</span>
          </div>
          <span className="hidden sm:block text-grove">|</span>
          <div className="flex items-center gap-2">
            <span className="text-lawn font-bold">&#10003;</span>
            <span><strong className="text-white">Always local</strong>, always reliable</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <div className="scroll-indicator">
          <svg width="26" height="26" fill="none" stroke="#22c55e" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
        </div>
      </div>
    </section>
  );
}

// ===== TRUST BAR =====
function TrustBar() {
  var items = [
    { icon: '★', label: '100% Recommend', sub: '12+ Verified Reviews' },
    { icon: '📍', label: 'Amity Gardens, PA', sub: 'Locally Owned & Operated' },
    { icon: '⚡', label: 'Fast Response', sub: 'Same-Week Scheduling' },
    { icon: '💰', label: 'From $50 / Week', sub: 'Weekly Lawn Mowing' },
  ];

  return (
    <section className="trust-bar py-9 border-y border-grove">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map(function(item, i) {
            return (
              <div key={i} className="trust-item text-center">
                <div className="text-2xl mb-1">{item.icon}</div>
                <div className="text-white font-semibold text-sm">{item.label}</div>
                <div className="text-gray-500 text-xs mt-0.5">{item.sub}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ===== SERVICES =====
var SERVICES = [
  {
    id: 'mowing',
    icon: '🌿',
    title: 'Lawn Mowing',
    price: 'Starting at $50 / week',
    desc: 'Keep your lawn sharp all season long. Weekly and bi-weekly schedules available — we show up, we edge, we trim. Every time.',
    features: [
      'Weekly & bi-weekly mowing',
      'Edging along sidewalks & driveways',
      'String trimming around all obstacles',
      'Clean professional finish every visit',
    ],
    badge: 'Most Popular',
  },
  {
    id: 'grass',
    icon: '🌱',
    title: 'Grass Installation',
    price: 'Custom Quote',
    desc: 'New lawns done right. Fresh soil, proper grading, and quality seed or sod installation for homes and businesses alike.',
    features: [
      'Fresh soil delivery & grading',
      'Seed or sod installation',
      'Residential & commercial projects',
      'Serving Lancaster, Lehigh & Bucks Counties',
    ],
    badge: null,
  },
  {
    id: 'landscaping',
    icon: '🌳',
    title: 'Full Landscaping',
    price: 'Custom Quote',
    desc: 'Transform your outdoor space. Beds, borders, mulch, and plants — we make your property stand out on the block.',
    features: [
      'Planting & bed design',
      'Mulch installation',
      'Seasonal clean-up & maintenance',
      'Residential & commercial',
    ],
    badge: null,
  },
  {
    id: 'snow',
    icon: '❄️',
    title: 'Snow Removal',
    price: 'Seasonal Rates',
    desc: "When winter hits, we keep your property safe and clear. Set up your snow plan before the first storm hits.",
    features: [
      'Driveways & walkways cleared',
      'Commercial parking lots',
      'Salting & de-icing',
      'Reliable seasonal coverage',
    ],
    badge: 'Winter Ready',
  },
];

function ServiceCard(props) {
  var service = props.service;
  var expanded = useState(false);
  var isExpanded = expanded[0];
  var setExpanded = expanded[1];

  return (
    <div className={'service-card' + (isExpanded ? ' expanded' : '')} onClick={function() { setExpanded(!isExpanded); }}>
      {service.badge && (
        <div className="service-badge">{service.badge}</div>
      )}
      <div className="service-icon">{service.icon}</div>
      <h3 className="service-title">{service.title}</h3>
      <div className="service-price">{service.price}</div>
      <p className="service-desc">{service.desc}</p>

      {isExpanded && (
        <ul className="service-features">
          {service.features.map(function(f, i) {
            return (
              <li key={i}>
                <span className="feature-check">&#10003;</span>
                {f}
              </li>
            );
          })}
        </ul>
      )}

      <div className="service-toggle">
        {isExpanded ? 'Show less ↑' : 'See what\'s included ↓'}
      </div>
    </div>
  );
}

function Services() {
  useEffect(function() {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo('.service-card',
      { opacity: 0, y: 55 },
      {
        opacity: 1, y: 0, duration: 0.75, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.services-grid', start: 'top 82%' }
      }
    );
  }, []);

  return (
    <section id="services" className="py-28 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-18" style={{marginBottom:'4.5rem'}}>
          <span className="section-eyebrow">What We Do</span>
          <h2 className="section-title">Services That<br /><span className="text-lawn">Make It Shine.</span></h2>
          <p className="section-sub">From weekly mowing to full landscape transformations. Tap any card to see what's included.</p>
        </div>

        <div className="services-grid grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map(function(svc, i) {
            return <ServiceCard key={svc.id} service={svc} />;
          })}
        </div>

        <div className="text-center mt-14">
          <a href="tel:4849401922" className="btn-primary-green text-base px-9 py-4">
            Get a Free Quote — (484) 940-1922
          </a>
        </div>
      </div>
    </section>
  );
}

// ===== WHY 5S =====
var WHY_ITEMS = [
  {
    icon: '⚡',
    title: 'Fast',
    desc: "We show up when we say we will. No waiting, no runaround. Scheduled and confirmed — every single time.",
  },
  {
    icon: '💵',
    title: 'Affordable',
    desc: "Fair pricing with zero hidden fees. Weekly mowing starts at just $50 — quality you can see, prices that make sense.",
  },
  {
    icon: '🤝',
    title: 'Reliable',
    desc: "Consistent, professional service on every visit. Same crew, same standard. We treat your property like it's our own.",
  },
  {
    icon: '📍',
    title: 'Always Local',
    desc: "Based in Amity Gardens, PA. We're your neighbors — serving Lehigh, Bucks, Lancaster, and surrounding PA counties.",
  },
];

function WhyUs() {
  useEffect(function() {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo('.why-card',
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.65, stagger: 0.13, ease: 'power2.out',
        scrollTrigger: { trigger: '#why-us', start: 'top 78%' }
      }
    );
    gsap.fromTo('.review-banner',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: '.review-banner', start: 'top 85%' }
      }
    );
  }, []);

  return (
    <section id="why-us" className="py-28 px-5" style={{background:'rgba(15,42,23,0.35)'}}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-18" style={{marginBottom:'4.5rem'}}>
          <span className="section-eyebrow">Why Choose 5S</span>
          <h2 className="section-title">Fast. Affordable.<br /><span className="text-lawn">Reliable.</span></h2>
          <p className="section-sub">Three words we live by — every job, every time, no exceptions.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_ITEMS.map(function(item, i) {
            return (
              <div key={i} className="why-card">
                <div className="why-icon">{item.icon}</div>
                <h3 className="why-title">{item.title}</h3>
                <p className="why-desc">{item.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="review-banner mt-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span style={{color:'#f59e0b',fontSize:'1.8rem',letterSpacing:'2px'}}>&#9733;&#9733;&#9733;&#9733;&#9733;</span>
            <span className="font-outfit font-black text-white text-2xl">100% Recommend</span>
          </div>
          <p className="text-gray-300 text-lg mb-5">Based on 12 Facebook reviews — every single one a 5-star. Our customers speak for us.</p>
          <a
            href="https://www.facebook.com/share/18Vxtpuc7W/"
            className="review-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read the Reviews on Facebook &#8594;
          </a>
        </div>
      </div>
    </section>
  );
}

// ===== SERVICE AREAS =====
var AREAS = [
  'Lehigh County, PA',
  'Bucks County, PA',
  'Lancaster County, PA',
  'Amity Gardens, PA',
  'Montgomery County, PA',
  'Berks County, PA',
];

function ServiceAreas() {
  useEffect(function() {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo('.area-pill',
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: '#areas', start: 'top 80%' }
      }
    );
  }, []);

  return (
    <section id="areas" className="py-28 px-5">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-18" style={{marginBottom:'4.5rem'}}>
          <span className="section-eyebrow">Where We Work</span>
          <h2 className="section-title">Serving<br /><span className="text-lawn">Pennsylvania.</span></h2>
          <p className="section-sub">Based in Amity Gardens — we cover the surrounding PA counties and are always expanding our reach.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {AREAS.map(function(area, i) {
            return (
              <div key={i} className="area-pill">
                <span className="text-lawn mr-2">&#128205;</span>
                {area}
              </div>
            );
          })}
        </div>

        <p className="text-center text-gray-400 text-sm">
          Not sure if we cover your area?{' '}
          <a href="tel:4849401922" className="text-lawn hover:underline font-semibold">Give us a call</a>
          {' '}— we\'re always growing our service area.
        </p>
      </div>
    </section>
  );
}

// ===== CONTACT =====
function Contact() {
  return (
    <section id="contact" className="py-28 px-5 relative overflow-hidden">
      <div className="cta-bg absolute inset-0"></div>
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <span className="section-eyebrow">Get Started</span>
        <h2 className="section-title text-white mb-5">
          Ready for a Better<br /><span className="text-lawn">Looking Lawn?</span>
        </h2>
        <p className="text-gray-300 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
          Call or message us for a free estimate. Weekly mowing starts at $50 — no contracts, no surprises, just results.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
          <a href="tel:4849401922" className="btn-primary-green text-xl px-11 py-5">
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{display:'inline-block',marginRight:'10px',verticalAlign:'middle'}}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.02a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 15z"/></svg>
            (484) 940-1922
          </a>
          <a
            href="https://www.facebook.com/share/18Vxtpuc7W/"
            className="btn-outline-green text-xl px-11 py-5"
            target="_blank"
            rel="noopener noreferrer"
          >
            Message on Facebook
          </a>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-400 text-sm">
          <span>&#128205; Amity Gardens, PA</span>
          <span>&#128222; (484) 940-1922</span>
          <span>&#11088; 100% Recommend on Facebook</span>
        </div>
      </div>
    </section>
  );
}

// ===== FOOTER =====
function Footer() {
  return (
    <footer className="footer py-9 px-5 border-t border-grove">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-3">
          <LogoIcon size={34} />
          <div>
            <div className="text-white font-semibold text-sm">5S Landscaping</div>
            <div className="text-gray-500 text-xs mt-0.5">Amity Gardens, PA &middot; (484) 940-1922</div>
          </div>
        </div>

        <div className="flex gap-7 text-gray-400 text-sm">
          <a href="#services" className="hover:text-lawn transition-colors">Services</a>
          <a href="#why-us"   className="hover:text-lawn transition-colors">Why 5S</a>
          <a href="#areas"    className="hover:text-lawn transition-colors">Areas</a>
          <a href="#contact"  className="hover:text-lawn transition-colors">Contact</a>
          <a href="https://www.facebook.com/share/18Vxtpuc7W/" className="hover:text-lawn transition-colors" target="_blank" rel="noopener noreferrer">Facebook</a>
        </div>

        <div className="text-gray-600 text-xs">
          &copy; 2025 5S Landscaping. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

// ===== APP =====
function App() {
  var scrollState = useState(false);
  var scrolled = scrollState[0];
  var setScrolled = scrollState[1];

  useEffect(function() {
    function onScroll() { setScrolled(window.scrollY > 60); }
    window.addEventListener('scroll', onScroll);
    return function() { window.removeEventListener('scroll', onScroll); };
  }, []);

  return (
    <div className="bg-turf min-h-screen font-inter text-white">
      <Nav scrolled={scrolled} />
      <Hero />
      <TrustBar />
      <Services />
      <WhyUs />
      <ServiceAreas />
      <Contact />
      <Footer />
    </div>
  );
}

var root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));
