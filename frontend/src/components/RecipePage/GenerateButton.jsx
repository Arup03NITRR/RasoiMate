const GenerateButton = ({ handleGenerate, loading }) => (
  <button
    onClick={handleGenerate}
    disabled={loading}
    className={`w-full py-3 text-white font-semibold rounded-xl transition ${
      loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-700 hover:bg-purple-600 cursor-pointer'
    }`}
  >
    {loading ? 'Generating...' : 'Generate Recipe'}
  </button>
);

export default GenerateButton;
