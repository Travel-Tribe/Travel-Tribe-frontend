/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // 해당 경로를 프로젝트의 구조에 맞게 조정
    "./node_modules/daisyui/**/*.js", // Daisy UI 컴포넌트 경로 추가
  ],
  theme: {
    extend: {
      colors: {
        "custom-gray": "#dbdbdb",
        "custom-green": "#ABD8B9",
        "custom-teal-green": "#006D5B",
        "custom-pink": "#FFB5A7",
        "custom-pink-hover": "#ff9e8d",
        "custom-red": "#FFB3B3",
        "custom-purple": "#E6C3DB",
        "custom-yellow": "#FFE3AA",
        "custom-blue": "#B8E3FF",
        "custom-bg": "#f9fbfc",
      },
    },
  },
  plugins: [require("daisyui")],
};
