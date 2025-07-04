const MODEL_MAP = {
  Llama3: {
    id: 'Llama-3.3-70b-Versatile',
    description: 'High-quality, versatile model for general reasoning tasks.'
  },
  Gemma2: {
    id: 'Gemma2-9b-it',
    description: 'Fast, lightweight model tuned for instructions and chat.'
  },
  Groq: {
    id: 'Compound-Beta',
    description: 'Ultra-fast Groq-native model, great for structured output.'
  }
};

const ModelSelector = ({ selectedModel, setSelectedModel }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">Select Model</label>
    <div className="flex space-x-4 overflow-x-auto">
      {Object.entries(MODEL_MAP).map(([name, { id, description }]) => (
        <div
          key={id}
          onClick={() => setSelectedModel(name)}
          className={`w-64 cursor-pointer border rounded-md p-4 transition-colors ${
            selectedModel === name ? 'bg-green-500 text-white' : 'bg-gray-100 text-black'
          }`}
        >
          <div className="font-semibold text-lg mb-1 text-center">{name}</div>
          <div className="text-sm text-center">{description}</div>
        </div>
      ))}
    </div>
  </div>
);

export default ModelSelector;
