export function SkillsSection() {
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: "fas fa-code",
      color: "text-blue-600 dark:text-blue-400",
      skills: [
        { name: "Python", icon: "fab fa-python", color: "text-blue-500", level: "Advanced" },
        { name: "SQL", icon: "fas fa-database", color: "text-orange-500", level: "Intermediate" },
        { name: "MySQL", icon: "fas fa-database", color: "text-blue-600", level: "Intermediate" },
        { name: "Modern Web Developer", icon: "fas fa-globe", color: "text-green-500", level: "Intermediate" },
      ],
    },
    {
      title: "Data Science Libraries",
      icon: "fas fa-chart-line",
      color: "text-violet-600 dark:text-violet-400",
      skills: [
        { name: "Pandas", icon: "fas fa-table", color: "text-green-500", level: "Advanced" },
        { name: "NumPy", icon: "fas fa-calculator", color: "text-blue-500", level: "Advanced" },
        { name: "Seaborn", icon: "fas fa-chart-bar", color: "text-purple-500", level: "Intermediate" },
        { name: "Matplotlib", icon: "fas fa-chart-line", color: "text-orange-600", level: "Intermediate" },
      ],
    },
    {
      title: "Machine Learning & AI",
      icon: "fas fa-brain",
      color: "text-emerald-600 dark:text-emerald-400",
      skills: [
        { name: "Scikit-learn", icon: "fas fa-robot", color: "text-orange-500", level: "Intermediate" },
        { name: "Deep Learning", icon: "fas fa-network-wired", color: "text-green-500", level: "Beginner" },
        { name: "Data Visualization", icon: "fas fa-eye", color: "text-purple-500", level: "Advanced" },
        { name: "Data Cleaning", icon: "fas fa-broom", color: "text-blue-500", level: "Advanced" },
      ],
    },

    {
      title: "Tools & Platforms",
      icon: "fas fa-tools",
      color: "text-amber-600 dark:text-amber-400",
      skills: [
        { name: "Jupyter Notebook", icon: "fas fa-book", color: "text-orange-500", level: "Advanced" },
        { name: "VS Code", icon: "fas fa-code", color: "text-blue-500", level: "Advanced" },
        { name: "Git & GitHub", icon: "fab fa-git-alt", color: "text-red-500", level: "Intermediate" },
        { name: "Microsoft Azure", icon: "fas fa-cloud", color: "text-blue-600", level: "Certified" },
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 px-4 bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-900/20 dark:to-violet-900/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and tools I work with
          </p>
        </div>

        <div className="grid gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h3 className={`text-2xl font-bold mb-6 text-center ${category.color}`}>
                <i className={`${category.icon} mr-3`}></i>
                {category.title}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="skill-card group">
                    <i className={`${skill.icon} text-4xl ${skill.color} mb-4 group-hover:scale-110 transition-transform duration-300`}></i>
                    <h4 className="font-semibold">{skill.name}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{skill.level}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
