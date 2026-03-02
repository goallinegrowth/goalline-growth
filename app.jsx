const { useState, useEffect, useRef } = React;

/* ── Rotating Text (GSAP-powered slide) ── */
function RotatingText({ words, interval = 2500, style }) {
    const [idx, setIdx] = useState(0);
    const spanRef = useRef(null);
    const idxRef = useRef(0);
    useEffect(() => {
        const id = setInterval(() => {
            const gsap = window.gsap;
            const next = (idxRef.current + 1) % words.length;
            if (gsap && spanRef.current) {
                gsap.to(spanRef.current, {
                    y: '-110%', opacity: 0, duration: 0.35, ease: 'power2.inOut',
                    onComplete: () => {
                        idxRef.current = next;
                        setIdx(next);
                        gsap.fromTo(spanRef.current,
                            { y: '110%', opacity: 0 },
                            { y: '0%', opacity: 1, duration: 0.4, ease: 'power2.out' }
                        );
                    }
                });
            } else {
                idxRef.current = next;
                setIdx(next);
            }
        }, interval);
        return () => clearInterval(id);
    }, [words.length, interval]);
    const longest = words.reduce((a, b) => a.length > b.length ? a : b, '');
    return (
        <span style={{ position: 'relative', display: 'inline-flex', overflow: 'hidden', verticalAlign: 'bottom', ...style }}>
            <span style={{ visibility: 'hidden', pointerEvents: 'none', paddingBottom: '0.15em' }}>{longest}</span>
            <span ref={spanRef} style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: '0.15em' }}>
                {words[idx]}
            </span>
        </span>
    );
}

/* ── Glowing Border Effect ── */
function GlowingEffect({ spread = 20, borderWidth = 1, proximity = 0, inactiveZone = 0.7 }) {
    const wrapRef = useRef(null);
    const gsapObj = useRef({ val: 0 });
    const lastPos = useRef({ x: 0, y: 0 });
    const rafRef = useRef(null);

    useEffect(() => {
        const el = wrapRef.current;
        if (!el) return;

        const handleMove = (e) => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(() => {
                const { left, top, width, height } = el.getBoundingClientRect();
                const mx = e ? e.clientX : lastPos.current.x;
                const my = e ? e.clientY : lastPos.current.y;
                if (e) lastPos.current = { x: mx, y: my };

                const cx = left + width * 0.5, cy = top + height * 0.5;
                const dist = Math.hypot(mx - cx, my - cy);
                if (dist < 0.5 * Math.min(width, height) * inactiveZone) {
                    el.style.setProperty('--ga', '0'); return;
                }

                const active = mx > left - proximity && mx < left + width + proximity &&
                    my > top - proximity && my < top + height + proximity;
                el.style.setProperty('--ga', active ? '1' : '0');
                if (!active) return;

                const target = (180 * Math.atan2(my - cy, mx - cx)) / Math.PI + 90;
                const diff = ((target - gsapObj.current.val + 180) % 360) - 180;
                const newAngle = gsapObj.current.val + diff;

                const gsap = window.gsap;
                if (gsap) {
                    gsap.to(gsapObj.current, {
                        val: newAngle, duration: 2, ease: 'power1.out', overwrite: true,
                        onUpdate: () => el.style.setProperty('--gs', String(gsapObj.current.val))
                    });
                } else {
                    gsapObj.current.val = newAngle;
                    el.style.setProperty('--gs', String(newAngle));
                }
            });
        };

        const onScroll = () => handleMove(null);
        window.addEventListener('scroll', onScroll, { passive: true });
        document.body.addEventListener('pointermove', handleMove, { passive: true });
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            window.removeEventListener('scroll', onScroll);
            document.body.removeEventListener('pointermove', handleMove);
        };
    }, [inactiveZone, proximity]);

    return (
        <div ref={wrapRef} className="glow-wrap" style={{ '--gw': `${borderWidth}px`, '--gsp': spread }}>
            <div className="glow-inner" />
        </div>
    );
}

