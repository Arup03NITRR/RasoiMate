import { Link } from 'react-router-dom';

const AboutSection = () => (
  <section className="bg-white py-20 px-6">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold text-center text-purple-800 mb-12">About Us</h2>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Image side */}
        <div className="flex justify-center">
          <img
            src="/aboutpage/img1.avif"
            alt="AI cooking illustration"
            className="w-full max-w-md rounded-xl"
          />
        </div>

        {/* Text content */}
        <div className="text-gray-700 space-y-5">
          <p className="text-lg">
            We're building the future of home cooking by blending culinary creativity with AI precision. No more stress
            about what to cook — just enter your ingredients and let our AI do the magic.
          </p>

          <p className="text-lg">
            Whether you're craving Indian, Italian, Vegan, or Fusion cuisine, our platform supports it all. Choose your
            preferred model (Llama3, Groq, or Gemma2) and generate a recipe in your favorite language.
          </p>

          <p className="text-lg">
            With easy-to-follow instructions, quantity-adjustable servings, and beautifully formatted results, it’s like
            having a smart chef in your pocket.
          </p>

          <Link to="/about">
            <button className="mt-4 bg-purple-700 text-white px-6 py-3 rounded-xl hover:bg-purple-800 transition">
              Know More
            </button>
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
