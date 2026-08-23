"use client";

import { MotionConfig } from "motion/react";
import Experience from "../components/experience/Experience";
import Projects from "../components/projects/Projects";
import Footer from "../components/footer/Footer";
import About from "../components/about/About";
import Home from "@/components/home/home";
import Contact from "@/components/contact/contact";
import Stack from "@/components/Stack/Stack";
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
          <Home />
          <About />
          <Experience />
          <Projects />
          <Stack />
          <Contact />
        </main>

        <Footer />

        <ChatWidget />
      </div>
    </MotionConfig>
  );
}

export default App;
