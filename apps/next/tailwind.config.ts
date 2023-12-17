import { type Config } from "tailwindcss";

import baseConfig from "@repo/tailwind";

export default {
  darkMode: "class",
  theme: {},
  content: ["./src/**/*.{ts,tsx}"],
  presets: [baseConfig],
} satisfies Config;
