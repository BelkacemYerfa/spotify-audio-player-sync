/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary_color_logo: "#57B660",
        primary_color_bg: "#191414",
        primary_color_font: "#ffffff",
        audio_player_bg: "#181818",
        home_decorative_color_one: "#649AED",
        home_decorative_color_two: "#EB5640",
        home_decorative_color_three: "#F6C874",
        home_decorative_color_four: "#A7C2D1",
        home_decorative_color_five: "#D5F479",
        home_decorative_color_six: "#F7CFD4",
        home_decorative_color_seven: "#E57BA1",
        home_decorative_color_eight: "#F4E357",
        "ui-gray-color": {
          one: "rgba(255, 255, 255, 0.04)",
          two: "rgba(255, 255, 255, 0.08)",
          three: "rgba(255, 255, 255, 0.12)",
          four: "rgba(255, 255, 255, 0.20)",
          five: "rgba(255, 255, 255, 0.30)",
          six: "rgba(255, 255, 255, 0.40)",
          seven: "rgba(255, 255, 255, 0.5)",
        },
        sub_title_color: "#B3B3B3",
        search_bar_background: "#D9D9D9",
      },
      fontFamily: {
        main_font: ["Circular Std", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
