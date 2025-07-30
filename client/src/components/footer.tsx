import { VisitorCounter } from './visitor-counter';

export function Footer() {
  const socialLinks = [
    { href: "https://github.com/mirajuddin1357", icon: "fab fa-github", target: "_blank" },
    { href: "https://www.linkedin.com/in/miraj-ud-din-66ba2427a/", icon: "fab fa-linkedin", target: "_blank" },
    { href: "mailto:mirajuddin1357@gmail.com", icon: "fas fa-envelope" },
    { href: "https://mirajuddin1357.github.io/portfolio-website/", icon: "fas fa-globe", target: "_blank" },
  ];

  return (
    <footer className="py-12 px-4 bg-slate-900 dark:bg-black text-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
            Miraj Ud Din
          </h3>
          <p className="text-slate-400 mb-6">B.S. (AI) Student | Data Science Enthusiast | Future ML Engineer</p>
          <div className="flex justify-center space-x-6">
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.target}
                rel={link.target ? "noopener noreferrer" : undefined}
                className="footer-social-link"
              >
                <i className={`${link.icon} text-xl`}></i>
              </a>
            ))}
          </div>
        </div>
        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-center md:text-left">
              &copy; 2024 Miraj Ud Din. All rights reserved. | Made with 💙 using modern web technologies
            </p>
            <VisitorCounter />
          </div>
        </div>
      </div>
    </footer>
  );
}
