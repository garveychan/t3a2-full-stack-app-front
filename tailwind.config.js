module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxHeight: {
        "half": "50%",
        "screen-1/4": "25vh",
        "screen-1/3": "33vh",
        "screen-1/2": "50vh",
        "screen-2/3": "66vh",
        "screen-3/4": "75vh",
       }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
