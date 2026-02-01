import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Stack from "./components/Stack";
import Footer from "./components/Footer";


function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-[#0f1729] dark:text-white">
      <Navbar />
      <main>
        <Home />
        <Experience />
        <Projects />
        <Stack />
        <Footer />
      </main>
    </div>
  );
}


export default App;
