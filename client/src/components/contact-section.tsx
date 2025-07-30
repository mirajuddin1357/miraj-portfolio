import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Message sent successfully!",
          description: data.message || "Thank you for your message. I will get back to you soon.",
        });
        
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        throw new Error(data.message || 'Failed to send message');
      }
    } catch (error) {
      toast({
        title: "Error sending message",
        description: error instanceof Error ? error.message : "Please try again later or contact me directly via email.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      title: "Location",
      icon: "fas fa-map-marker-alt",
      color: "text-blue-600 dark:text-blue-400",
      content: (
        <p className="text-slate-600 dark:text-slate-400">
          Peshawar, Khyber Pakhtunkhwa<br />
          Pakistan 🇵🇰
        </p>
      ),
    },
    {
      title: "Email",
      icon: "fas fa-envelope",
      color: "text-emerald-600 dark:text-emerald-400",
      content: (
        <a 
          href="mailto:mirajuddin1357@gmail.com" 
          className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-300"
        >
          mirajuddin1357@gmail.com
        </a>
      ),
    },
    {
      title: "Social Links",
      icon: "fas fa-share-alt",
      color: "text-violet-600 dark:text-violet-400",
      content: (
        <div className="grid grid-cols-2 gap-4">
          <a href="https://github.com/mirajuddin1357" target="_blank" rel="noopener noreferrer" className="contact-social-link">
            <i className="fab fa-github text-2xl"></i>
            <span>GitHub</span>
          </a>
          <a href="https://www.linkedin.com/in/miraj-ud-din-66ba2427a/" target="_blank" rel="noopener noreferrer" className="contact-social-link">
            <i className="fab fa-linkedin text-2xl"></i>
            <span>LinkedIn</span>
          </a>
          <a href="https://mirajuddin1357.github.io/portfolio-website/" target="_blank" rel="noopener noreferrer" className="contact-social-link">
            <i className="fas fa-globe text-2xl"></i>
            <span>Portfolio</span>
          </a>
          <a href="mailto:mirajuddin1357@gmail.com" className="contact-social-link">
            <i className="fas fa-envelope text-2xl"></i>
            <span>Email</span>
          </a>
        </div>
      ),
    },
    {
      title: "Response Time",
      icon: "fas fa-clock",
      color: "text-amber-600 dark:text-amber-400",
      content: (
        <p className="text-slate-600 dark:text-slate-400">
          I typically respond within 24-48 hours. Looking forward to connecting with you!
        </p>
      ),
    },
  ];

  return (
    <section id="contact" className="py-20 px-4 bg-gradient-to-r from-violet-50 to-blue-50 dark:from-violet-900/20 dark:to-blue-900/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Ready to collaborate or have a question? I'd love to hear from you!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="glass-card p-8">
            <h3 className="text-2xl font-bold mb-6 text-violet-600 dark:text-violet-400">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/50 dark:bg-black/50 backdrop-blur-sm border border-white/20 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/50 dark:bg-black/50 backdrop-blur-sm border border-white/20 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/50 dark:bg-black/50 backdrop-blur-sm border border-white/20 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="subject">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/50 dark:bg-black/50 backdrop-blur-sm border border-white/20 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300"
                  placeholder="Project Collaboration"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/50 dark:bg-black/50 backdrop-blur-sm border border-white/20 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Tell me about your project or inquiry..."
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>Sending...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane mr-2"></i>Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="glass-card p-6">
                <h3 className={`text-xl font-bold mb-4 ${info.color}`}>
                  <i className={`${info.icon} mr-3`}></i>{info.title}
                </h3>
                {info.content}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
