const PeopleInput = ({ people, setPeople }) => {
  const handleChange = (e) => {
    const value = e.target.value;
    if (value === '') {
      setPeople('');
    } else {
      const number = Number(value);
      if (!isNaN(number)) setPeople(number);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Number of People</label>
      <input
        type="number"
        value={people}
        onChange={handleChange}
        min="1"
        className="mt-1 w-full p-2 border rounded-md"
        placeholder="Enter number"
      />
    </div>
  );
};

export default PeopleInput;
