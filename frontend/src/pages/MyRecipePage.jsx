// src/pages/MyRecipesPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const MyRecipePage = () => {
  const { token, userEmail } = useAuth();
  const navigate = useNavigate();
  const [userRecipes, setUserRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false); // New state for delete loading

  useEffect(() => {
    const fetchMyRecipes = async () => {
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
  }, [token, navigate]);

  // --- NEW FUNCTION FOR DELETING RECIPE ---
  const handleDeleteRecipe = async (recipeId, event) => {
    event.stopPropagation(); // Prevent Link from triggering when clicking delete button
    event.preventDefault(); // Prevent default link behavior

    if (!token) {
      navigate('/login', { state: { from: '/my-recipes' } });
      return;
    }

    // Optional: Add a confirmation dialog
    if (!window.confirm('Are you sure you want to delete this recipe? This action cannot be undone.')) {
      return; // User cancelled the deletion
    }

    try {
      setDeleting(true); // Set deleting state to true
      setError(''); // Clear any previous errors

      await axios.delete(`http://localhost:8000/recipe/${recipeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // If successful, remove the recipe from the local state
      setUserRecipes(prevRecipes => prevRecipes.filter(recipe => recipe._id !== recipeId && recipe._id !== recipeId));
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
      setDeleting(false); // Reset deleting state
    }
  };
  // --- END NEW FUNCTION ---

  const formatDateTime = (isoString) => {
    if (!isoString) return 'N/A';
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return 'Invalid Date';
    return date.toLocaleString();
  };

  if (loading) {
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
          You haven't generated any recipes yet. Go to the <Link to="/recipe" className="text-purple-600 hover:underline">Recipe Generator</Link> to create one!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {userRecipes.map((recipe, index) => {
            const recipeIdentifier = recipe._id || recipe._id;

            return (
              <Link
                key={recipeIdentifier || index}
                to={`/my-recipes/${recipeIdentifier}`}
                className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between hover:shadow-xl transition-shadow duration-200 cursor-pointer"
              >
                <div>
                  <div className="flex justify-between items-start mb-2"> {/* New flex container */}
                    <h2 className="text-xl font-semibold text-purple-700">Recipe {index + 1}</h2>
                    {/* --- NEW DELETE BUTTON --- */}
                    <button
                      onClick={(e) => handleDeleteRecipe(recipeIdentifier, e)}
                      disabled={deleting} // Disable button during deletion
                      className="ml-4 px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 transition-colors duration-200"
                    >
                      {deleting ? 'Deleting...' : 'Delete'}
                    </button>
                    {/* --- END NEW DELETE BUTTON --- */}
                  </div>
                  <p className="text-sm text-gray-500 mb-4">
                    Generated on: <span className="font-medium text-gray-600">{formatDateTime(recipe.generated_at)}</span>
                  </p>
                  <p className="text-gray-700 mb-2">
                    <span className="font-medium">Ingredients:</span> {recipe.input.ingredients}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <span className="font-medium">Cuisine:</span> {recipe.input.cuisine}
                  </p>
                  <p className="text-gray-700 mb-4">
                    <span className="font-medium">Serves:</span> {recipe.input.num_people}
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