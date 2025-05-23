# Nebula Apes - Ultra-Modern NFT Landing Page

Welcome to the Nebula Apes project! This is a cutting-edge landing page designed with an ultra-modern, minimalist aesthetic, heavily inspired by Awwwards-winning sites and GSAP's official showcase. Built with Vite.js, React, TypeScript, and Tailwind CSS, it features extensive use of GSAP for stunning, fluid animations, including advanced scroll-triggered effects, parallax, and custom cursor interactions.

## Features

*   **Ultra-Modern Design:** Clean, minimalist, and brutalist-chic aesthetic with dramatic typography and bold contrasts.
*   **Full GSAP Integration:**
    *   **ScrollTrigger:** For advanced scroll-based animations, including horizontal sections and parallax.
    *   **Timeline:** Choreographed animation sequences for hero text, roadmap, and section reveals.
    *   **Custom Easings:** Smoother, more natural animation curves.
    *   **Performance Optimization:** `will-change` and `transformZ` for buttery-smooth animations.
*   **Responsive Layouts:** Adapts seamlessly to desktop, tablet, and mobile devices.
*   **Asymmetric Grids & Overlaps:** Unique visual structures to create depth and interest.
*   **Interactive Components:** Custom cursor, animated buttons, and dynamic content sections.
*   **Preloader:** A stylish preloader to enhance the initial user experience.
*   **Modular Architecture:** Organized React components for maintainability and scalability.
*   **Tailwind CSS:** Fully utility-first styling for rapid development and consistency.
*   **TypeScript:** Type safety and improved developer experience.
*   **Vite.js:** Lightning-fast development server and optimized build process.

## Project Structure

```
├── public/                 # Static assets (images, fonts, etc.)
│   ├── hero-ape.webp
│   ├── about-ape.webp
│   ├── nft-1.webp
│   └── ... (other NFT images, noise texture)
├── src/
│   ├── assets/             # Future asset organization (not implemented yet)
│   ├── components/
│   │   ├── animations/     # Animation-specific components (e.g., Preloader)
│   │   │   └── Preloader.tsx
│   │   ├── layout/         # Header, Footer, Layout wrappers
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/       # Main page sections
│   │   │   ├── AboutSection.tsx
│   │   │   ├── CallToActionSection.tsx
│   │   │   ├── CollectionSection.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   └── RoadmapSection.tsx
│   │   └── ui/             # Reusable UI elements (buttons, custom cursor)
│   │       ├── Button.tsx
│   │       └── CustomCursor.tsx
│   ├── hooks/              # Custom React hooks (e.g., GSAP animation hooks)
│   │   └── useGsapAnimations.ts
│   ├── pages/              # Full page components
│   │   └── HomePage.tsx
│   ├── App.tsx             # Main application component
│   ├── index.css           # Global Tailwind CSS imports and base styles
│   └── main.tsx            # React entry point
├── .gitignore              # Files/folders to ignore in Git
├── index.html              # Vite's entry HTML file
├── package.json            # Project dependencies and scripts
├── postcss.config.js       # PostCSS configuration for Tailwind
├── README.md               # Project documentation
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── tsconfig.node.json      # TypeScript configuration for Node environment
└── vite.config.ts          # Vite.js configuration
```

## Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

*   Node.js (LTS version recommended)
*   npm or Yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd nft-landing-page
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

### Development

1.  **Start the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    This will open the application in your browser, typically at `http://localhost:5173`. Vite's HMR (Hot Module Replacement) will ensure live reloads as you make changes.

### Build for Production

1.  **Build the project:**
    ```bash
    npm run build
    # or
    yarn build
    ```
    This will compile the project into the `dist` directory, optimized for production.

2.  **Preview the production build:**
    ```bash
    npm run preview
    # or
    yarn preview
    ```
    This command serves the static files from the `dist` directory.

## Customization

*   **Content:** Modify text, images, and links in the `src/components/sections/` and `src/components/layout/` components. Remember to place your images in the `public/` directory.
*   **Styling:**
    *   Adjust colors, fonts, and other base styles in `tailwind.config.js` and `src/index.css`.
    *   Utilize Tailwind CSS utility classes directly within your React components for styling.
*   **Animations:**
    *   Explore and modify GSAP animations within the `useEffect` hooks of relevant components.
    *   The `useGsapAnimations.ts` hook provides a reusable pattern for managing GSAP tweens and timelines.
    *   Refer to the GSAP documentation for more advanced animation techniques.

## Acknowledgments

*   [GSAP (GreenSock Animation Platform)](https://greensock.com/gsap/) for powerful web animations.
*   [Tailwind CSS](https://tailwindcss.com/) for utility-first styling.
*   [React](https://react.dev/) for building user interfaces.
*   [Vite.js](https://vitejs.dev/) for a fast development experience.
*   [Awwwards](https://www.awwwards.com/) and [Framer](https://www.framer.com/) for design inspiration.

Enjoy creating stunning web experiences!