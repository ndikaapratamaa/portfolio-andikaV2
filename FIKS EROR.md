### Fixed
- **Mobile navigation menu was cut off and unscrollable** — the hamburger menu on mobile didn't fully display all nav items (cut off before "Contact") and couldn't be scrolled to reach them. Caused by a combination of inaccurate `vh`/`dvh` height calculations on mobile browsers (especially in-app webviews), the menu using `position: fixed` (so overflow content was unreachable by page scroll), and unreliable touch scrolling on fixed elements in some in-app browsers. Fixed by removing the viewport-height dependency entirely and switching to a CSS Grid auto-height animation (`grid-template-rows: 0fr → 1fr`), so the menu sizes itself to its content instead of the screen. All items are now shown at once with no scrolling needed. (`css/style.css`, `js/modules/navbar.js`, `js/modules/command-palette.js`, `index.html`)



### Fixed
- **Navbar brand removed** — removed the `<Andika/>` logo/link from the navbar (`index.html`) along with its now-unused `.brand` / `.brand-tag` styles (`css/style.css`).
- **Ripple effect leak on "Continue with Google" button** — the ripple CSS was scoped to `.btn .ripple`, but the Google button uses `.google-btn` instead of `.btn`, so its ripple elements never received the animation and were never cleaned up from the DOM. Rapid clicking caused elements to pile up and break rendering. Fixed by scoping the ripple styles to `.js-ripple .ripple` so it applies to any ripple-enabled button (`css/style.css`).
