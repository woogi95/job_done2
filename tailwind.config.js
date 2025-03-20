/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Vite 프로젝트에 맞는 파일 확장자 추가
  ],
  theme: {
    extend: {
      colors: {
        btColor: "C3EEFB",
        btTextColor: "0B7493",
      },
      keyframes: {
        kenburns: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.05)" },
        },
        shake: {
          "10%, 90%": { transform: "translate3d(-1px, 0, 0)" },
          "20%, 80%": { transform: "translate3d(2px, 0, 0)" },
          "30%, 50%, 70%": { transform: "translate3d(-4px, 0, 0)" },
          "40%, 60%": { transform: "translate3d(4px, 0, 0)" },
        },
      },
      animation: {
        kenburns: "kenburns 10s ease-in-out infinite",
        shake: "shake 0.5s cubic-bezier(.36,.07,.19,.97) both",
      },
      screens: {
        "lg-custom": "1150px",
        "md-custom": "930px",
        "md-minus": { max: "930px" },
        "md-2-munus": { max: "768px" },
        "ms-muinus": { max: "640px" },
        "ms-mini": "480px",
      },
    },
  },
  plugins: [],
};
