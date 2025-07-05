import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function NavigationBar() {
  const { userName, logout, token } = useAuth(); // Use userName from AuthContext
  const navigate = useNavigate();

  // --- ADDED FOR DEBUGGING ---
  console.log('NavigationBar: userName from AuthContext:', userName);
  // --- END DEBUGGING ---

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <nav className="backdrop-blur-md bg-black/70 supports-[backdrop-filter]:bg-black/70 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-4">

        {/* Logo Section */}
        <Link to="/" className="flex items-center space-x-3 mb-4 md:mb-0">
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
        </Link>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center md:justify-end gap-6 text-white font-medium text-sm md:text-base items-center">
          <Link to="/" className="hover:text-orange-400 hover:underline transition duration-200">Home</Link>
          <Link to="/generate" className="hover:text-orange-400 hover:underline transition duration-200">Generate Recipe</Link>
          <Link to="/about" className="hover:text-orange-400 hover:underline transition duration-200">About</Link>
          <Link to="/contact" className="hover:text-orange-400 hover:underline transition duration-200">Contact</Link>

          {token && (
            <Link to="/my-recipes" className="hover:text-orange-400 hover:underline transition duration-200">
              My Recipes
            </Link>
          )}

          {!token ? (
            <button
              onClick={handleLogin}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded-lg transition duration-200"
            >
              Login
            </button>
          ) : (
            <div className="flex items-center space-x-3">
              {/* Display userName when logged in */}
              <span className="text-orange-300 font-semibold">{userName}</span>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg transition duration-200"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;