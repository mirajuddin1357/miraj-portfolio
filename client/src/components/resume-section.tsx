export function ResumeSection() {
  const resumeData = {
    education: [
      {
        title: "B.S. Artificial Intelligence",
        institution: "University of Agriculture, Peshawar",
        period: "2023 - 2027 (Expected)",
      },
    ],
    experience: [
      {
        title: "Data Science Projects",
        company: "Personal & Academic",
        period: "2023 - Present",
      },
      {
        title: "Python Developer",
        company: "Freelance Projects",
        period: "2023 - Present",
      },
    ],
    skills: [
      { name: "Python", level: 90, color: "bg-blue-600" },
      { name: "Data Analysis", level: 85, color: "bg-emerald-600" },
      { name: "Machine Learning", level: 75, color: "bg-violet-600" },
    ],
  };

  const handleDownloadResume = () => {
    // In a real application, this would link to an actual PDF file
    console.log("Download resume button clicked");
    alert("Resume download functionality will be implemented with actual PDF file.");
  };

  return (
    <section id="resume" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            Resume
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Download my complete resume or view key highlights below
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Education */}
          <div className="glass-card p-6">
            <h3 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">
              <i className="fas fa-graduation-cap mr-3"></i>Education
            </h3>
            <div className="space-y-4">
              {resumeData.education.map((edu, index) => (
                <div key={index}>
                  <h4 className="font-semibold">{edu.title}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{edu.institution}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-500">{edu.period}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="glass-card p-6">
            <h3 className="text-xl font-bold mb-4 text-violet-600 dark:text-violet-400">
              <i className="fas fa-briefcase mr-3"></i>Experience
            </h3>
            <div className="space-y-4">
              {resumeData.experience.map((exp, index) => (
                <div key={index}>
                  <h4 className="font-semibold">{exp.title}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{exp.company}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-500">{exp.period}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Skills */}
          <div className="glass-card p-6">
            <h3 className="text-xl font-bold mb-4 text-emerald-600 dark:text-emerald-400">
              <i className="fas fa-star mr-3"></i>Key Skills
            </h3>
            <div className="space-y-4">
              {resumeData.skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">{skill.name}</span>
                    <span className="text-sm text-blue-600">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div 
                      className={`${skill.color} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handleDownloadResume}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            <i className="fas fa-download mr-3"></i>Download Full Resume (PDF)
          </button>
        </div>
      </div>
    </section>
  );
}
