import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/generate');
  };

  return (
    <section
      className="relative text-center py-24 px-4 bg-cover bg-center"
      style={{ backgroundImage: "url('/homepage/bg1.jpg')" }}
    >
      {/* Overlay */}
      {/* <div className="absolute inset-0 bg-white/70 backdrop-blur-sm"></div> */}

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-purple-800 mb-4">
          Are you confused about what to cook today?
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-8">
          Let our AI decide your next delicious dish using just your ingredients.
        </p>
        <button
          onClick={handleClick}
          className="bg-purple-700 text-white px-6 py-3 rounded-xl hover:bg-purple-800 transition cursor-pointer"
        >
          Generate a Recipe
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
