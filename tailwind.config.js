/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'hovered-sidebar-links': 'rgba(0, 155, 229, 0.12)',
        'sidebar-text-color': 'rgba(255, 255, 255, 0.7)',
        'content-color': 'rgba(0, 0, 0, 0.87)',
      },
    },
  },
  plugins: [],
  // corePlugins: {
  //   // Remove the Tailwind CSS preflight styles so it can use Material UI's preflight instead (CssBaseline).
  //   preflight: false,
  // },
};
