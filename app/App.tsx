"use client";

import Navbar from "./components/Navbar";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Stack from "./components/Stack";
import Footer from "./components/Footer";
import About from "./components/About";
import Contact from "./components/contact";
import Home from "./components/home";

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
