/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["'Poppins', 'sans-serif'"],
      },
      maxHeight: {
        505: "505px",
      },
      height: {
        505: "505px",
      },
      width: {
        505: "505"
      }
    },
  },
  plugins: [],
};
