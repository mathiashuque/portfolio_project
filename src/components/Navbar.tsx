import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center">
        {/* Left - Name */}
        <div className="font-bold text-lg">Mathias Huque</div>

        {/* Center - Links */}
        <div className="flex-1 flex justify-center space-x-6">
          <a href="#home" className="hover:text-blue-400 transition">
            Home
          </a>

          <a href="#experience" className="hover:text-blue-400 transition">
            Experience
          </a>

          <a href="#projects" className="hover:text-blue-400 transition">
            Projects
          </a>

          <a href="#stack" className="hover:text-blue-400 transition">
            Stack
          </a>
        </div>

        {/* Right - Social icons */}
        <div className="flex space-x-4 text-xl">
          <a
            href="https://linkedin.com/in/mathias-huque"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/mHuque1"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
          >
            <FaGithub />
          </a>
        </div>
      </div>
    </nav>
  );
}
