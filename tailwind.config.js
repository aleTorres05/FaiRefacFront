/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        chakra: ["Chakra Petch"],
        mulish: ["Mulish"],
      },
      textColor: {
        test: ["#D16527"],
      },
    },
  },
  plugins: [],
};
