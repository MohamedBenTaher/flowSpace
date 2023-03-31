/** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./app/**/*.{js,ts,jsx,tsx}",
//     "./pages/**/*.{js,ts,jsx,tsx}",
//     "./components/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
module.exports = {
  content: [  
  "./app/**/*.{js,ts,jsx,tsx}",
  "./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",], // Add your project's file structure here
  darkMode: 'media', // Use the user's system preference
  theme: {
    extend: {
      fontFamily: {
        'roboto': ["Roboto Sans", "sans-serif"],
      },
      backgroundColor: {
        'primary': '#1E88E5',
        'secondary': '#42A5F5',
        'background': '#FFFFFF',
        'accent': '#FFCA28',
      },
      textColor: {
        'primary': '#1E88E5',
        'secondary': '#42A5F5',
        'text': '#37474F',
        'accent': '#FFCA28',
      },
      borderColor: {
        'input': 'rgba(0, 0, 0, 0.1)',
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      },
      fontSize: {
        'base': '16px',
      },
      fontWeight: {
        'heading': '700',
        'body': '400',
        'button': '600',
      },
      borderRadius: {
        'button': '0.25rem',
      },
      transitionProperty: {
        'colors': 'background-color, border-color, color, fill, stroke',
      },
      transitionDuration: {
        '200': '200ms',
      },
      transitionTimingFunction: {
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDelay: {
        '0': '0ms',
      },
      animation: {
        'spin': 'spin 1s linear infinite',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['responsive', 'hover', 'focus', 'active', 'dark'],
      textColor: ['responsive', 'hover', 'focus', 'active', 'dark'],
      borderColor: ['responsive', 'hover', 'focus', 'active', 'dark'],
      boxShadow: ['responsive', 'hover', 'focus', 'active', 'dark'],
    },
  },
  plugins: [],
};