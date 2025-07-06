// src/pages/MyRecipesPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const MyRecipePage = () => {
  const { token, userEmail, loading: authLoading } = useAuth(); // get auth loading
  const navigate = useNavigate();

  const [userRecipes, setUserRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingIds, setDeletingIds] = useState({});

  useEffect(() => {
    const fetchMyRecipes = async () => {
      if (authLoading) return; // wait for auth to load

      if (!token) {
        navigate('/login', { state: { from: '/my-recipes' } });
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8000/recipe/my-recipes', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserRecipes(response.data);
      } catch (err) {
        console.error('Failed to fetch user recipes:', err.response?.data || err.message);
        setError('Failed to load your recipes. Please try again.');
        if (err.response?.status === 401 || err.response?.status === 403) {
          navigate('/login', { state: { from: '/my-recipes' } });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMyRecipes();
  }, [token, authLoading, navigate]);

  const handleDeleteRecipe = async (recipeId, event) => {
    event.stopPropagation();
    event.preventDefault();

    if (!token) {
      navigate('/login', { state: { from: '/my-recipes' } });
      return;
    }

    if (!window.confirm('Are you sure you want to delete this recipe?')) return;

    try {
      setDeletingIds(prev => ({ ...prev, [recipeId]: true }));
      setError('');

      await axios.delete(`http://localhost:8000/recipe/${recipeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserRecipes(prevRecipes => prevRecipes.filter(recipe => recipe._id !== recipeId));
      alert('Recipe deleted successfully!');
    } catch (err) {
      console.error('Failed to delete recipe:', err.response?.data || err.message);
      setError('Failed to delete recipe. Please try again.');
      if (err.response?.status === 401 || err.response?.status === 403) {
        navigate('/login', { state: { from: '/my-recipes' } });
      } else if (err.response?.status === 404) {
        setError('Recipe not found or already deleted.');
      }
    } finally {
      setDeletingIds(prev => ({ ...prev, [recipeId]: false }));
    }
  };

  

  const formatDateTime = (isoString) => {
    if (!isoString) return 'N/A';
    const date = new Date(isoString);
    return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleString();
  };

  if (authLoading || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-xl text-gray-700">Loading your recipes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8">
      <h1 className="text-4xl font-bold text-center text-purple-800 mb-10">My Recipes</h1>

      {userRecipes.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          You haven't generated any recipes yet. Go to the{' '}
          <Link to="/recipe" className="text-purple-600 hover:underline">
            Recipe Generator
          </Link>{' '}
          to create one!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {userRecipes.map((recipe, index) => {
            const recipeId = recipe._id;

            return (
              <Link
                key={recipeId}
                to={`/my-recipes/${recipeId}`}
                className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between hover:shadow-xl transition-shadow duration-200 cursor-pointer"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-semibold text-purple-700">Recipe {index + 1}</h2>
                    <button
                      onClick={(e) => handleDeleteRecipe(recipeId, e)}
                      disabled={!!deletingIds[recipeId]}
                      className={`ml-4 px-3 py-1 text-white rounded-md text-sm transition-colors duration-200 ${
                        deletingIds[recipeId]
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-red-500 hover:bg-red-600'
                      }`}
                    >
                      {deletingIds[recipeId] ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">
                    Generated on:{' '}
                    <span className="font-medium text-gray-600">{formatDateTime(recipe.generated_at)}</span>
                  </p>
                  <p className="text-gray-700 mb-2">
                    <span className="font-medium">Ingredients:</span> {recipe.input.ingredients}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <span className="font-medium">Cuisine:</span> {recipe.input.cuisine}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <span className="font-medium">Serves:</span> {recipe.input.num_people}
                  </p>
                  <p className="text-gray-700 mb-4">
                    <span className="font-medium">Language:</span> {recipe.input.language}
                  </p>
                </div>
                <div className="mt-4 text-sm text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap">
                  {recipe.generated_recipe.substring(0, 100)}...
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyRecipePage;