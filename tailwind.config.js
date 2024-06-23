/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        ltW: "80dvw",
      },
      height: {
        ltH: "99dvh",
      },
    },
  },
  plugins: [],
};
