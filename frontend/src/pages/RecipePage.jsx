import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom'; // Import for navigation
import Heading from '../components/RecipePage/Heading';
import IngredientsInput from '../components/RecipePage/IngredientsInput';
import CuisineSelector from '../components/RecipePage/CuisineSelector';
import PeopleInput from '../components/RecipePage/PeopleInput';
import LanguageSelect from '../components/RecipePage/LanguageSelect';
import ModelSelector from '../components/RecipePage/ModelSelector';
import GenerateButton from '../components/RecipePage/GenerateButton'; // This is the simplified one
import RecipeOutput from '../components/RecipePage/RecipeOutput';
import axios from 'axios';

const RecipePage = () => {
  const [ingredients, setIngredients] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [people, setPeople] = useState(1);
  const [language, setLanguage] = useState('English');
  const [selectedModel, setSelectedModel] = useState('');
  const [recipe, setRecipe] = useState('');
  const [loading, setLoading] = useState(false);

  const { token, userEmail } = useAuth(); // Also get userEmail for auth check
  const navigate = useNavigate();
  const location = useLocation();

  const handleGenerate = async () => {
    // 1. Authentication Check (moved here from GenerateButton)
    if (!userEmail || !token) {
        alert('You must be logged in to generate a recipe.');
        navigate('/login', { state: { from: location.pathname } });
        return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:8000/recipe/generate',
        {
          // --- CRITICAL CORRECTION HERE: Match Backend's RecipeInput Schema ---
          input: { // Backend expects an 'input' key
            ingredients: ingredients, // Send as string, backend will handle split
            cuisine: selectedCuisine, // Backend expects 'cuisine', not 'cuisine_type'
            num_people: people,       // Backend expects 'num_people'
            language: language,
            model: selectedModel,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRecipe(response.data.generated_recipe);
    } catch (err) {
      console.error('Failed to generate recipe:', err.response?.data || err.message);
      if (err.response?.status === 401) {
        alert('Session expired or unauthorized. Please log in again.');
        navigate('/login', { state: { from: location.pathname } }); // Redirect on 401
      } else {
        setRecipe('Error generating recipe. Please try again.');
        alert('Something went wrong. Check console for details.');
      }
    } finally {
      setLoading(false);
    }
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
        
        {/* --- CRITICAL CHANGE HERE: Pass handleGenerate as onClick prop --- */}
        <GenerateButton onClick={handleGenerate} loading={loading} />
        
        <RecipeOutput recipe={recipe} />
      </div>
    </div>
  );
};

export default RecipePage;