import { useState } from "react";
import { useTheme } from "./theme-provider";

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#certificates", label: "Certificates" },
    { href: "#contact", label: "Contact" },
  ];

  const handleNavClick = (href: string) => {
    console.log(`Navigation clicked: ${href}`);
    const element = document.querySelector(href);
    if (element) {
      console.log(`Element found, scrolling to: ${href}`);
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      console.log(`Element not found: ${href}`);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-11/12 max-w-4xl">
      <div className="glass-card px-6 py-3">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            Miraj Ud Din
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="nav-link hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-white/20 dark:bg-black/20 backdrop-blur-sm hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-300"
            >
              <i className={theme === "light" ? "fas fa-moon" : "fas fa-sun"}></i>
            </button>
            
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-white/20 dark:bg-black/20 backdrop-blur-sm"
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-white/20 dark:border-white/10">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="nav-link hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300 text-left"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
