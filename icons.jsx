/* ── General UI Icons ── */
const IcoArrow = ({ s = 16 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>;
const IcoArrowL = ({ s = 16 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>;
const IcoCheck = ({ s = 14, c = '#0A0A0F' }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>;
const IcoMenu = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>;
const IcoX = ({ s = 22, c = 'currentColor' }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>;
const IcoGlobe = ({ c = '#00C2FF', s = 26 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>;
const IcoBot = ({ c = '#00E5A0', s = 26 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M12 2a2 2 0 0 1 2 2v3H10V4a2 2 0 0 1 2-2z" /><circle cx="9" cy="17" r="1" fill={c} stroke="none" /><circle cx="15" cy="17" r="1" fill={c} stroke="none" /><line x1="12" y1="7" x2="12" y2="11" /></svg>;
const IcoBars = ({ c = '#00C2FF', s = 26 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /><line x1="2" y1="20" x2="22" y2="20" /></svg>;
const IcoStar = ({ c = '#A78BFA', s = 26 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>;

/* ── Trust Brand Logos ── */
const BrandGoogle = ({ s = 20 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.564 12.251c0-.782-.07-1.536-.2-2.257H12v4.267h5.923c-.255 1.38-1.036 2.548-2.213 3.336v2.775h3.584c2.097-1.93 3.308-4.773 3.308-8.12l-.038-.001z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-1.022 7.28-2.766l-3.584-2.776c-1.002.684-2.275 1.085-3.696 1.085-2.843 0-5.253-1.92-6.113-4.502H2.176v2.868A10.999 10.999 0 0 0 12 23z" fill="#34A853" />
    <path d="M5.887 14.041a6.606 6.606 0 0 1-.345-2.041c0-.706.126-1.393.345-2.041V7.091H2.176a10.992 10.992 0 0 0 0 9.818l3.71-2.868z" fill="#FBBC05" />
    <path d="M12 4.675c1.616 0 3.065.556 4.205 1.624l3.153-3.087C17.458 1.455 14.968 0 12 0 7.42 0 3.407 2.624 1.36 6.545l3.71 2.868C5.932 6.83 8.343 4.675 12 4.675z" fill="#EA4335" />
  </svg>
);
const BrandMeta = ({ s = 20 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.168 5h-2.18c-2.484 0-4.522 1.954-4.908 4.414-.386-2.46-2.424-4.414-4.908-4.414H5.006c-2.764 0-5.006 2.242-5.006 5.006v4.988c0 2.764 2.242 5.006 5.006 5.006h2.18c2.484 0 4.522-1.954 4.908-4.414.386 2.46 2.424 4.414 4.908 4.414h2.166C21.93 20 24.174 17.758 24.174 14.994V10.006C24.174 7.242 21.932 5 19.168 5zm-7.096 9.42c0 1.986-1.61 3.596-3.596 3.596H6.292c-1.668 0-3.024-1.356-3.024-3.024v-4.988c0-1.668 1.356-3.024 3.024-3.024h2.18c1.785 0 3.256 1.3 3.546 3.01.07.412.112.836.112 1.272v3.158zm9.118-2.448v2.448c0-1.986-1.61-3.596-3.596-3.596h-2.18c-1.67 0-3.056 1.258-3.414 2.87-.14.627-.215 1.288-.215 1.966 0 1.986 1.61 3.596 3.596 3.596h2.166c1.668 0 3.024-1.356 3.024-3.024v-4.988c0-1.668-1.356-3.024-3.024-3.024-1.543 0-2.81 1.157-2.997 2.653-.254-.158-.553-.255-.873-.255-.322 0-.623.1-.88.26.19-1.494 1.458-2.658 3.004-2.658h2.18c1.668 0 3.024 1.356 3.024 3.024v3.156z" fill="#0082FB" />
  </svg>
);
const BrandReact = ({ s = 20 }) => (
  <svg width={s} height={s} viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="0" cy="0" r="2" fill="#61DAFB" />
    <g stroke="#61DAFB" strokeWidth="1" fill="none">
      <ellipse rx="10" ry="4.5" />
      <ellipse rx="10" ry="4.5" transform="rotate(60)" />
      <ellipse rx="10" ry="4.5" transform="rotate(120)" />
    </g>
  </svg>
);

/* ── Villain SVG Icons ── */
const VilBillingLoop = () => (
  <svg width="26" height="26" viewBox="0 0 28 28" fill="none" stroke="#00C2FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path className="v-icon-path" d="M 24 14 A 10 10 0 1 1 19 5.3" />
    <path className="v-icon-path" d="M 19 5.3 L 15.5 4.1 M 19 5.3 L 21 2" />
  </svg>
);
const VilTemplates = () => (
  <svg width="26" height="26" viewBox="0 0 28 28" fill="none" stroke="#00C2FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path className="v-icon-path" d="M 8 2 H 26 V 18 H 8 Z" opacity="0.25" />
    <path className="v-icon-path" d="M 5 6 H 23 V 22 H 5 Z" opacity="0.5" />
    <path className="v-icon-path" d="M 2 10 H 20 V 26 H 2 Z" />
    <line className="v-icon-path" x1="5" y1="16" x2="17" y2="16" />
    <line className="v-icon-path" x1="5" y1="20" x2="11" y2="20" />
  </svg>
);
const VilJargon = () => (
  <svg width="26" height="26" viewBox="0 0 28 28" fill="none" stroke="#00C2FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line className="v-icon-path" x1="2" y1="24" x2="18" y2="24" />
    <line className="v-icon-path" x1="5" y1="24" x2="5" y2="19" />
    <line className="v-icon-path" x1="10" y1="24" x2="10" y2="13" />
    <line className="v-icon-path" x1="15" y1="24" x2="15" y2="7" />
    <line className="v-icon-path" x1="20" y1="3" x2="27" y2="10" />
    <line className="v-icon-path" x1="27" y1="3" x2="20" y2="10" />
  </svg>
);
const VilDisappear = () => (
  <svg width="26" height="26" viewBox="0 0 28 28" fill="none" stroke="#00C2FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path className="v-icon-path" d="M 12 7 A 5 5 0 1 1 11.999 7.001" />
    <line className="v-icon-path" x1="7" y1="12" x2="7" y2="22" />
    <line className="v-icon-path" x1="14" y1="16" x2="18" y2="16" opacity="0.75" />
    <line className="v-icon-path" x1="19" y1="16" x2="22" y2="16" opacity="0.45" />
    <line className="v-icon-path" x1="23" y1="16" x2="25" y2="16" opacity="0.2" />
    <line className="v-icon-path" x1="26" y1="16" x2="27" y2="16" opacity="0.08" />
  </svg>
);

/* ── Quiz option icons ── */
const QWrench = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2C15.8 2 18 4.2 18 7C18 8.2 17.6 9.3 16.9 10.1L11 16H8L4 18.5L2 17.5L4.5 13.5L7 10.5L12.9 4.6C12.6 4 13 2 13 2Z" /><circle cx="5.5" cy="15.5" r="1.2" fill="currentColor" opacity="0.72" stroke="none" /></svg>);
const QCross = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="16" height="16" rx="2" /><line x1="10" y1="5.5" x2="10" y2="14.5" /><line x1="5.5" y1="10" x2="14.5" y2="10" /></svg>);
const QPlane = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12L10 2L17 12H13V17L10 18.5L7 17V12Z" /></svg>);
const QFork = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="2" x2="7" y2="18" /><path d="M5 2 C5 5 7 7 7 9" /><path d="M9 2 C9 5 7 7 7 9" /><line x1="13" y1="2" x2="13" y2="18" /><path d="M10 2 Q13 5 13 8" /></svg>);
const QBriefcase = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="16" height="11" rx="1.5" /><path d="M7 7V5C7 4 7.7 3 9 3H11C12.3 3 13 4 13 5V7" /><line x1="2" y1="12" x2="18" y2="12" /><line x1="10" y1="10" x2="10" y2="14" /></svg>);
const QLightning = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L5 11H10L8 18L15 9H10Z" /></svg>);
const QCircleX = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="10" cy="10" r="8" /><line x1="6.5" y1="6.5" x2="13.5" y2="13.5" /><line x1="13.5" y1="6.5" x2="6.5" y2="13.5" /></svg>);
const QBrowser = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="16" height="14" rx="1.5" /><line x1="2" y1="7" x2="18" y2="7" /><circle cx="5" cy="5" r="0.75" fill="currentColor" opacity="0.72" stroke="none" /><circle cx="7.5" cy="5" r="0.75" fill="currentColor" opacity="0.72" stroke="none" /><line x1="10" y1="4.5" x2="16" y2="4.5" /></svg>);
const QClock = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="10" cy="10" r="8" /><line x1="10" y1="5" x2="10" y2="10" /><line x1="10" y1="10" x2="14" y2="12.5" /></svg>);
const QWarning = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2L18.5 17H1.5Z" /><line x1="10" y1="8" x2="10" y2="12" /><circle cx="10" cy="14.5" r="0.75" fill="currentColor" opacity="0.72" stroke="none" /></svg>);
const QChartUp = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="2,16 6,11 9,13 14,7 18,4" /><line x1="2" y1="16" x2="18" y2="16" /><polyline points="14,4 18,4 18,8" /></svg>);
const QRocket = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2C10 2 15 5 15 11L13 13H7L5 11C5 5 10 2 10 2Z" /><path d="M7 13L6 17L8 16L10 18L12 16L14 17L13 13" /><circle cx="10" cy="9" r="1.2" fill="currentColor" opacity="0.72" stroke="none" /></svg>);
const QFlame = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2C10 2 14 6 13 10C15 8 15 5 15 5C18 9 17 14 14 16C16 15 17 13 17 13C17 17 14 19 10 19C6 19 3 17 3 13C3 13 4 15 6 16C3 14 2 9 5 5C5 5 5 8 7 10C6 6 10 2 10 2Z" /></svg>);
const QTrophy = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3H14V10C14 12.8 12.2 14 10 14C7.8 14 6 12.8 6 10V3Z" /><path d="M6 5H3C3 8 5 10 6 9" /><path d="M14 5H17C17 8 15 10 14 9" /><line x1="10" y1="14" x2="10" y2="17" /><line x1="7" y1="17" x2="13" y2="17" /></svg>);
const QGlobe = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="10" cy="10" r="8" /><ellipse cx="10" cy="10" rx="3.5" ry="8" /><line x1="2" y1="10" x2="18" y2="10" /></svg>);
const QCircuit = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="6" width="8" height="8" rx="1" /><line x1="10" y1="2" x2="10" y2="6" /><line x1="10" y1="14" x2="10" y2="18" /><line x1="2" y1="10" x2="6" y2="10" /><line x1="14" y1="10" x2="18" y2="10" /><line x1="6" y1="2" x2="6" y2="4" /><line x1="14" y1="2" x2="14" y2="4" /><line x1="6" y1="16" x2="6" y2="18" /><line x1="14" y1="16" x2="14" y2="18" /></svg>);
const QBarChart = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="2" y1="17" x2="18" y2="17" /><line x1="5" y1="17" x2="5" y2="11" /><line x1="10" y1="17" x2="10" y2="7" /><line x1="15" y1="17" x2="15" y2="4" /></svg>);
const QStar = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="10,2 12.5,7.5 18.5,8 14,12.5 15.5,18.5 10,15.5 4.5,18.5 6,12.5 1.5,8 7.5,7.5" /></svg>);
const QBolt = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L5 11H10L8 18L15 9H10Z" /></svg>);
const QCalendar = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="16" height="14" rx="1.5" /><line x1="2" y1="8" x2="18" y2="8" /><line x1="7" y1="2" x2="7" y2="6" /><line x1="13" y1="2" x2="13" y2="6" /><line x1="6" y1="12" x2="14" y2="12" /><line x1="6" y1="15" x2="11" y2="15" /></svg>);
const QSearch = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="9" r="6" /><line x1="13.5" y1="13.5" x2="18" y2="18" /></svg>);
const QuizSuccessIco = () => (
  <svg width="72" height="72" viewBox="0 0 72 72" fill="none" stroke="#00E5A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={{ animation: 'icon-pulse 2.5s ease-in-out infinite' }}>
    <circle cx="36" cy="36" r="30" />
    <circle cx="36" cy="36" r="18" />
    <circle cx="36" cy="36" r="6" fill="#00E5A0" stroke="none" />
    <line x1="36" y1="2" x2="36" y2="14" />
    <line x1="36" y1="58" x2="36" y2="70" />
    <line x1="2" y1="36" x2="14" y2="36" />
    <line x1="58" y1="36" x2="70" y2="36" />
  </svg>
);

/* ── Nexr feature icons ── */
const NexrCardIco = () => (
  <svg width="24" height="24" viewBox="0 0 26 26" fill="none" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path className="n-icon-path" d="M3 8C3 6.9 3.9 6 5 6H21C22.1 6 23 6.9 23 8V18C23 19.1 22.1 20 21 20H5C3.9 20 3 19.1 3 18V8Z" />
    <line className="n-icon-path" x1="3" y1="10.5" x2="23" y2="10.5" strokeWidth="2" />
    <rect className="n-icon-path" x="6" y="13.5" width="5" height="3.5" rx="0.5" />
  </svg>
);
const NexrTapIco = () => (
  <svg width="24" height="24" viewBox="0 0 26 26" fill="none" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path className="n-icon-path" d="M4 11V4H11" />
    <path className="n-icon-path" d="M15 4H22V11" />
    <path className="n-icon-path" d="M4 15V22H11" />
    <path className="n-icon-path" d="M22 15V22H15" />
    <line className="n-icon-path" x1="5" y1="13" x2="21" y2="13" opacity="0.55" />
    <line className="n-icon-path" x1="13" y1="5" x2="13" y2="21" opacity="0.35" />
  </svg>
);
const NexrTiersIco = () => (
  <svg width="24" height="24" viewBox="0 0 26 26" fill="none" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect className="n-icon-path" x="2" y="13" width="6" height="10" rx="0.5" />
    <rect className="n-icon-path" x="10" y="8" width="6" height="15" rx="0.5" />
    <rect className="n-icon-path" x="18" y="17" width="6" height="6" rx="0.5" />
    <path className="n-icon-path" d="M10 8 L11 5 L13 7 L15 5 L16 8" />
  </svg>
);
const NexrPulseIco = () => (
  <svg width="24" height="24" viewBox="0 0 26 26" fill="none" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path className="n-icon-path" d="M2 13 L7 13 L9 6 L11 20 L13 13 L24 13" />
    <circle cx="9" cy="6" r="1.5" fill="#A78BFA" stroke="none" />
    <circle cx="11" cy="20" r="1.5" fill="#A78BFA" stroke="none" />
  </svg>
);
