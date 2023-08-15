/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'black-rgba': 'rgba(0, 0, 0, 0.5)',
      },
      animation: {
        fadein: 'fadein 0.5s ease-in',
      },
      keyframes: {
        fadein: {
          '0%': {
            opacity: '0',
            'backdrop-filter': 'blur(4px)',
          },

          '30%': {
            opacity: '0',
            'backdrop-filter': 'blur(4px)',
          },

          '70%': {
            opacity: '0',
            'backdrop-filter': 'blur(4px)',
          },

          '90%': {
            opacity: '0',
            'backdrop-filter': 'blur(4px)',
          },

          '100%': {
            opacity: '1',
            'backdrop-filter': 'blur(0px)',
          },
        },
      },
    },
  },
  plugins: [],
}