/* ── Quiz ── */
const STEPS = [
    {
        id: 'biz', step: '01', label: 'Step 1 of 5', q: 'What type of business are you running?', sub: 'We work with local service businesses. Pick the closest match.', multi: false,
        opts: [
            { v: 'hvac', e: <QWrench />, l: 'HVAC / Trades', d: 'Heating, cooling, plumbing, electrical' },
            { v: 'med', e: <QCross />, l: 'Medical / Transport', d: 'Healthcare, medical transport, clinics' },
            { v: 'travel', e: <QPlane />, l: 'Travel / Hospitality', d: 'Travel agencies, tourism, vacation planning' },
            { v: 'food', e: <QFork />, l: 'Restaurant / Retail', d: 'Food service, retail, consumer goods' },
            { v: 'pro', e: <QBriefcase />, l: 'Professional Services', d: 'Legal, financial, consulting, real estate' },
            { v: 'other', e: <QLightning />, l: 'Other Local Business', d: 'Cleaning, fitness, beauty, and more' },
        ],
    },
    {
        id: 'sit', step: '02', label: 'Step 2 of 5', q: 'Where are you right now digitally?', sub: "Be honest — this helps us figure out exactly where to start.", multi: false,
        opts: [
            { v: 'none', e: <QCircleX />, l: 'No real online presence', d: 'Little to no website or digital footprint' },
            { v: 'template', e: <QBrowser />, l: "Template site that's not working", d: 'Have a Wix, Squarespace, or basic site' },
            { v: 'old', e: <QClock />, l: 'Custom site but outdated', d: 'Professionally built but old and underperforming' },
            { v: 'burned', e: <QWarning />, l: 'Burned by an agency before', d: 'Paid good money, got bad results' },
        ],
    },
    {
        id: 'rev', step: '03', label: 'Step 3 of 5', q: 'What\'s your current annual revenue?', sub: 'This helps us tailor the right growth strategy for your stage.', multi: false,
        opts: [
            { v: 'u300', e: <QChartUp />, l: 'Under $300K', d: 'Early growth stage — building momentum' },
            { v: '1m', e: <QRocket />, l: '$300K — $1M', d: 'Growing and ready to scale' },
            { v: '3m', e: <QFlame />, l: '$1M — $3M', d: 'Established and ready to dominate' },
            { v: 'over', e: <QTrophy />, l: 'Over $3M', d: 'Scaling to the next level' },
        ],
    },
    {
        id: 'need', step: '04', label: 'Step 4 of 5', q: 'What do you need most right now?', sub: 'Select all that apply — we build full stacks or focused solutions.', multi: true,
        opts: [
            { v: 'web', e: <QGlobe />, l: 'A website that actually converts', d: 'Custom-built, crafted from scratch' },
            { v: 'ai', e: <QCircuit />, l: 'AI lead automation', d: 'Chatbot + voice receptionist, 24/7' },
            { v: 'ads', e: <QBarChart />, l: 'Performance advertising', d: 'Google & Meta ads that prove ROI' },
            { v: 'loyalty', e: <QStar />, l: 'Customer loyalty system', d: 'Keep customers coming back (Nexr)' },
        ],
    },
    {
        id: 'time', step: '05', label: 'Step 5 of 5', q: 'How fast do you want to move?', sub: 'No wrong answer — this just helps us prioritize your call.', multi: false,
        opts: [
            { v: 'now', e: <QBolt />, l: 'Ready to start now', d: "Let's go — I know what I want" },
            { v: '30days', e: <QCalendar />, l: 'Within the next 30 days', d: 'Exploring but getting close to deciding' },
            { v: 'looking', e: <QSearch />, l: 'Just exploring options', d: "Learning what's possible before committing" },
        ],
    },
];

