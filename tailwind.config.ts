import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0F1B2E',    // Deep Navy
        secondary: '#1A1F2E',  // Charcoal
        tertiary: '#2D3142',   // Slate
        accent: '#FF8C00',     // Bold Orange
      },
    },
  },
  plugins: [],
} satisfies Config;
