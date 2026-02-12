"use client";

import Navbar from "../components/Navbar";
import Experience from "../components/experience/Experience";
import Projects from "../components/Projects";
import Footer from "../components/Footer";
import About from "../components/About";
import Home from "@/components/home/home";
import Contact from "@/components/contact/contact";
import Stack from "@/components/Stack/Stack";

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
