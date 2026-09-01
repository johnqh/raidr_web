import { createTailwindPreset } from '@sudobility/design';

/** @type {import('tailwindcss').Config} */
export default {
  // The radiograph theme: this page's palette, extracted into the design system
  // so it is swappable and reusable. main.tsx supplies the custom properties.
  presets: [createTailwindPreset()],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@sudobility/design/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        // `sans` and `mono` come from the theme as var(--font-sans/mono). The
        // condensed face has no token equivalent, so it is declared here.
        cond: ['"IBM Plex Sans Condensed"', '"IBM Plex Sans"', 'sans-serif'],
      },
      letterSpacing: {
        plate: '0.22em',
      },
      maxWidth: {
        readable: '68ch',
      },
    },
  },
  plugins: [],
};
