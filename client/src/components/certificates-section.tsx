export function CertificatesSection() {
  const certificates = [
    {
      title: "Microsoft Azure AI Fundamentals",
      subtitle: "AI-900 Certification",
      icon: "fab fa-microsoft",
      color: "text-blue-600 dark:text-blue-400",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400",
      description: "Demonstrated foundational knowledge of machine learning and artificial intelligence concepts and related Microsoft Azure services.",
      status: "Verified",
      statusColor: "bg-blue-600",
      issued: "2025",
      link: "#",
    },
    {
      title: "Google Data Analytics Certificate",
      subtitle: "Professional Certificate",
      icon: "fas fa-certificate",
      color: "text-amber-600 dark:text-amber-400",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400",
      description: "Currently pursuing comprehensive data analytics certification covering data cleaning, analysis, and visualization using industry-standard tools.",
      status: "In Progress",
      statusColor: "bg-amber-600",
      issued: "Expected: 2027",
      link: "#",
      opacity: "opacity-60",
    },
    {
      title: "Dean's List Recognition",
      subtitle: "Academic Excellence",
      icon: "fas fa-graduation-cap",
      color: "text-emerald-600 dark:text-emerald-400",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400",
      description: "Achieved Dean's List recognition for outstanding academic performance in Artificial Intelligence coursework with GPA above 3.8.",
      status: "Achievement",
      statusColor: "bg-emerald-600",
      issued: "Semester: 4th",
      link: "#",
      linkText: "Achieved",
      linkIcon: "fas fa-star",
    },
    {
      title: "TensorFlow Developer Certificate",
      subtitle: "Google TensorFlow",
      icon: "fas fa-brain",
      color: "text-violet-600 dark:text-violet-400",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400",
      description: "Planning to obtain TensorFlow Developer Certificate to strengthen deep learning and neural network implementation skills.",
      status: "Planned",
      statusColor: "bg-violet-600",
      issued: "Target: 2027",
      link: "#",
      linkText: "Planned",
      linkIcon: "fas fa-target",
      opacity: "opacity-60",
    },
  ];

  return (
    <section id="certificates" className="py-20 px-4 bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            Certificates & Achievements
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Professional certifications and learning milestones in my AI and Data Science journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {certificates.map((cert, index) => (
            <div key={index} className={`certificate-card ${cert.opacity || ""}`}>
              <div className="relative">
                <img 
                  src={cert.image} 
                  alt={cert.title}
                  className="w-full h-48 object-cover rounded-t-xl" 
                />
                <div className={`absolute top-4 right-4 ${cert.statusColor} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                  {cert.status}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <i className={`${cert.icon} text-3xl ${cert.color} mr-4`}></i>
                  <div>
                    <h3 className={`text-xl font-bold ${cert.color}`}>{cert.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400">{cert.subtitle}</p>
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-4">{cert.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500 dark:text-slate-400">{cert.issued}</span>
                  {cert.linkText ? (
                    <span className={`${cert.color} font-semibold`}>
                      <i className={`${cert.linkIcon} mr-2`}></i>{cert.linkText}
                    </span>
                  ) : (
                    <a href={cert.link} className={`${cert.color} hover:underline font-semibold`}>
                      <i className="fas fa-external-link-alt mr-2"></i>Verify
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
