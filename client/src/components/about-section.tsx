import profileImage from "@assets/my_profile_1753819845593.jpg";

export function AboutSection() {
  const aboutCards = [
    {
      title: "Academic Background",
      icon: "fas fa-graduation-cap",
      color: "text-blue-600 dark:text-blue-400",
      content: (
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          Currently in my 5th semester pursuing Bachelor of Science in Artificial Intelligence at{" "}
          <strong className="text-slate-800 dark:text-slate-200">University of Agriculture, Peshawar</strong>. 
          My academic journey has equipped me with strong foundations in mathematics, statistics, and programming.
        </p>
      ),
    },
    {
      title: "Future Goals",
      icon: "fas fa-rocket",
      color: "text-violet-600 dark:text-violet-400",
      content: (
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          Aspiring to become a <strong className="text-slate-800 dark:text-slate-200">Machine Learning Engineer</strong>{" "}
          and <strong className="text-slate-800 dark:text-slate-200">Data Scientist</strong>. I aim to solve real-world problems 
          using AI and contribute to innovative solutions that make a positive impact on society.
        </p>
      ),
    },
    {
      title: "Passion & Mission",
      icon: "fas fa-heart",
      color: "text-emerald-600 dark:text-emerald-400",
      content: (
        <>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            I'm passionate about continuous learning and sharing knowledge. My mission is to democratize AI education 
            and make complex concepts accessible to everyone.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm">Learning</span>
            <span className="px-3 py-1 bg-violet-100 dark:bg-violet-900/30 text-violet-800 dark:text-violet-300 rounded-full text-sm">Teaching</span>
            <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 rounded-full text-sm">Innovation</span>
            <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 rounded-full text-sm">Problem Solving</span>
          </div>
        </>
      ),
    },
    {
      title: "Location & Background",
      icon: "fas fa-map-marker-alt",
      color: "text-amber-600 dark:text-amber-400",
      content: (
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          Based in <strong className="text-slate-800 dark:text-slate-200">Peshawar, Khyber Pakhtunkhwa, Pakistan</strong> 🇵🇰. 
          I'm proud of my cultural heritage and excited to contribute to the global tech community from this beautiful region.
        </p>
      ),
    },
  ];

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Get to know more about my journey, passion, and aspirations in AI and Data Science
          </p>
        </div>

        {/* Profile Section with Image */}
        <div className="glass-card p-8 mb-12">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="relative">
                <img 
                  src={profileImage} 
                  alt="Miraj Ud Din - AI Student" 
                  className="w-48 h-48 lg:w-56 lg:h-56 object-cover rounded-2xl shadow-2xl ring-4 ring-white/20 dark:ring-slate-700/20"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-blue-600/20 to-violet-600/20"></div>
              </div>
            </div>
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                Miraj Ud Din
              </h3>
              <p className="text-xl text-blue-600 dark:text-blue-400 font-semibold mb-4">
                B.S. Artificial Intelligence Student
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                Passionate about machine learning, data science, and artificial intelligence. Currently in my 5th semester 
                at the University of Agriculture, Peshawar, working towards becoming a skilled ML Engineer and Data Scientist.
              </p>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
                  <i className="fas fa-brain mr-2"></i>AI Enthusiast
                </span>
                <span className="px-4 py-2 bg-violet-100 dark:bg-violet-900/30 text-violet-800 dark:text-violet-300 rounded-full text-sm font-medium">
                  <i className="fas fa-chart-line mr-2"></i>Data Science
                </span>
                <span className="px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 rounded-full text-sm font-medium">
                  <i className="fas fa-code mr-2"></i>Machine Learning
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {aboutCards.map((card, index) => (
            <div key={index} className="glass-card p-8">
              <h3 className={`text-2xl font-bold mb-4 ${card.color}`}>
                <i className={`${card.icon} mr-3`}></i>
                {card.title}
              </h3>
              {card.content}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
