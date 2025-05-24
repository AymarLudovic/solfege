# Elite Digital Experiences - Awwwards & Framer Inspired Site

This project showcases an ultra-modern, minimalist web interface inspired by top-tier designs on platforms like Awwwards and Framer, and the sophisticated animations seen on GSAP's official sites. Built with Vite.js, React, TypeScript, and Tailwind CSS, it leverages the full power of GSAP for breathtaking scroll-triggered animations, fluid transitions, and interactive elements.

## Features:
- **Cutting-edge Design:** Dark mode by default, high contrast, dramatic typography (120px+ titles), generous asymmetrical spacing.
- **GSAP Mastery:** Extensive use of ScrollTrigger for parallax and complex scroll-based animations, Flip for elegant state transitions (e.g., in the To-Do list), and Timelines for choreographed sequences.
- **Responsive Layouts:** Adapts seamlessly across desktop, tablet, and mobile, with intelligent animation adjustments.
- **Modular Components:** Reusable React components for a clean and maintainable codebase.
- **Custom Cursor:** An interactive, context-aware custom cursor for enhanced UX.
- **Preloader:** A stylish preloader that fades out with a GSAP animation.
- **Horizontal Scrolling Section:** Demonstrates advanced horizontal scroll integration within the vertical flow.
- **Sophisticated To-Do List:** An interactive To-Do section that acts as a showcase for GSAP Flip animations on add/delete/complete operations, far beyond a typical list.

## Technologies Used:
- **Vite.js:** Lightning-fast development server and optimized build process.
- **React.js:** Declarative UI library.
- **TypeScript:** Type-safe JavaScript for robust code.
- **Tailwind CSS:** Utility-first CSS framework for rapid and consistent styling.
- **GSAP (GreenSock Animation Platform):** The industry-standard animation library for JavaScript, including ScrollTrigger and Flip plugins.

## Setup and Installation:

1.  **Clone the repository:**
    ```bash
    git clone [repository-url]
    cd awwwards-inspired-site
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    The application will be accessible at `http://localhost:3000`.

4.  **Build for production:**
    ```bash
    npm run build
    # or
    yarn build
    ```
    This will generate an optimized `dist` folder.

## Project Structure:

The project follows a modular and organized structure:

```
.
├── public/                # Static assets
├── src/
│   ├── assets/            # Images, videos, SVGs
│   ├── components/        # Reusable UI components
│   │   ├── layout/        # Header, Footer, global layout components
│   │   ├── sections/      # Full-page sections (Hero, About, Contact, ToDo)
│   │   └── ui/            # Basic UI elements (buttons, cards, inputs, custom cursor)
│   ├── hooks/             # Custom React hooks (e.g., for GSAP)
│   ├── App.tsx            # Main application component
│   ├── index.css          # Global styles and Tailwind imports
│   └── main.tsx           # React application entry point
├── .gitignore             # Files ignored by Git
├── eslint.config.js       # ESLint configuration
├── index.html             # Main HTML file
├── package.json           # Project dependencies and scripts
├── postcss.config.js      # PostCSS configuration (for Tailwind)
├── README.md              # Project documentation
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── tsconfig.node.json     # TypeScript configuration for Node environment
```

This project aims to push the boundaries of modern web design, offering an exceptional user experience through sophisticated visual aesthetics and fluid animations.