function Quiz() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [contact, setContact] = useState({ name: '', email: '' });
    const [done, setDone] = useState(false);
    const [dir, setDir] = useState(1);
    const bodyRef = useRef(null);
    const total = STEPS.length;
    const isContact = step === total;
    const cur = STEPS[step];
    const pct = isContact ? 90 : Math.round((step / total) * 100);

    const valid = () => {
        if (isContact) return contact.name.trim().length > 0 && contact.email.includes('@');
        const a = answers[cur?.id];
        if (!a) return false;
        return cur.multi ? (Array.isArray(a) && a.length > 0) : true;
    };

    const animate = (cb) => {
        const gsap = window.gsap;
        if (!gsap || !bodyRef.current) { cb(); return; }
        const xOut = dir > 0 ? -40 : 40;
        gsap.to(bodyRef.current, {
            opacity: 0, x: xOut, duration: 0.2, ease: 'power2.in', onComplete: () => {
                cb();
                gsap.fromTo(bodyRef.current, { opacity: 0, x: -xOut }, { opacity: 1, x: 0, duration: 0.35, ease: 'power3.out' });
            }
        });
    };

    const pick = (id, v, multi) => {
        setAnswers(p => {
            if (multi) {
                const cur = Array.isArray(p[id]) ? p[id] : [];
                return { ...p, [id]: cur.includes(v) ? cur.filter(x => x !== v) : [...cur, v] };
            }
            return { ...p, [id]: v };
        });
        if (!multi) {
            setTimeout(() => { setDir(1); animate(() => setStep(s => s + 1)); }, 200);
        }
    };

    const next = () => { if (!valid()) return; setDir(1); animate(() => setStep(s => s + 1)); };
    const back = () => { if (step === 0) return; setDir(-1); animate(() => setStep(s => s - 1)); };
    const submit = () => {
        if (!valid()) return;
        setDone(true);
        setTimeout(() => { window.open('https://calendly.com/goalline-growth1/discovery-call', '_blank'); }, 2200);
    };

    if (done) return (
        <div className="quiz-wrap" style={{ textAlign: 'center', padding: '5rem 2rem' }}>
            <GlowingEffect spread={60} borderWidth={1.5} proximity={64} inactiveZone={0.01} />
            <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}><QuizSuccessIco /></div>
            <div style={{ fontWeight: 800, fontSize: 'clamp(1.75rem,3.5vw,2.25rem)', letterSpacing: '-0.025em', color: '#fff', marginBottom: '1rem' }}>
                You're all set{contact.name ? `, ${contact.name.split(' ')[0]}` : ''}.
            </div>
            <p style={{ color: '#8892A4', fontSize: '1.0625rem', lineHeight: 1.7, maxWidth: '420px', margin: '0 auto 2.5rem' }}>
                Opening your booking page now. We'll review your answers before the call so we come prepared.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.625rem', background: 'rgba(0,229,160,0.08)', border: '1px solid rgba(0,229,160,0.25)', borderRadius: '9999px', padding: '0.625rem 1.5rem', color: '#00E5A0', fontSize: '0.9375rem', fontWeight: 600 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#00E5A0', display: 'inline-block', animation: 'pulse 1.5s ease infinite', boxShadow: '0 0 10px rgba(0,229,160,0.5)' }} />
                Redirecting to your booking page…
            </div>
        </div>
    );

    return (
        <div className="quiz-wrap">
            <GlowingEffect spread={50} borderWidth={1.5} proximity={64} inactiveZone={0.01} />
            <div style={{ position: 'relative', zIndex: 5 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#8892A4', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{isContact ? 'Last step' : `${step + 1} of ${total}`}</span>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#00C2FF' }}>{pct}% complete</span>
                </div>
                <div className="progress-track"><div className="progress-fill" style={{ width: `${pct}%` }} /></div>

                <div ref={bodyRef}>
                    {isContact ? (
                        <>
                            <span className="section-label" style={{ marginBottom: '0.5rem', fontSize: '0.8125rem' }}>Almost there</span>
                            <h3 className="quiz-q">Where should we send the recap?</h3>
                            <p className="quiz-sub">We review your answers before the call so we show up prepared — not winging it.</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
                                <div>
                                    <label className="form-label">Your name</label>
                                    <input className="form-input" type="text" placeholder="First Last" value={contact.name} onChange={e => setContact(p => ({ ...p, name: e.target.value }))} />
                                </div>
                                <div>
                                    <label className="form-label">Email address</label>
                                    <input className="form-input" type="email" placeholder="you@yourbusiness.com" value={contact.email} onChange={e => setContact(p => ({ ...p, email: e.target.value }))} />
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <span className="section-label" style={{ marginBottom: '0.5rem', fontSize: '0.8125rem' }}>{cur.label}</span>
                            <h3 className="quiz-q">{cur.q}</h3>
                            <p className="quiz-sub">{cur.sub}</p>
                            <div style={{ display: 'grid', gridTemplateColumns: cur.opts.length >= 6 ? 'repeat(auto-fit,minmax(280px,1fr))' : '1fr', gap: '1rem', marginBottom: '2.5rem' }}>
                                {cur.opts.map(o => {
                                    const ans = answers[cur.id];
                                    const sel = cur.multi ? (Array.isArray(ans) && ans.includes(o.v)) : ans === o.v;
                                    return (
                                        <div key={o.v} className={`opt-card ${sel ? 'sel' : ''}`} onClick={() => pick(cur.id, o.v, cur.multi)} tabIndex={0} role="button" onKeyDown={e => e.key === 'Enter' && pick(cur.id, o.v, cur.multi)}>
                                            <div className="opt-icon">{o.e}</div>
                                            <div style={{ flex: 1 }}>
                                                <div className="opt-label">{o.l}</div>
                                                {o.d && <div className="opt-desc">{o.d}</div>}
                                            </div>
                                            {cur.multi
                                                ? <div className="opt-checkbox">{sel && <IcoCheck s={12} c="#0A0A0F" />}</div>
                                                : <div className="opt-check">{sel && <IcoCheck s={12} c="#0A0A0F" />}</div>
                                            }
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                        {step > 0
                            ? <button onClick={back} className="btn btn-outline" style={{ padding: '0.875rem 1.5rem', fontSize: '0.9375rem', gap: '0.5rem' }}><IcoArrowL s={16} /> Back</button>
                            : <div />
                        }
                        {(isContact || cur?.multi) && (
                            <button onClick={isContact ? submit : next} className="btn btn-electric" disabled={!valid()} style={{ padding: '0.875rem 2rem', fontSize: '0.9375rem', gap: '0.625rem', opacity: valid() ? 1 : 0.4, cursor: valid() ? 'pointer' : 'not-allowed' }}>
                                {isContact ? <><span>Book My Free Call</span><IcoArrow s={16} /></> : <><span>Continue</span><IcoArrow s={16} /></>}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
/* ── ROI Estimator ── */
function ROIEstimator() {
    const [spend, setSpend] = useState(2500);
    const [ticket, setTicket] = useState(1500);

    const leads = Math.round(spend / 50);
    const extraSales = Math.round(leads * 0.15);
    const extraRev = extraSales * ticket;

    return (
        <div className="roi-card section-animate">
            <GlowingEffect spread={40} borderWidth={1.5} proximity={64} inactiveZone={0.01} />
            <div style={{ position: 'relative', zIndex: 5 }}>
                <h3 style={{ fontWeight: 800, fontSize: '1.5rem', marginBottom: '1.5rem', letterSpacing: '-0.02em', color: '#fff' }}>
                    See How Much You're Leaving on the Table
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: '2rem' }}>
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <label className="form-label" style={{ margin: 0 }}>Monthly Ad Spend</label>
                            <span style={{ fontWeight: 700, color: '#00C2FF' }}>${spend.toLocaleString()}</span>
                        </div>
                        <input type="range" className="range-slider" min="500" max="20000" step="500" value={spend} onChange={e => setSpend(Number(e.target.value))} />
                    </div>
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <label className="form-label" style={{ margin: 0 }}>Avg. Ticket Size</label>
                            <span style={{ fontWeight: 700, color: '#00C2FF' }}>${ticket.toLocaleString()}</span>
                        </div>
                        <input type="range" className="range-slider" min="100" max="10000" step="100" value={ticket} onChange={e => setTicket(Number(e.target.value))} />
                    </div>
                </div>

                <div className="roi-result">
                    <p style={{ margin: '0 0 0.5rem', color: '#8892A4', fontSize: '0.9375rem' }}>Estimated Untapped Monthly Revenue</p>
                    <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#00E5A0', letterSpacing: '-0.03em', lineHeight: 1 }}>
                        +${extraRev.toLocaleString()}
                    </div>
                    <p style={{ margin: '0.75rem 0 0', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.4)' }}>
                        *Based on standard conversion rate improvements from our optimized landing pages and AI follow-up.
                    </p>
                </div>
            </div>
        </div>
    );
}

const SERVICES_DATA = [
    {
        id: 'web', icon: <IcoGlobe c="#00C2FF" s={28} />, bg: 'rgba(0,194,255,0.1)', accent: '#00C2FF', tag: 'Crafted, Not Templated', title: 'Custom Websites',
        desc: 'Every site starts from a blank canvas. Designed specifically for your brand, and engineered for high conversions.',
        bullets: ['Conversion-optimized UX', 'Mobile-first responsive', 'SEO & performance built-in'],
        tech: ['React / Next.js', 'Figma', 'GSAP Animation', 'Tailwind CSS'],
        approach: 'We don’t believe in templates. Your business is unique, and your digital presence should reflect that. We start with a deep dive into your brand architecture, wireframing a user journey designed specifically to turn your traffic into booked appointments.'
    },
    {
        id: 'ai', icon: <IcoBot c="#00E5A0" s={28} />, bg: 'rgba(0,229,160,0.1)', accent: '#00E5A0', tag: 'Future-Ready', title: 'AI Automation',
        desc: 'AI chatbot + voice receptionist that handles leads, answers questions, and books appointments securely 24/7.',
        bullets: ['AI chatbot on your site', 'Voice receptionist system', 'Automated booking flow'],
        tech: ['OpenAI / GPT-4', 'Twilio Voice', 'Dialogflow', 'Zapier Automation'],
        approach: 'Missed calls equal missed revenue. We deploy intelligent conversational agents that instantly respond to inbound inquiries, qualify leads, and map directly into your CRM or booking software.'
    },
    {
        id: 'ads', icon: <IcoBars c="#00C2FF" s={28} />, bg: 'rgba(0,194,255,0.08)', accent: '#00C2FF', tag: 'Built to Perform', title: 'Performance Ads',
        desc: 'Google and Meta ads with absolute accountability. You pay platforms directly. We handle strategy and optimization.',
        bullets: ['Google & Meta campaigns', 'Zero platform markup', 'Full ROI tracking'],
        tech: ['Google Ads Network', 'Meta Business Suite', 'Google Tag Manager', 'Server-Side Tracking'],
        approach: 'No vanity metrics. We only care about cost-per-acquisition (CPA) and return on ad spend (ROAS). We meticulously track every click through to conversion, optimizing campaigns daily to ensure your budget is driving tangible pipeline growth.'
    },
    {
        id: 'nexr', icon: <IcoStar c="#A78BFA" s={28} />, bg: 'rgba(124,58,237,0.1)', accent: '#A78BFA', tag: 'Keep Them Coming Back', title: 'Nexr Loyalty',
        desc: 'Digital loyalty cards, QR check-in, tiered rewards, and seamless retention analytics. No app required.',
        bullets: ['Apple/Google Wallet cards', 'Instant QR check-in', 'Real-time retention data'],
        tech: ['Apple Wallet Push', 'Google Pay API', 'QR Web-App', 'Real-time Dashboard'],
        approach: 'Acquisition is expensive; retention is cheap. Nexr slips seamlessly into your customers’ native digital wallets, giving you a direct push-notification channel to bring them back when business is slow.'
    },
];

/* ── App ── */
function App() {
    const [scrolled, setScrolled] = useState(false);
    const [menu, setMenu] = useState(false);
    const [activeModal, setActiveModal] = useState(null);

    const closeModal = () => setActiveModal(null);

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', fn, { passive: true });
        return () => window.removeEventListener('scroll', fn);
    }, []);

    useEffect(() => { document.body.style.overflow = menu ? 'hidden' : ''; }, [menu]);

    useEffect(() => {
        const gsap = window.gsap, ST = window.ScrollTrigger;
        if (!gsap || !ST) return;
        gsap.registerPlugin(ST);

        // Hero Custom Entry
        gsap.fromTo('.hero-animate', { y: 60, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.12, duration: 1.2, ease: 'power3.out', delay: 0.15 });

        // Section fades
        document.querySelectorAll('.section-animate').forEach(el => {
            gsap.fromTo(el, { y: 32, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } });
        });

        // Card groups
        document.querySelectorAll('.card-group').forEach(g => {
            const kids = g.children;
            gsap.fromTo(kids, { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.75, ease: 'power3.out', scrollTrigger: { trigger: g, start: 'top 85%' } });
        });

        // Step connectors
        document.querySelectorAll('.step-connector').forEach((el, i) => {
            gsap.to(el, { scaleX: 1, duration: 1.4, ease: 'power2.inOut', delay: i * 0.2, scrollTrigger: { trigger: el, start: 'top 85%' } });
        });

        // Villain icon stroke draw-in
        document.querySelectorAll('.v-icon-path').forEach(el => {
            const len = (typeof el.getTotalLength === 'function') ? el.getTotalLength() : 60;
            gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
            gsap.to(el, {
                strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut',
                scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
            });
        });

        // Nexr icon stroke draw-in
        document.querySelectorAll('.n-icon-path').forEach(el => {
            if (!el.getTotalLength) return;
            const len = el.getTotalLength();
            gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
            gsap.to(el, {
                strokeDashoffset: 0, duration: 1.5, ease: 'power2.inOut',
                scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' }
            });
        });
    }, []);

    const navLinks = [
        { href: '#services', l: 'Services' },
        { href: '#how-it-works', l: 'Process' },
        { href: '#nexr', l: 'Nexr' },
        { href: '#qualify', l: 'Get Started' },
    ];

    const Wordmark = () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: 40, height: 40, borderRadius: '10px', overflow: 'hidden', flexShrink: 0, background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src="logo.png" alt="GoalLine Growth" style={{ width: '40px', height: 'auto', display: 'block' }} />
            </div>
            <span style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.03em', color: '#fff' }}>
                Goal<span style={{ color: '#00C2FF' }}>Line</span>
                <span style={{ fontWeight: 500, color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}> Growth</span>
            </span>
        </div>
    );

    return (
        <>
            {/* NAV */}
            <nav style={{ padding: scrolled ? '0 1rem' : '0 1.5rem', top: scrolled ? '10px' : '0' }}>
                <div className={`nav-inner ${scrolled ? 'scrolled' : ''}`}>
                    <a href="#" style={{ textDecoration: 'none' }}><Wordmark /></a>
                    <div className="desktop-nav" style={{ display: 'flex', gap: '0.5rem' }}>
                        {navLinks.map(l => <a key={l.href} href={l.href} className="nav-link">{l.l}</a>)}
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <a href="#qualify" className="btn btn-electric" style={{ padding: '0.625rem 1.5rem', fontSize: '0.9375rem' }}>Book a Free Call</a>
                        <button className="hamburger-btn" onClick={() => setMenu(true)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}><IcoMenu /></button>
                    </div>
                </div>
            </nav>

            {/* MOBILE MENU */}
            {menu && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(10,10,15,0.95)', backdropFilter: 'blur(32px)', zIndex: 200, display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                        <Wordmark />
                        <button onClick={() => setMenu(false)} style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '8px', border: 'none', color: '#fff', cursor: 'pointer', padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><IcoX /></button>
                    </div>
                    {navLinks.map(l => <a key={l.href} href={l.href} onClick={() => setMenu(false)} style={{ fontWeight: 700, fontSize: '2rem', color: '#fff', textDecoration: 'none', padding: '1.25rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{l.l}</a>)}
                    <a href="#qualify" onClick={() => setMenu(false)} className="btn btn-electric" style={{ padding: '1.25rem', fontSize: '1.125rem', marginTop: '3rem' }}>Book a Free Call</a>
                </div>
            )}

            {/* HERO */}
            <section className="hero-section">
                <div className="gl-blob gl-blob-1" />
                <div className="gl-blob gl-blob-2" />
                <div className="gl-blob gl-blob-3" />
                <div className="gl-blob gl-blob-4" />
                <div className="hero-grid" />
                <div className="hero-content" style={{ paddingBottom: '7rem', paddingTop: '5rem' }}>
                    <div className="hero-animate">
                        <span className="hero-badge" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
                            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00E5A0', boxShadow: '0 0 10px #00E5A0', display: 'inline-block' }} />
                            Full-Stack Growth Partner for Local Services
                        </span>
                    </div>
                    <h1 className="hero-h1 hero-animate">
                        We don't just run{' '}
                        <RotatingText
                            words={['campaigns', 'websites', 'automation', 'loyalty']}
                            interval={3000}
                            style={{ color: '#00C2FF' }}
                        /><br />
                        We <em>cross the line</em> <strong>with you.</strong>
                    </h1>
                    <p className="hero-sub hero-animate">
                        Beautifully crafted modern websites. Smart AI automation. Accountable performance ads. We are in the game with you — and we only win when you win.
                    </p>
                    <div className="hero-animate" style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '1rem' }}>
                        <a href="#qualify" className="btn btn-electric" style={{ padding: '1.125rem 2.25rem', fontSize: '1.0625rem', gap: '0.625rem' }}>Book a Free Call <IcoArrow s={18} /></a>
                        <a href="#services" className="btn btn-outline" style={{ padding: '1.125rem 2.25rem', fontSize: '1.0625rem' }}>See What We Build</a>
                    </div>
                </div>
                <div className="hero-trust" style={{ gap: '1rem 2rem' }}>
                    {[
                        [<BrandGoogle s={22} />, 'Google Partner'],
                        [<BrandMeta s={22} />, 'Meta Business Partner'],
                        [<BrandReact s={22} />, 'React/Webflow Expert']
                    ].map(([icon, label], i) => (
                        <div key={i} className="trust-item" style={{ gap: '0.625rem', fontSize: '0.8125rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.9 }}>
                                {icon}
                            </div>
                            {label}
                        </div>
                    ))}
                </div>
            </section>

            {/* PROBLEM */}
            <section style={{ background: '#0A0A0F', padding: 'clamp(5rem,10vw,8rem) 1.5rem' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div className="section-animate" style={{ maxWidth: '720px', marginBottom: '4rem' }}>
                        <span className="section-label">The Problem</span>
                        <h2 className="section-h2">You've been burned.<br /><span style={{ color: '#8892A4' }}>We built GoalLine because of it.</span></h2>
                        <p className="section-body">
                            Thousands of local business owners have paid for promises and gotten nothing. Retainers that kept billing. Templates that look like every competitor's. Decks full of jargon with no connection to actual revenue.
                        </p>
                    </div>
                    <div className="card-group" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1.25rem', marginBottom: '3.5rem' }}>
                        {[
                            { icon: <VilBillingLoop />, t: 'Retainers for nothing', d: "Agencies keep billing month after month regardless of results. Your budget disappears. Your growth doesn't." },
                            { icon: <VilTemplates />, t: 'Templates everywhere', d: "Your site looks identical to your competitor's because they used the same cheap theme. Zero differentiation." },
                            { icon: <VilJargon />, t: 'Jargon without accountability', d: 'Decks full of "impressions" and "brand awareness" with zero connection to actual revenue.' },
                            { icon: <VilDisappear />, t: 'Disappear after launch', d: 'Big energy during the pitch. Radio silence after you sign. Support tickets go unanswered for weeks.' },
                        ].map((c, i) => (
                            <div key={i} className="villain-card">
                                <GlowingEffect spread={40} borderWidth={1.5} proximity={72} inactiveZone={0.01} />
                                <div style={{ position: 'relative', zIndex: 5, display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                                    <div className="v-icon-wrap">{c.icon}</div>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: '1.0625rem', color: '#fff', marginBottom: '0.5rem', letterSpacing: '-0.01em' }}>{c.t}</div>
                                        <div style={{ fontSize: '0.9rem', color: '#8892A4', lineHeight: 1.65 }}>{c.d}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="section-animate" style={{ padding: '2.5rem 3rem', background: 'rgba(0,229,160,0.04)', border: '1px solid rgba(0,229,160,0.15)', borderRadius: '1.5rem', backdropFilter: 'blur(24px)', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
                        <div style={{ fontWeight: 800, fontSize: 'clamp(1.25rem,3vw,1.5rem)', color: '#fff', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>GoalLine is the response to that system.</div>
                        <p style={{ color: '#e2e8f0', lineHeight: 1.75, margin: 0, fontSize: '1.0625rem', maxWidth: '760px' }}>
                            We are the clutch teammate — in the game with you, executing when it counts. Performance-based. Transparent. Built on one unbreakable rule: <strong style={{ color: '#00E5A0' }}>we only win when you win.</strong>
                        </p>
                    </div>
                </div>
            </section>

            {/* SERVICES */}
            <section id="services" style={{ background: '#091523', padding: 'clamp(5rem,10vw,8rem) 1.5rem', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(0,194,255,0.2), transparent)' }} />
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div className="section-animate" style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
                        <span className="section-label">What We Build</span>
                        <h2 className="section-h2">The full stack.<br />Nothing missing.</h2>
                        <p className="section-body" style={{ margin: '0 auto' }}>
                            We build the complete digital engine for local service businesses. Custom design, smart automation, and precise advertising all under one roof.
                        </p>
                    </div>
                    <div className="card-group" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '1.5rem' }}>
                        {SERVICES_DATA.map((s, i) => (
                            <div key={i} className="gl-card" style={{ padding: '2.5rem 2rem' }} onClick={() => setActiveModal(s)}>
                                <div className="service-icon-box" style={{ background: s.bg, boxShadow: `0 4px 16px ${s.bg}` }}>{s.icon}</div>
                                <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: s.accent, marginBottom: '0.75rem' }}>{s.tag}</div>
                                <h3 style={{ fontWeight: 800, fontSize: '1.375rem', letterSpacing: '-0.02em', color: '#fff', margin: '0 0 1rem' }}>{s.title}</h3>
                                <p style={{ fontSize: '0.9375rem', color: '#8892A4', lineHeight: 1.7, margin: '0 0 1.75rem', flexGrow: 1 }}>{s.desc}</p>
                                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem', marginTop: 'auto' }}>
                                    {s.bullets.map((b, j) => (
                                        <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>
                                            <IcoCheck s={16} c={s.accent} /> {b}
                                        </li>
                                    ))}
                                </ul>
                                <div className="card-cta" style={{ color: s.accent }}>Explore approach <IcoArrow s={14} /></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section id="how-it-works" style={{ background: '#0A0A0F', padding: 'clamp(5rem,10vw,8rem) 1.5rem', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }} />
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div className="section-animate" style={{ textAlign: 'center', marginBottom: '5rem' }}>
                        <span className="section-label">Our Process</span>
                        <h2 className="section-h2">Four steps. Full clarity.<br />No surprises.</h2>
                        <p className="section-body" style={{ margin: '0 auto' }}>
                            Every GoalLine client moves through the same transparent four-step process. You know exactly where things are, what's next, and what it costs.
                        </p>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'stretch' }}>
                        {[
                            { n: '01', t: 'Consultation', d: "We dissect your business, goals, and understand exactly where you're losing. We diagnose the pain before prescribing the cure." },
                            { n: '02', t: 'Scope & Quote', d: 'An itemized proposal where you see exactly what you\'re paying for. If the budget is tight, we rework it. No hidden fees.' },
                            { n: '03', t: 'Build Phase', d: "We design and develop with you in the loop. Regular check-ins and live previews. You track progress — absolutely no big-reveal surprises." },
                            { n: '04', t: 'Launch & Grow', d: "We deploy everything and stay in it. Ads tracked, AI active, full monthly reporting. We don't vanish after launch. This is the partnership." },
                        ].map((s, i, arr) => (
                            <React.Fragment key={i}>
                                <div className="step-card">
                                    <div className="step-num">{s.n}</div>
                                    <h3 style={{ fontWeight: 800, fontSize: '1.375rem', letterSpacing: '-0.02em', color: '#fff', margin: '0 0 1rem' }}>{s.t}</h3>
                                    <p style={{ fontSize: '0.9375rem', color: '#8892A4', lineHeight: 1.7, margin: 0 }}>{s.d}</p>
                                </div>
                                {i < arr.length - 1 && <div className="step-connector" />}
                            </React.Fragment>
                        ))}
                    </div>
                    <div className="section-animate" style={{ textAlign: 'center', marginTop: '4.5rem' }}>
                        <a href="#qualify" className="btn btn-electric" style={{ padding: '1.125rem 2.5rem', fontSize: '1.0625rem', gap: '0.625rem' }}>
                            Start With a Free Consultation <IcoArrow s={18} />
                        </a>
                    </div>
                </div>
            </section>

            {/* NEXR */}
            <section id="nexr" className="nexr-section" style={{ padding: 'clamp(5rem,10vw,8rem) 1.5rem' }}>
                <div className="nexr-blob nexr-blob-1" />
                <div className="nexr-blob nexr-blob-2" />
                <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(340px,1fr))', gap: '5rem', alignItems: 'center' }}>
                        <div className="section-animate">
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '9999px', padding: '0.5rem 1.25rem', marginBottom: '1.75rem', boxShadow: '0 4px 16px rgba(124,58,237,0.2)' }}>
                                <span style={{ fontWeight: 800, fontSize: '0.9375rem', letterSpacing: '-0.02em', color: '#A78BFA' }}>NEXR</span>
                                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Powered by GoalLine</span>
                            </div>
                            <h2 className="section-h2" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}>Keep them<br /><span style={{ background: 'linear-gradient(135deg, #A78BFA, #7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>coming back.</span></h2>
                            <p className="section-body" style={{ marginBottom: '1.5rem', fontSize: '1.125rem', color: '#e2e8f0', fontWeight: 500 }}>
                                Most local businesses spend everything winning a new customer and nothing keeping them. Nexr closes that loop securely.
                            </p>
                            <p style={{ color: '#8892A4', fontSize: '1rem', lineHeight: 1.75, marginBottom: '2.5rem' }}>
                                Deploy digital loyalty cards that live quietly in your customer's phone wallet. Custom-branded to your business. No clunky app downloads. No physical plastic cards. Instant QR check-in — fully managed by our team.
                            </p>
                            <a href="#qualify" className="btn btn-purple" style={{ padding: '1.125rem 2.25rem', fontSize: '1.0625rem', gap: '0.625rem' }}>
                                Add Nexr to My Package <IcoArrow s={18} />
                            </a>
                        </div>
                        <div className="card-group" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            {[
                                { icon: <NexrCardIco />, n: 'Nexr Card', d: 'Custom-branded digital loyalty card. Lives seamlessly in Apple & Google Wallet.' },
                                { icon: <NexrTapIco />, n: 'Nexr Tap', d: 'Instant QR check-in — scan to earn points, scan to redeem fast. Zero friction.' },
                                { icon: <NexrTiersIco />, n: 'Nexr Tiers', d: 'Design custom milestones, VIP tiers, and compelling rewards that excite guests.' },
                                { icon: <NexrPulseIco />, n: 'Nexr Pulse', d: "Interactive real-time dashboard. See exactly who's returning and what's working." },
                            ].map((f, i) => (
                                <div key={i} className="nexr-feature">
                                    <GlowingEffect spread={30} borderWidth={1.5} proximity={64} inactiveZone={0.01} />
                                    <div style={{ position: 'relative', zIndex: 5, display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                        <div className="n-icon-wrap" style={{ boxShadow: '0 4px 12px rgba(124,58,237,0.15)' }}>{f.icon}</div>
                                        <div>
                                            <div style={{ fontWeight: 700, fontSize: '1.0625rem', color: '#A78BFA', marginBottom: '0.375rem' }}>{f.n}</div>
                                            <div style={{ fontSize: '0.9375rem', color: '#e2e8f0', lineHeight: 1.6 }}>{f.d}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* QUALIFYING QUIZ */}
            <section id="qualify" style={{ background: '#091523', padding: 'clamp(5rem,10vw,8rem) 1.5rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(0,194,255,0.2), transparent)' }} />
                <div className="gl-blob gl-blob-1" style={{ opacity: 0.25, background: 'radial-gradient(circle, rgba(0,194,255,0.15) 0%, transparent 70%)' }} />
                <div className="gl-blob gl-blob-2" style={{ opacity: 0.25, background: 'radial-gradient(circle, rgba(0,229,160,0.1) 0%, transparent 70%)' }} />
                <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
                    <div className="section-animate" style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <span className="section-label">Get Started</span>
                        <h2 className="section-h2">Answer 5 quick questions.<br /><span style={{ color: '#00C2FF' }}>Book your discovery call.</span></h2>
                        <p className="section-body" style={{ margin: '0 auto' }}>
                            We review your answers prior to the call so we show up thoroughly prepared — not guessing what you actually need. Takes only 90 seconds.
                        </p>
                    </div>
                    <ROIEstimator />
                    <Quiz />
                </div>
            </section>

            {/* SERVICE MODAL */}
            <div className={`modal-overlay ${activeModal ? 'open' : ''}`} onClick={closeModal}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    <button className="modal-close" onClick={closeModal}><IcoX s={18} /></button>
                    {activeModal && (
                        <>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem' }}>
                                <div className="service-icon-box" style={{ background: activeModal.bg, boxShadow: `0 4px 16px ${activeModal.bg}`, margin: 0 }}>{activeModal.icon}</div>
                                <div>
                                    <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: activeModal.accent, marginBottom: '0.375rem' }}>{activeModal.tag}</div>
                                    <h3 style={{ fontWeight: 800, fontSize: '1.75rem', letterSpacing: '-0.02em', color: '#fff', margin: 0 }}>{activeModal.title}</h3>
                                </div>
                            </div>
                            <p style={{ fontSize: '1.0625rem', color: '#e2e8f0', lineHeight: 1.7, marginBottom: '2rem' }}>
                                {activeModal.approach}
                            </p>

                            <h4 style={{ fontWeight: 700, fontSize: '0.875rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', margin: '0 0 1rem' }}>Tech Stack & Capabilities</h4>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                                {activeModal.tech.map((t, i) => (
                                    <div key={i} style={{ padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '9999px', fontSize: '0.875rem', color: '#fff', fontWeight: 500 }}>
                                        {t}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* FOOTER */}
            <footer style={{ padding: 'clamp(4rem,6vw,6rem) 1.5rem 2.5rem' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '4rem', marginBottom: '4rem' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                                <div style={{ width: 44, height: 44, borderRadius: '10px', overflow: 'hidden', flexShrink: 0, background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <img src="logo.png" alt="GoalLine Growth" style={{ width: '44px', height: 'auto', display: 'block' }} />
                                </div>
                                <div style={{ fontWeight: 800, fontSize: '1.375rem', letterSpacing: '-0.03em', color: '#fff' }}>
                                    Goal<span style={{ color: '#00C2FF' }}>Line</span>
                                    <span style={{ fontWeight: 400, color: 'rgba(255,255,255,0.35)', fontSize: '1rem' }}> Growth</span>
                                </div>
                            </div>
                            <p style={{ fontSize: '1rem', color: '#8892A4', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '300px' }}>
                                Building modern, high-performance digital experiences that elevate and scale local businesses.
                            </p>
                            <a href="tel:+13213148444" className="footer-link" style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>📞 321-314-8444</a>
                            <a href="mailto:adrian@goallinegrowth.com" className="footer-link" style={{ fontSize: '1rem' }}>✉ adrian@goallinegrowth.com</a>
                        </div>
                        <div>
                            <h4 style={{ fontWeight: 700, color: '#fff', fontSize: '0.875rem', letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 1.5rem', opacity: 0.9 }}>Services</h4>
                            {['Custom Websites', 'AI Automation', 'Performance Ads', 'Nexr Loyalty'].map((l, i) => <a key={i} href="#services" className="footer-link">{l}</a>)}
                        </div>
                        <div>
                            <h4 style={{ fontWeight: 700, color: '#fff', fontSize: '0.875rem', letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 1.5rem', opacity: 0.9 }}>Company</h4>
                            {[['How It Works', '#how-it-works'], ['Nexr Platform', '#nexr'], ['Get Started', '#qualify']].map(([l, h], i) => <a key={i} href={h} className="footer-link">{l}</a>)}
                        </div>
                        <div>
                            <h4 style={{ fontWeight: 700, color: '#fff', fontSize: '0.875rem', letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 1.5rem', opacity: 0.9 }}>Ready to cross the line?</h4>
                            <p style={{ fontSize: '0.9375rem', color: '#8892A4', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                                5 questions to help us understand where you are. Followed by a strategy call.
                            </p>
                            <a href="#qualify" className="btn btn-electric" style={{ padding: '1rem 1.75rem', fontSize: '1rem', gap: '0.5rem' }}>
                                Book Free Call <IcoArrow s={16} />
                            </a>
                        </div>
                    </div>
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '2rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                        <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.35)', margin: 0 }}>© 2026 GoalLine Growth. All rights reserved.</p>
                        <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.3)', margin: 0, fontWeight: 500, letterSpacing: '0.02em' }}>goallinegrowth.com</p>
                    </div>
                </div>
            </footer>
        </>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
