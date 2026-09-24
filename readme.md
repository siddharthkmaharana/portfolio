# Siddhath Kumar Maharana Portfolio

Recreation specification for the live portfolio at <https://github.com/siddharthkmaharana/siddharthkmaharana.github.io>.

> This document records the observed UI, content, links, styling, and behavior of the reference site. It is intended to guide a faithful implementation; the reference site is a single-page portfolio, not a multi-route application.

## Product Summary

A dark, minimalist developer portfolio focused on software development, DSA progress, projects, experience, learning notes, and visual design work.

- Page title: `Siddharth Kumar Maharana | Developer | DSA`
- Brand label: `Siddharth`
- Tagline: `Bringing Ideas to Reality ✨`
- Primary layout: centered single page with a profile/introduction area followed by a tabbed content area
- Main theme: dark charcoal background with white text and muted gray secondary text
- Font observed: `Inter, system-ui, sans-serif`
- Body background observed: `rgb(23, 23, 23)`
- Primary text observed: `rgb(255, 255, 255)`

## Page Structure

### 1. Profile Header

The first section contains:

- Small profile/avatar image
- Theme or appearance toggle button with an icon and no visible text label
- `Siddharth` heading
- `Bringing Ideas to Reality ✨` subtitle
- Introductory paragraph:

  > Hey there 👋 I'm Siddharth Kumar Maharana - I'm an aspiring software developer. I mostly work on web and i like to fiddle around with what's trendy, unique and cool. I've been grinding DSA & Development quite sometime now, I love Modern UI/UX, Computer Science, and creating elegant solutions to complex problems.

- Primary action: `Schedule a call`
- Resume link
- Social/contact icon links
- Skills and technology summary

### 2. Skills Summary

Display the following groups as compact text rows or labels:

- **Programming Languages:** Java, JavaScript, TypeScript
- **Frontend:** React.js, Next.js, TailwindCSS, Bootstrap, Material-UI, Chart.js, HTML, SCSS, Skiper UI, Framer Motion, React Hook Form
- **Javascript runtime:** Node.js
- **Backend:** Express.js, REST APIs
- **Database:** MongoDB, MySQL
- **Cloud:** Render, Vercel, Cloudinary
- **Tools:** Git, Mapbox, Cloudflare, Firebase
- **Tech Stack:** MERN

### 3. Content Navigation

A horizontal tab bar switches content in place without changing the URL or reloading the page.

Tabs:

1. `Projects`
2. `Experience`
3. `TIL`
4. `Designs`
5. `Stats`

The active tab is visually distinguished. The profile header remains visible while the content panel changes.

## Tab Behavior and Content

### Projects

Projects are displayed as vertically stacked, clickable feature cards. Each card has a title, date, description, technology tags, a preview/live link, an optional source link, and sometimes a social proof link or media preview.

A search field with the placeholder search projects filters the list as the user types. Searching project names or technology terms reduces the visible list to matching cards.

#### Cortexa

- Date: may 7, 2026
- Description: Cross-platform AI desktop assistant combining computer vision, conversational AI, voice interactions, and desktop/browser automation into a unified application.
- Tags: Electron, React, FastAPI, Python, Claude API, Playwright, Whisper, ElevenLabs, Web Speech API, Tailwind CSS
- Features: Real-time object detection, OCR, barcode/QR scanning, scene understanding, emotion recognition, natural-language automation, voice interaction, wake-word activation, and persistent conversational memory.
- Source: <https://github.com/siddharthkmaharana/Cortexa>

#### Merkle Tree Visualizer

- Date: January 5, 2026
- Description: Interactive web-based visualization tool for understanding and verifying data integrity using Merkle Trees and SHA-256 hashing. The project provides a visual representation of the hashing and verification process, making cryptographic data integrity easier to understand.
- Tags: HTML, CSS, JavaScript, SHA-256, Cryptography, Merkle Tree, Data Integrity, Visualization
- Type: Research Project
- Live project: <https://wanderlustt-ziz3.onrender.com/>
- Source: <https://github.com/siddharthkmaharana/Merkle-Tree-Visualizer>
- Social post: <https://www.linkedin.com/feed/update/urn:li:activity:7507479849674887168/>

