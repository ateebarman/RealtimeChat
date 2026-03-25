import { create } from "zustand";

const LIGHT_THEMES = [
  "light", "cupcake", "bumblebee", "emerald", "corporate", "retro", 
  "valentine", "garden", "pastel", "fantasy", "wireframe", "cmyk", 
  "autumn", "lemonade", "winter", "nord"
];

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("streamify-theme") || "coffee",
  isDarkTheme: !LIGHT_THEMES.includes(localStorage.getItem("streamify-theme") || "coffee"),
  setTheme: (theme) => {
    localStorage.setItem("streamify-theme", theme);
    set({ theme, isDarkTheme: !LIGHT_THEMES.includes(theme) });
  },
}));
