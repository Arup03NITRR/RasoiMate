import React, { useState } from 'react';
import Heading from '../components/RecipePage/Heading';
import IngredientsInput from '../components/RecipePage/IngredientsInput';
import CuisineSelector from '../components/RecipePage/CuisineSelector';
import PeopleInput from '../components/RecipePage/PeopleInput';
import LanguageSelect from '../components/RecipePage/LanguageSelect';
import ModelSelector from '../components/RecipePage/ModelSelector';
import GenerateButton from '../components/RecipePage/GenerateButton';
import RecipeOutput from '../components/RecipePage/RecipeOutput';
import { generateRecipe } from '../api/recipeAPI';

const RecipePage = () => {
  const [ingredients, setIngredients] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [people, setPeople] = useState(1);
  const [language, setLanguage] = useState('English');
  const [selectedModel, setSelectedModel] = useState('');
  const [recipe, setRecipe] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const generated = await generateRecipe({
      ingredients,
      cuisine: selectedCuisine,
      people,
      language,
      model: selectedModel,
    });
    setRecipe(generated);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-200 p-6 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-8 space-y-6">
        <Heading />
        <IngredientsInput ingredients={ingredients} setIngredients={setIngredients} />
        <CuisineSelector selectedCuisine={selectedCuisine} setSelectedCuisine={setSelectedCuisine} />
        <PeopleInput people={people} setPeople={setPeople} />
        <LanguageSelect language={language} setLanguage={setLanguage} />
        <ModelSelector selectedModel={selectedModel} setSelectedModel={setSelectedModel} />
        <GenerateButton handleGenerate={handleGenerate} loading={loading}/>
        <RecipeOutput recipe={recipe} />
      </div>
    </div>
  );
};

export default RecipePage;