#### Integrated Food Delivery & Dine-Out Platform

- Date: July 28, 2025
- Description: Full-stack food ordering and dine-out platform with geospatial restaurant discovery, gamified reviews, real-time order tracking, and a state-based order management system.
- Tags: React, Vite, Node.js, Express.js, MongoDB Atlas, Socket.io, JWT, AWS EC2, AWS S3, GitHub Actions, CI/CD, Vercel
- Features: GeoJSON 2dsphere restaurant discovery, gamified reviews, real-time order tracking, concurrent WebSocket connections, and a 6-state order workflow from order placement to delivery.
- Live project: <https://integrated-food-delivery-and-dine-o.vercel.app/>
- Source: <https://github.com/siddharthkmaharana/Integrated-Food-Delivery-and-Dine-Out-Hospitality-Platform>


#### Telemedicine & Electronic Health Records (EHR) Platform

- Date: November 20, 2024
- Description: Secure telemedicine platform featuring appointment scheduling, electronic health records, QR-verified digital prescriptions, and WebRTC-based video consultations.
- Tags: React, TypeScript, Node.js, Express.js, MongoDB, WebRTC, Socket.io, JWT, AES-256, Docker, REST APIs
- Features: Patient, doctor, and admin roles; JWT authentication; AES-256 encryption; role-based access control; audit logging; collision-detection scheduling; and real-time video consultation.
- Source: <https://github.com/siddharthkmaharana/Telemedicine-EHR-Platform>

#### Project card interaction

- Clicking a card selects or opens the card's detailed visual treatment.
- Icon links inside cards must remain individually clickable and must not trigger the card action.
- External links should open the referenced project or repository.

### Experience

One experience entry is shown:

- Organization: Infotact Solutions, Bengaluru
- Type: Internship
- Location: On-site
- Role: Web Development Intern
- Period: February 2026 – May 2026
- Responsibilities:
  - Developed and tested 5+ responsive React.js modules integrated with Node.js/Express.js REST APIs.
  - Integrated frontend components with MongoDB backend services, implementing data-fetching patterns and state management for end-to-end features.
  - Collaborated in an Agile environment through sprint planning, daily standups, and code reviews.
  - Wrote unit and integration tests using Jest and maintained 80%+ code coverage on assigned modules.
  - Earned "Top Performer" recognition on two occasions.

### TIL

A chronological learning log, newest first:

- **August 30, 2025:** Added the Stats section to the portfolio.
- **August 29, 2025:** Finished the Zentry project sections, including Features, Nav, and CTA; described it as the favorite design project so far.
- **August 28, 2025:** Progressed the Zentry recreation; added Navbar, About section, and an audio player.
- **August 27, 2025:** Started a design-heavy recreation of the Awwwards-winning `zentry.com`; built the hero section.
- **August 9, 2025:** Worked on PrepWise authentication and the complete home page; explored Firebase.
- **August 8, 2025:** Started PrepWise setup and worked on quantitative aptitude.
- **August 7, 2025:** Practiced LeetCode for placement season and attended a Grant Thornton session.
- **August 6, 2025:** Worked on the internship project UI with smooth scrolling and glass-style visuals.
- **August 5, 2025:** Revamped the portfolio and worked through the night on the current design.

### Designs

A visual gallery of four projects. Media previews are loaded inline and may include video assets.

1. **Zentry's Replica**
   - Recreation of the Awwwards-winning `zentry.com` website.
   - Marked as the favorite design project.
2. **my first portfolio attempt**
   - Futuristic, Apple-inspired portfolio design.
3. **my second portfolio revamp**
   - Modern portfolio UI with smooth scrolling and minimalism.
4. **Spotify Clone**
   - Spotify-inspired visual project.

The reference implementation attempted to load `Zentry.mp4` and `secondPortfolio.mp4` from the site origin. Preserve a graceful fallback when media is unavailable.

