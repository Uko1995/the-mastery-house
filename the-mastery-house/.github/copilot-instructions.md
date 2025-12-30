# The Mastery House - AI Agent Instructions

## Project Overview

Premium landing page for The Mastery House, a mentorship & mastery academy. Built with React 19, TypeScript, Vite, TailwindCSS v4, and React Router.

## Architecture Pattern

### Component-Based Landing Page Structure

- **Pages** (`src/pages/`): Route-level components that compose multiple sections
  - `LandingPage.tsx`: Main page - composes 14+ section components vertically
  - `EnrollForm.tsx`: Multi-step intention form with controlled state
  - `WaitingList.tsx`: Simplified enrollment alternative
- **Components** (`src/components/`): Reusable UI building blocks
  - `Section.tsx`: Layout wrapper with background variants (`white`, `cream`, `slate`, `dark`)
  - `Button.tsx`: Polymorphic component (renders `<a>` if `href` provided, `<button>` otherwise)
  - Named sections: `Hero.tsx`, `Problem.tsx`, `Promise.tsx`, etc. - each represents a landing page section

### Routing

Three routes defined in `App.tsx`:

- `/` → LandingPage
- `/enroll-form` → EnrollForm
- `/waiting-list` → WaitingList

## Design System

### Typography

- **Headings**: Playfair Display (serif) - imported in `index.css`
- **Body**: Poppins (sans-serif)
- Usage: Apply `font-serif` class to headings, body inherits Poppins

### Color Palette (Brand Colors)

- Primary CTA: `#b59a5b` (gold/brass tone)
- Hover state: `#9a8643`
- Dark text: `#1f3d2b` (deep green) for main headings
- Backgrounds: #EFE6D8 (cream), #f8f4ef (off-white), #1a1a1a (dark)

### Component Patterns

#### Button Component

```tsx
// Polymorphic: renders <a> or <button> based on props
<Button variant="primary" size="lg" href="#section">Link</Button>
<Button type="submit" variant="secondary">Submit</Button>
```

- Variants: `primary` (gold), `secondary` (amber), `outline`
- Sizes: `sm`, `md`, `lg`
- Always include `type` prop for form buttons

#### Section Component

```tsx
<Section background="dark" id="section-id">
  {/* Content automatically gets max-w-6xl container + px-6 */}
</Section>
```

### Responsive Design

- Mobile-first approach with Tailwind breakpoints: `sm:`, `md:`, `lg:`, `xl:`
- Typography scales: `text-3xl sm:text-4xl md:text-5xl lg:text-6xl`
- Always add horizontal padding (`px-4`, `px-6`) to prevent edge-touching on mobile

## Development Workflow

```bash
npm run dev      # Start dev server (Vite HMR)
npm run build    # TypeScript check + production build
npm run lint     # ESLint check
npm run preview  # Preview production build
```

## Critical Conventions

### Import Paths

- Components: `import { Button } from '../components/Button'`
- Pages: `import { LandingPage } from './pages/LandingPage'`
- Assets: `import Logo from '../../public/TheMastery.png'`

### Tailwind v4 Syntax

- Gradients: Use `bg-linear-to-br` (NOT `bg-gradient-to-br`)
- This project uses TailwindCSS v4.1.18 - check for updated syntax

### Form Handling

- Use controlled components with `useState`
- Form validation happens inline (required attributes + TypeScript types)
- Submit handlers prevent default: `e.preventDefault()`

### Navigation

- Smooth scroll enabled globally in `index.css`
- Use hash anchors for same-page navigation: `href="#section-id"`
- Use React Router `Link` for page transitions (currently using `<a>` for simplicity)

## Brand Voice & Content

Landing page follows a "monastery of excellence" narrative arc:

1. Identify the problem (incomplete education)
2. Promise transformation (formation not information)
3. Establish exclusivity (invitation-only, max 6 students)
4. Build trust (founder authority, clear outcomes)

Keep copy dignified, calm, and intentional - avoid hype or urgency tactics.

## When Making Changes

- **New sections**: Create component in `src/components/`, add to `LandingPage.tsx`
- **Styling**: Use Tailwind classes; custom CSS only for typography/scrollbar
- **Forms**: Add to `src/pages/`, ensure accessibility and mobile responsiveness
- **Navigation updates**: Modify `Navigation.tsx` - sticky header with scroll behavior
