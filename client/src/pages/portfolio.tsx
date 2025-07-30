import { ParticleBackground } from "@/components/particle-background";
import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { SkillsSection } from "@/components/skills-section";
import { ProjectsSection } from "@/components/projects-section";
import { CertificatesSection } from "@/components/certificates-section";
import { ResumeSection } from "@/components/resume-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/scroll-to-top";

export default function Portfolio() {
  return (
    <div className="relative min-h-screen">
      <ParticleBackground />
      <Navigation />
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <CertificatesSection />
        <ResumeSection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