### Stats

A progress dashboard composed of local layout plus third-party embeds/content:

- GitHub contribution chart
- LeetCode heatmap link: <https://leetcode.com/u/siddharthkmleetcode/>
- Take U Forward progress panel:
  - Total progress: `61 / 191`
  - Completion: `32%`
  - Easy: `17 / 32 completed`
  - Medium: `34 / 95 completed`
  - Hard: `10 / 64 completed`
- Notion embed
- HackerRank content/logo

Separate stat blocks are visually divided with horizontal separators. External widgets must have loading and failure states so the page remains usable when providers block requests.

## Header Actions

### Schedule a call

Clicking `Schedule a call` opens a modal overlay containing an embedded Cal.com booking flow.

Observed modal details:

- Event title: `Meeting`
- Duration: `15m`
- Description: `Let's Connect`
- Four location options
- Timezone selector defaulting to `Asia/Kolkata`
- Calendar month navigation
- Date selection and available time slots
- Close button labeled `Close` and an `×` visual control

The overlay is an iframe/widget integration, not a local route. Keep the background page mounted while the modal is open and close it without losing the selected content tab.

### Resume

External link: <https://drive.google.com/drive/folders/1SudVVuHk8fNFA_Akuoe5ap9LSgTFrxHp?usp=drive_link>

### Social and contact links

- GitHub: <https://github.com/siddharthkmaharana>
- X: <https://x.com/Siddharth_km2>
- Email: <https://mail.google.com/mail/u/0/?fs=1&to=dharaindrayudh16@gmail.com&tf=cm>
- Phone: `tel:+916370553290`
- LinkedIn: <https://www.linkedin.com/in/siddharth-kumar-maharana/>

Use recognizable icon buttons with accessible labels or tooltips. The icon-only controls should remain keyboard accessible.

### Theme control

The header includes an icon-only appearance control. It changes the visual theme while leaving content and navigation in place. The observed initial state is dark.

## Visual Direction

- Dark charcoal page background, approximately `#171717`.
- White primary text and muted gray supporting text.
- Inter-style sans-serif typography.
- Large, heavy profile wordmark; observed size is approximately `36px` with weight `900`.
- Project headings are compact and heavy; observed size is approximately `20px` with weight `900`.
- Minimal borders and dividers; content should feel editorial and dense rather than card-heavy.
- Rounded or glass-like surfaces may be used for controls and media, but preserve the restrained monochrome direction.
- Use consistent spacing, clear hover/focus states, and smooth tab transitions.
- Media previews should preserve aspect ratio and avoid shifting surrounding content while loading.

## Responsive Requirements

- Keep the profile introduction readable on narrow screens.
- Allow the tab bar to scroll horizontally or wrap without clipping labels.
- Stack project metadata and action icons when the card width is constrained.
- Keep icon buttons at a stable touch-friendly size.
- Make embedded charts and iframes fluid within the content column.
- Prevent long descriptions, URLs, and technology tags from overflowing.
- Preserve modal usability on mobile with a scrollable booking panel.

## Functional Acceptance Checklist

- [ ] Initial load shows the profile header and Projects tab.
- [ ] Theme button changes appearance without navigating away.
- [ ] Schedule a call opens and closes the booking modal.
- [ ] Resume, social, phone, and email links resolve to the listed destinations.
- [ ] All five tabs switch content without a full page reload.
- [ ] Project search filters cards as the query changes.
- [ ] Project action links remain independently clickable.
- [ ] Design media has loading and fallback behavior.
- [ ] Stats embeds have loading and failure states.
- [ ] Keyboard focus is visible for buttons, tabs, fields, links, and modal controls.
- [ ] Layout works at desktop and mobile widths.

## Reference Notes

The live page was inspected on September 23, 2026. Third-party analytics, Notion, and media requests produced browser-side failures during inspection, including CSP/network errors and a repeated Cal.com custom-element registration warning. These failures are external integration concerns; a recreation should isolate them behind resilient loading/error states rather than allowing them to break the portfolio shell.
