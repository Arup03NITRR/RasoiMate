export const generateRecipe = async ({ ingredients, cuisine, people, language, model }) => {
  try {
    const response = await fetch('http://127.0.0.1:8000/generate-recipe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ingredients,
        cuisine,
        num_people: people, // ✅ FIXED: must match backend's expected key
        language,
        model, // We'll fix this next
      }),
    });

    if (!response.ok) {
      const errorText = await response.text(); // Show full server response
      console.error("API Error Response:", errorText);
      throw new Error('API error');
    }

    const data = await response.json();
    return data.recipe;
  } catch (error) {
    console.error('Error generating recipe:', error);
    return 'Something went wrong while generating the recipe.';
  }
};
