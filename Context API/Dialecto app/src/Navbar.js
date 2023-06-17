import { useContext } from "react";
import { languageContext } from "./languageContext";
import { themeContext } from "./themeContext";

export const Navbar = () => {
  const { theme, setTheme } = useContext(themeContext);
  const { language } = useContext(languageContext);

  const changeTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <div className="navbar">
      <span>Dialecto</span>
      <div className="right">
        <button onClick={changeTheme}>
          {theme === "light" ? "Dark" : "Light"} Theme
        </button>
        <span>{language}</span>
      </div>
    </div>
  );
};
