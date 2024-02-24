import { useEffect, useState, createContext } from "react";
import useLocalStorage from "use-local-storage";

import Navbar from "./Navbar";
import Overlay from "./Overlay";

import "../assets/scss/components/App.scss";

export const ThemeContext = createContext(null);

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const preference = window.matchMedia("(prefers-color-scheme: light)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    preference ? "light" : "dark"
  );

  const handleToggleMenu = () => {
    const body = document.querySelector("body");

    setIsMenuOpen(!isMenuOpen);
    body.style.overflow = isMenuOpen ? "auto" : "hidden";
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const body = document.querySelector("body");

    body.dataset.theme = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="app">
        <Overlay isMenuOpen={isMenuOpen} />

        <Navbar isMenuOpen={isMenuOpen} handleToggleMenu={handleToggleMenu} />

        <div
          className="container px-1 py-3"
          style={{
            marginTop: "5rem",
          }}
        >
          <h1 className="title">My Awesome Portforlio Website</h1>

          <p>
            This is a simple portfolio website that I built using React. It has
            a dark mode feature and a responsive design. The website is built
            using React, Sass, and a few other libraries. The website is hosted
            on Netlify and the source code is available on GitHub. Feel free to
            use this website as a template for your own portfolio website. If
            you have any questions or suggestions, feel free to contact me. I
            hope you like it! 😊
          </p>

          <p>
            I am a web developer with a passion for building beautiful and
            functional websites. I have experience in building websites using
            HTML, CSS, JavaScript, React, and other web technologies. I am also
            familiar with web design principles and best practices. I am always
            looking for new opportunities to learn and grow as a developer. I am
            open to freelance work and other opportunities. If you have a
            project that you would like to discuss, feel free to contact me. I
            would love to hear from you! 😊
          </p>
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;