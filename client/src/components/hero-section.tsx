import { useEffect, useState } from "react";

export function HeroSection() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const texts = [
    "B.S. (AI) Student | Data Science Enthusiast | Future ML Engineer",
    "Python Developer | Machine Learning Explorer | Data Analyst",
    "AI Student | Microsoft Azure Certified | Innovation Seeker"
  ];

  useEffect(() => {
    const text = texts[currentTextIndex];
    let timeout: NodeJS.Timeout;

    if (isTyping) {
      if (currentText.length < text.length) {
        timeout = setTimeout(() => {
          setCurrentText(text.slice(0, currentText.length + 1));
        }, 100);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      }
    } else {
      if (currentText.length > 0) {
        timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, 50);
      } else {
        setCurrentTextIndex((currentTextIndex + 1) % texts.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, currentTextIndex, isTyping, texts]);

  const socialLinks = [
    { href: "https://github.com/mirajuddin1357", icon: "fab fa-github", target: "_blank" },
    { href: "https://www.linkedin.com/in/miraj-ud-din-66ba2427a/", icon: "fab fa-linkedin", target: "_blank" },
    { href: "mailto:mirajuddin1357@gmail.com", icon: "fas fa-envelope" },
    { href: "https://mirajuddin1357.github.io/portfolio-website/", icon: "fas fa-globe", target: "_blank" },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-6xl mx-auto text-center z-10">
        <div className="animate-float">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-4">
              <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-emerald-600 bg-clip-text text-transparent">
                Hi, I'm Miraj Ud Din
              </span>
              <span className="wave-emoji text-6xl md:text-8xl ml-4">👋</span>
            </h1>
            <div className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-medium">
              <span className="typing-animation">{currentText}</span>
              <span className="animate-pulse">|</span>
            </div>
          </div>
          
          <div className="mb-8 text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Passionate about transforming data into insights and building intelligent systems. 
            Currently pursuing Artificial Intelligence at University of Agriculture, Peshawar.
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={() => {
                console.log("Get In Touch button clicked");
                const element = document.querySelector("#contact");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                } else {
                  console.log("Contact section not found");
                }
              }}
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Get In Touch
              <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
            </button>
            <button
              onClick={() => {
                console.log("View My Work button clicked");
                const element = document.querySelector("#projects");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                } else {
                  console.log("Projects section not found");
                }
              }}
              className="px-8 py-4 bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-full font-semibold hover:bg-white/20 dark:hover:bg-black/20 transition-all duration-300"
            >
              View My Work
            </button>
          </div>

          <div className="flex justify-center space-x-6">
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.target}
                className="social-link"
              >
                <i className={`${link.icon} text-2xl`}></i>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <i className="fas fa-chevron-down text-2xl text-slate-400"></i>
      </div>
    </section>
  );
}
