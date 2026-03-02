# GoalLine Growth - Project Knowledge & Lessons Learned

## Project Stack
- **Frontend Framework**: React (via Babel Standalone directly in the browser)
- **Styling**: Vanilla CSS (`styles.css`), GSAP (for animations), and Tailwind CSS (via CDN)
- **Deployment**: Vercel (linked directly to the GitHub repository)

## ⚠️ Critical Mistakes to Avoid
Due to using the in-browser **Babel Standalone compiler** (which translates React code on the fly), there are older JS syntax limitations that you **must** be aware of. If you ignore these, the React app will crash with a ReferenceError or SyntaxError and render a blank "black screen".

1. **No Optional Chaining (`?.`)**: 
   - **Do not use**: `obj?.prop?.value`
   - **Instead use**: `obj && obj.prop && obj.prop.value`
2. **No Nullish Coalescing (`??`)**:
   - **Do not use**: `value ?? fallback`
   - **Instead use**: `value || fallback` (or explicitly check for `null/undefined`)
3. **No JSX Fragment Shorthand (`<>...</>`)**:
   - **Do not use**: `<> <div>...</div> </>`
   - **Instead use**: `<React.Fragment> <div>...</div> </React.Fragment>`
4. **Always Define Context Hooks Within Components**:
   - If a React component needs translation features, you **MUST** include `const { t } = useLang();` at the top of the component body. A missing import/definition will crash the rendering.

## Mobile Layout Checks
Always check how elements stack on mobile screens (less than 768px):
- **Hero Margins**: Ensure the hero slogan does not overlap with the floating navigation bar.
- **Rotating Text Cut-off**: Text with letters like 'y', 'g', and 'p' might get cut off by CSS bounding boxes. Use explicit line-height and extra invisible padding.
- **CTA Button Clutter**: Hide the "Book a Free Call" button from the top navigation menu on mobile because the user already sees the primary CTA button in the center of the mobile screen.

## UI/UX Design Direction "Glassmorphism & High-End Minimalist"
- **Color Palette**: Dark deep space (`#0A0A0F`), Electric Cyan (`#00C2FF`), Neon Mint (`#00E5A0`), and Royal Purple (`#7C3AED`) as accents.
- **Typography**: Heavily rely on `Inter` and `Outfit` via Google Fonts. High impact, high kerning.
- **Micro-Animations**: Extensive use of GSAP to fade in elements (`ScrollTrigger`) and create soft glowing "blob" background interactions. Smooth hover transitions are a must.
- **Content Blocks**: Keep them short and punchy. Avoid large walls of text. Make the features clickable (e.g. the Services stack uses interactive modals instead of completely separate pages).

## Bilingual Feature
The entire page was wrapped in a custom `LanguageContext` so users can seamlessly toggle between **English (EN)** and **Spanish (ES)**. All text visible to the user should be wrapped in the `t("String")` function. 

Example:
```jsx
<h1>{t("We don't just run campaigns.")}</h1>
```
