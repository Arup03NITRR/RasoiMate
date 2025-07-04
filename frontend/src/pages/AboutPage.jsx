import { Link } from 'react-router-dom';

const AboutPage = () => (
  <main className="bg-white text-gray-800">
    {/* Hero Banner */}
    <section className="relative bg-[url('/aboutpage/banner.avif')] bg-cover bg-center text-white py-24 px-6">
      <div className="bg-black/50 absolute inset-0"></div>
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">About Our AI Recipe Platform</h1>
        <p className="text-xl max-w-2xl mx-auto">
          Empowering home cooks with creativity, convenience, and cutting-edge AI.
        </p>
      </div>
    </section>

    {/* Vision Section */}
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold text-purple-700 mb-4">Our Vision</h2>
          <p className="text-lg text-gray-700">
            We aim to revolutionize home cooking by making recipe creation effortless. Whether you're short on time, 
            ingredients, or inspiration—our AI transforms your pantry into possibilities.
          </p>
        </div>
        <img
          src="/aboutpage/img3.avif"
          alt="Our Vision"
          className="rounded-xl w-120"
        />
      </div>
    </section>

    {/* Features Section */}
    <section className="py-20 px-6 bg-purple-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-purple-800 mb-10">Key Features</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white rounded-xl border">
            <h3 className="text-xl font-semibold mb-2">AI-Powered Recipes</h3>
            <p>Generate creative, step-by-step recipes using models like Llama3, Groq, and Gemma2.</p>
          </div>
          <div className="p-6 bg-white rounded-xl border">
            <h3 className="text-xl font-semibold mb-2">Multilingual Support</h3>
            <p>Choose your preferred output language and cook with comfort and clarity.</p>
          </div>
          <div className="p-6 bg-white rounded-xl border">
            <h3 className="text-xl font-semibold mb-2">Cuisine Variety</h3>
            <p>Get inspired by Vegetarian, Non-vegetarian, Vegan, or Fast Food styles.</p>
          </div>
        </div>
      </div>
    </section>

    {/* Tech Stack Section */}
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <img
          src="/aboutpage/img4.avif"
          alt="AI Models"
          className="rounded-xl w-full"
        />
        <div>
          <h2 className="text-3xl font-bold text-purple-700 mb-4">Our Technology</h2>
          <p className="text-lg text-gray-700 mb-4">
            We integrate the power of <strong>Groq</strong>, <strong>Llama 3</strong>, and <strong>Gemma 2</strong> 
            &nbsp;to offer blazing-fast, intelligent, and context-aware recipes.
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Fast inference with Groq hardware</li>
            <li>Natural instruction-following via Gemma2</li>
            <li>General-purpose flexibility with Llama3</li>
          </ul>
        </div>
      </div>
    </section>

    {/* Benefits */}
    <section className="py-20 px-6 bg-purple-100">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-purple-800 mb-6">Why Use Our Platform?</h2>
        <p className="text-lg text-gray-700 mb-10 max-w-2xl mx-auto">
          Cooking doesn't have to be stressful or repetitive. We help you make the most of what you already have.
        </p>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h4 className="font-semibold mb-2">Ingredient Based</h4>
            <p>Input what you have. Get instant results.</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h4 className="font-semibold mb-2">For All Diets</h4>
            <p>Vegetarian, Vegan, Gluten-Free? We’ve got it covered.</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h4 className="font-semibold mb-2">No Guesswork</h4>
            <p>Clear instructions and smart suggestions.</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h4 className="font-semibold mb-2">Free & Fast</h4>
            <p>Lightning-fast generation. Completely free.</p>
          </div>
        </div>
      </div>
    </section>

    {/* Call to Action */}
    <section className="text-center py-16 px-6 bg-white">
      <h2 className="text-3xl font-bold text-purple-700 mb-4">Ready to Cook Smarter?</h2>
      <p className="text-lg text-gray-700 mb-6">Start generating your AI-powered recipe today.</p>
      <Link to="/generate">
        <button className="bg-purple-700 text-white px-6 py-3 rounded-xl hover:bg-purple-800 transition">
          Generate a Recipe
        </button>
      </Link>
    </section>
  </main>
);

export default AboutPage;
