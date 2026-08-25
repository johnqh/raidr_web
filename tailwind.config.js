import { createTailwindPreset } from '@sudobility/design';

/** @type {import('tailwindcss').Config} */
export default {
  // The design system's semantic tokens, as in the other sudobility landing
  // pages. The radiographic palette below is this page's own identity.
  presets: [createTailwindPreset()],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@sudobility/design/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Radiographic film. Dense material reads bright, as on a real plate.
        film: '#080D12',
        plate: '#101820',
        shelf: '#18232C',
        bone: '#E9E5DB',
        exposure: '#6FA8C7',
        flare: '#F2B441',
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        cond: ['"IBM Plex Sans Condensed"', '"IBM Plex Sans"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
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
