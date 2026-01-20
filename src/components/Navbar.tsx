export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      {/* Logo / Brand */}
      <div className="text-lg font-bold">MyApp</div>

      {/* Links */}
      <div className="space-x-4">
        <a href="#" className="hover:text-blue-400 transition">
          Home
        </a>
        <a href="#" className="hover:text-blue-400 transition">
          About
        </a>
        <a href="#" className="hover:text-blue-400 transition">
          Contact
        </a>
      </div>
    </nav>
  );
}
