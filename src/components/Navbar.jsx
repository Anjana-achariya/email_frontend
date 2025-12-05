
import React, { useState } from "react";
import logo from "../assets/favicon.png";
import ThemeToggleBtn from "./ThemeToggleBtn.jsx"


const Navbar = ({ theme, setTheme }) => {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <>
      {/* NAVBAR BAR */}
      <div
  className="
    w-full fixed top-0 left-0 z-50
    bg-background dark:bg-[var(--color-background)]
    border-b border-card dark:border-dark-border
    backdrop-blur-md
    transition-colors duration-300
  "
>

        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">

          {/* LEFT — Logo + Brand Name */}
          <div className="flex items-center gap-3">
            <img 
  src={logo}
  className="w-10 h-10 object-contain bg-transparent rounded-none shadow-none"
  alt="Logo"
/>
            <div
              className="
                text-2xl font-heading font-extrabold
                bg-gradient-to-r 
                from-[var(--color-primary)] 
                via-[var(--color-primary-mid)] 
                to-[var(--color-primary-dark)]
                bg-clip-text text-transparent
              "
            >
              SkillSculpt AI
            </div>
          </div>

          {/* RIGHT — How to Use | Toggle | Contact */}
          <div className="flex items-center gap-4">

            {/* HOW TO USE BUTTON */}
            <button
              onClick={() => setShowHelp(true)}
              className="
                text-sm font-medium underline
                text-[var(--color-primary-dark)]
                dark:text-[var(--color-primary-mid)]
                hover:opacity-75
              "
            >
              How to use?
            </button>

            {/* THEME TOGGLE BUTTON */}
            <ThemeToggleBtn theme={theme} setTheme={setTheme} />

            {/* CONTACT BUTTON */}
            <a href="#contact">
              <button
                className="
                  bg-gradient-to-r 
                  from-[var(--color-primary)] 
                  to-[var(--color-primary-dark)]
                  text-white px-5 py-2 rounded-full 
                  shadow-md hover:shadow-lg hover:scale-105
                  transition duration-300
                "
              >
                Contact
              </button>
            </a>
          </div>
        </div>
      </div>

      {/* HOW TO USE MODAL */}
      {showHelp && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50">
          <div
            className="
              rounded-lg p-6 max-w-lg w-full shadow-xl
              bg-white text-gray-900
              dark:bg-dark-card dark:text-dark-text
            "
          >
            <h2
              className="
                text-xl font-heading font-bold mb-3
                text-[var(--color-primary-dark)]
                dark:text-[var(--color-primary-mid)]
              "
            >
              How to use SkillSculpt AI ✨
            </h2>

            <ul className="text-sm font-body space-y-2">
              <li>• Upload your Resume (PDF or DOCX)</li>
              <li>• Upload the Job Description (PDF, DOCX, or TXT)</li>
              <li>• Click Submit</li>
              <li>• Get Match Score, Skills, Strengths & Missing Skills</li>
              <li>• Generate Email / Cover Letter instantly</li>
              <li>• Receive resume improvement suggestions</li>
            </ul>

            <button
              onClick={() => setShowHelp(false)}
              className="
                mt-6 w-full py-2 rounded-md 
                bg-[var(--color-primary-mid)] text-white 
                hover:bg-[var(--color-primary-dark)]
                transition
              "
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
