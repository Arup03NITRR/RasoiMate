import { Link } from 'react-router-dom';

function NavigationBar() {
  return (
    <nav className="backdrop-blur-md bg-black/70 supports-[backdrop-filter]:bg-black/70 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-4">
        
        {/* Logo Section */}
        <div className="flex items-center space-x-3 mb-4 md:mb-0">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center p-1 shadow-sm">
            <img
              src="/logos/1.PNG"
              alt="RasoiMate Logo"
              className="w-full h-full object-contain rounded-full"
            />
          </div>
          <span className="text-2xl font-bold text-orange-500 tracking-tight">
            RasoiMate
          </span>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center md:justify-end gap-10 text-white font-medium text-sm md:text-base">
          <Link to="/" className="hover:text-orange-400 hover:underline transition duration-200">
            Home
          </Link>
          <Link to="/generate" className="hover:text-orange-400 hover:underline transition duration-200">
            Generate Recipe
          </Link>
          <Link to="/about" className="hover:text-orange-400 hover:underline transition duration-200">
            About
          </Link>
          <Link to="/contact" className="hover:text-orange-400 hover:underline transition duration-200">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;
