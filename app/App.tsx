"use client";

import Experience from "../components/experience/Experience";
import Projects from "../components/projects/Projects";
import Footer from "../components/footer/Footer";
import About from "../components/about/About";
import Home from "@/components/home/home";
import Contact from "@/components/contact/contact";
import Stack from "@/components/Stack/Stack";
import { Navbar } from "@/components/navbar";

function App() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <Navbar />
      <main>
        <Home />
        <About />
        <Experience />
        <Projects />
        <Stack />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}

export default App;
