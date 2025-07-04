const IngredientsInput = ({ ingredients, setIngredients }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">Ingredients (comma-separated)</label>
    <input
      type="text"
      value={ingredients}
      onChange={(e) => setIngredients(e.target.value)}
      className="mt-1 w-full p-2 border rounded-md"
      placeholder="e.g. chicken, garlic, onion"
    />
  </div>
);

export default IngredientsInput;
