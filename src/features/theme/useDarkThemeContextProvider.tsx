import {
  $,
  createContext,
  useContextProvider,
  useOnWindow,
  useStore,
} from "@builder.io/qwik";

// Declare a context ID
export const DARK_THEME_CTX = createContext<{
  theme: "dark" | "light" | undefined;
}>("dark_theme");

export const useDarkThemeContextProvider = () => {
  const store = useStore({
    theme:
      (typeof window !== "undefined" && window?.localStorage?.theme) ||
      undefined,
  });

  useOnWindow(
    "DOMContentLoaded",
    $(() => {
      store.theme =
        window.localStorage.theme === "dark" ||
        (!("theme" in window.localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
          ? "dark"
          : "light";
    })
  );
  useContextProvider(DARK_THEME_CTX, store);
};
