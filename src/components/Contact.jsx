import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  const items = [
    { icon: assets.emailIcon, label: "Email", link: "mailto:anjanar266@gmail.com" },
    { icon: assets.linkedinIcon, label: "LinkedIn", link: "https://www.linkedin.com/in/anjana-ramachandran-achariya/" },
    { icon: assets.githubIcon, label: "GitHub", link: "https://github.com/Anjana-achariya" },
    { icon: assets.hfIcon, label: "HuggingFace", link: "https://huggingface.co/anjanaR" },
  ];

  return (
    <div
      id="contact"
      className="
        w-full py-16 flex flex-col items-center
        bg-background dark:bg-dark-bg
        transition-colors duration-300
      "
    >
      {/* Heading */}
      <h2
        className="
          text-3xl font-heading font-extrabold mb-4
          bg-gradient-to-r 
          from-[var(--color-primary)] 
          via-[var(--color-primary-mid)]
          to-[var(--color-primary-dark)]
          bg-clip-text text-transparent
        "
      >
        Let’s Connect
      </h2>

      {/* Subtitle */}
      <p className="text-text dark:text-dark-muted opacity-80 text-center mb-10 font-body max-w-md">
        Available for collaborations, AI projects, portfolio reviews, or creating something awesome together.
      </p>

      {/* Icons */}
      <div className="flex gap-12 flex-wrap justify-center">
        {items.map((item, idx) => (
          <a
            key={idx}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center group"
          >
            <img
              src={item.icon}
              alt={item.label}
              className="
                w-14 h-14 transition-all duration-300 
                group-hover:scale-110
                group-hover:drop-shadow-[0_0_12px_rgba(6,182,212,0.7)]
                dark:group-hover:drop-shadow-[0_0_12px_rgba(96,165,250,0.8)]
              "
            />
            <span className="mt-2 text-sm opacity-75 group-hover:opacity-100 transition">
              {item.label}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Contact;
