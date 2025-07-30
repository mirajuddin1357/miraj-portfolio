export function ProjectsSection() {
  const projects = [
    {
      title: "Customer Segmentation Analysis",
      description: "Machine Learning project using K-means clustering to segment customers based on purchasing behavior and demographics for targeted marketing strategies.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=600",
      tech: ["Python", "Pandas", "Scikit-learn", "Matplotlib"],
      techColors: ["bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300", "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300", "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300", "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"],
      github: "https://github.com/mirajuddin1357",
      demo: "#",
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "House Price Prediction Model",
      description: "Regression model to predict house prices using features like location, size, and amenities. Achieved 92% accuracy using Random Forest algorithm.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=600",
      tech: ["Python", "NumPy", "Scikit-learn", "Seaborn"],
      techColors: ["bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300", "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300", "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300", "bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300"],
      github: "https://github.com/mirajuddin1357",
      demo: "#",
      color: "text-violet-600 dark:text-violet-400",
    },
    {
      title: "COVID-19 Data Analysis Dashboard",
      description: "Interactive dashboard analyzing global COVID-19 trends, vaccination rates, and regional comparisons using real-time data from WHO and Johns Hopkins.",
      image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=600",
      tech: ["Python", "Pandas", "APIs", "Matplotlib"],
      techColors: ["bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300", "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300", "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300", "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"],
      github: "https://github.com/mirajuddin1357",
      demo: "#",
      color: "text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "Social Media Sentiment Analysis",
      description: "Natural Language Processing tool to analyze sentiment in social media posts and reviews, helping businesses understand customer feedback at scale.",
      image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=600",
      tech: ["Python", "NLTK", "Scikit-learn", "APIs"],
      techColors: ["bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300", "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300", "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300", "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"],
      github: "https://github.com/mirajuddin1357",
      demo: "#",
      color: "text-amber-600 dark:text-amber-400",
    },
  ];

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Showcase of my practical work in Data Science, Machine Learning, and AI
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="project-card group">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-48 object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-300" 
              />
              <div className="p-6">
                <h3 className={`text-xl font-bold mb-3 ${project.color}`}>{project.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className={`tech-tag ${project.techColors[techIndex]}`}>
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                    <i className="fab fa-github mr-2"></i>Code
                  </a>
                  <a href={project.demo} className="project-link">
                    <i className="fas fa-external-link-alt mr-2"></i>Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a 
            href="https://github.com/mirajuddin1357" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            <i className="fab fa-github mr-3"></i>View All Projects on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
