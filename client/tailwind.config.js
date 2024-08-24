/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        gradient:
          "linear-gradient(to top left,rgba(1,65,255,0),rgba(1,65,255,0),rgba(1,65,255,.3))",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".break-word": {
          wordBreak: "break-word",
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
