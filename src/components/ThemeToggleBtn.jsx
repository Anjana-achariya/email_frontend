import React from "react";
import toggledark from "../assets/settingsdark.png";
import togglelight from "../assets/settingslight.png";

const ThemeToggleBtn = ({ theme, setTheme }) => {
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="
        p-1 
        rounded-full
        bg-transparent
        hover:scale-105
        transition-all duration-300
        flex items-center justify-center
      "
    >
      {theme === "dark" ? (
        <img
          src={toggledark}
          alt="Light Mode"
          className="w-8 h-8 object-contain pointer-events-none"
        />
      ) : (
        <img
          src={togglelight}
          alt="Dark Mode"
          className="w-8 h-8 object-contain pointer-events-none"
        />
      )}
    </button>
  );
};

export default ThemeToggleBtn;
