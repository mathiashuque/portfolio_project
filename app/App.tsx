"use client";

import { MotionConfig } from "motion/react";
import ExperienceSection from "@/components/experience/ExperienceSection";
import ProjectsSection from "@/components/projects/ProjectsSection";
import Footer from "@/components/footer/Footer";
import AboutSection from "@/components/about/AboutSection";
import HomeSection from "@/components/home/HomeSection";
import ContactSection from "@/components/contact/ContactSection";
import StackSection from "@/components/Stack/StackSection";
import { Navbar } from "@/components/navbar";
import ChatWidget from "@/components/chat/ChatWidget";
import SectionSnapScroll from "@/components/SectionSnapScroll";

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <SectionSnapScroll />
      <div className="min-h-screen bg-bg text-text">
        <Navbar />

        <main>
          <HomeSection />
          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />
          <StackSection />
          <ContactSection />
        </main>

        <Footer />

        <ChatWidget />
      </div>
    </MotionConfig>
  );
}

export default App;
