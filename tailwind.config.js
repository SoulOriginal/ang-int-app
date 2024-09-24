/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        lightColor: '#ffffff',
        headerBg: '#DEDAD7',
        asideBg: '#EAE8E7',
        borderColor: '#D3D1D0',
      },
    },
  },
  plugins: [],
};
