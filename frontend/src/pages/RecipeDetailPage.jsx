// src/pages/RecipeDetailPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import RecipeOutput from '../components/RecipePage/RecipeOutput';

const RecipeDetailPage = () => {
  const { recipeId } = useParams();
  const { token, userEmail, loading: authLoading } = useAuth(); // Added authLoading
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      if (authLoading) return; // Wait for auth to load

      if (!token || !userEmail) {
        navigate('/login', { state: { from: `/my-recipes/${recipeId}` } });
        return;
      }

      try {
        setLoading(true);
        setError('');
        const response = await axios.get(`http://localhost:8000/recipe/${recipeId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRecipe(response.data);
      } catch (err) {
        console.error('Failed to fetch recipe details:', err.response?.data || err.message);
        if (err.response?.status === 401 || err.response?.status === 403) {
          setError('You are not authorized to view this recipe, or your session has expired.');
          navigate('/login', { state: { from: `/my-recipes/${recipeId}` } });
        } else if (err.response?.status === 404) {
          setError('Recipe not found.');
        } else {
          setError('Failed to load recipe details. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [recipeId, token, userEmail, authLoading, navigate]);

  const formatDateTime = (isoString) => {
    if (!isoString) return 'N/A';
    const date = new Date(isoString);
    return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleString();
  };

  if (authLoading || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-xl text-gray-700">Loading recipe details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 text-center px-4">
        <p className="text-xl text-red-500">{error}</p>
        <Link to="/my-recipes" className="mt-4 text-purple-600 hover:underline">Back to My Recipes</Link>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 text-center px-4">
        <p className="text-xl text-gray-700">No recipe found.</p>
        <Link to="/my-recipes" className="mt-4 text-purple-600 hover:underline">Back to My Recipes</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8 flex justify-center">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8 space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-purple-800">Recipe Details</h1>
          <Link to="/my-recipes" className="text-purple-600 hover:underline">&larr; Back to My Recipes</Link>
        </div>

        <div className="border-b pb-4 mb-4 text-gray-600 space-y-2">
          <p><span className="font-semibold">Generated On:</span> {formatDateTime(recipe.generated_at)}</p>
          <p><span className="font-semibold">Cuisine:</span> {recipe.input.cuisine}</p>
          <p><span className="font-semibold">Serves:</span> {recipe.input.num_people} people</p>
          <p><span className="font-semibold">Ingredients:</span> {recipe.input.ingredients}</p>
          <p><span className="font-semibold">Model Used:</span> {recipe.input.model}</p>
          <p><span className="font-semibold">Language:</span> {recipe.input.language}</p>
        </div>

        <h2 className="text-2xl font-semibold text-purple-700 mb-4">The Generated Recipe:</h2>
        <RecipeOutput recipe={recipe.generated_recipe} />
      </div>
    </div>
  );
};

export default RecipeDetailPage;
