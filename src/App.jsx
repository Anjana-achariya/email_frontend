import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Contact from "./components/Contact.jsx"
import HeroSection from "./components/HeroSection.jsx"


const App = () => {
  const [theme, setTheme] = useState("light");

  // Apply dark/light class to <html>
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <div
  className="
    min-h-screen 
    bg-[var(--color-background)] 
    text-[var(--color-text)]
    transition-colors duration-300
  "
>

      {/* Navbar */}
      <Navbar theme={theme} setTheme={setTheme} />

      {/* MAIN CONTENT */}
      <main className="px-6 pt-28 text-center max-w-4xl mx-auto">


        {/* Title */}
        <h1
          className="
            text-3xl md:text-4xl font-heading font-extrabold
            bg-gradient-to-r 
            from-[var(--color-primary)] 
            via-[var(--color-primary-mid)] 
            to-[var(--color-primary-dark)]
            bg-clip-text text-transparent
          "
        >
          SkillSculpt AI
        </h1>

        {/* Subtitle */}
        <p className="opacity-100 mt-3 text-sm md:text-base font-body">
          Sculpt your resume. Shape your future.
        </p>

        {/* Description */}
        <p className="opacity-90 mt-1 text-xs md:text-sm font-body">
          Upload your <strong>Resume</strong> and <strong>Job Description</strong>  
          to discover matching skills, missing skills, match score, and insights.
        </p>

        <p className="mt-1 text-sm opacity-90 font-body">
          Generate tailored <span className="text-[var(--color-primary)] font-semibold">
          job application emails</span> &  
          <span className="text-[var(--color-primary)] font-semibold">
          {" "}cover letters</span> instantly.
        </p>

        {/* Future Section (Uploads + Right Panel) */}
        <HeroSection />

        {/* CONTACT SECTION */}
        <Contact />
      </main>
    </div>
  );
};

export default App;
