module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'quicksand-regular': ['\'Quicksand, Regular\''],
        'quicksand-bold': ['\'Quicksand, Bold\''],
        'quicksand-medium': ['\'Quicksand, Medium\''],
        'quicksand-semi-bold': ['\'Quicksand, Semi-Bold\''],
      },
      backgroundColor: {
        primary: '#e6f7ff',
      },
      width: {
        100: '19rem',
      },
    },
  },
  plugins: [],
};
