/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: false,
  theme: {
    extend: {
      keyframes: {
        'caret-blink': {
          '0%,70%,100%': { opacity: '1' },
          '20%,50%': { opacity: '0' },
        },
        sheen: {
          '0%': {
            transform: 'translateX(-150%) skewX(-25deg)',
          },
          '100%': {
            transform: 'translateX(250%) skewX(-25deg)',
          },
        },
      },
      animation: {
        'caret-blink': 'caret-blink 1.25s ease-out infinite',
        sheen: 'sheen 2s ease-in-out',
      },
      gridTemplateColumns: {
        landscape: 'repeat(2, 1fr)',
      },
      gridTemplateRows: {
        portrait: 'repeat(2, 1fr)',
      },
    },
  },
};
