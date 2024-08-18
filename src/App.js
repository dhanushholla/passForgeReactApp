import PasswordGenerator from "./Components/PasswordGenerator";
import "./styles.css";
import { createContext, useState, useRef, useEffect } from "react";

export const ThemeContext = createContext();

export default function App() {
  const baseStringRef = useRef(null);
  const [themeState, setThemeState] = useState("light");
  useEffect(() => {
    if (baseStringRef.current) {
      baseStringRef.current.focus();
    }
  }, [themeState]);
  const ToggleTheme = () => {
    setThemeState(themeState === "light" ? "dark" : "light");
  };
  return (
    <ThemeContext.Provider value={{ themeState, ToggleTheme }}>
      <div className="App">
        <PasswordGenerator baseStringRef={baseStringRef} />
      </div>
    </ThemeContext.Provider>
  );
}
