const cuisines = [
                "Vegetarian",
                "Non-Vegetarian",
                "Vegan",
                "Street Food",
                "Snacks / Starters",
                "Tiffin / Light Meals",
                "Festival / Special",
                "Desserts / Sweets",
                "Healthy / Low Oil",
                "Beverages"
            ];

const CuisineSelector = ({ selectedCuisine, setSelectedCuisine }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">Cuisine Type</label>
    <div className="grid grid-cols-2 gap-2">
      {cuisines.map(cuisine => (
        <div
          key={cuisine}
          onClick={() => setSelectedCuisine(cuisine)}
          className={`cursor-pointer px-4 py-2 border rounded-md text-center ${
            selectedCuisine === cuisine ? 'bg-blue-500 text-white' : 'bg-gray-100'
          }`}
        >
          {cuisine}
        </div>
      ))}
    </div>
  </div>
);

export default CuisineSelector;
