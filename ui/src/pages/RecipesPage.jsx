import React, { useState, useEffect, useCallback } from 'react';
import Header from '../components/Header/Header';
import api from '../api/axios';

export default function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecipes = useCallback(async (query = '') => {
    try {
      setLoading(true);
      const res = await api.get('/recipes', {
        params: { q: query },
      });
      setRecipes(res.data);
    } catch (err) {
      console.error('Помилка завантаження рецептів', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  return (
    <div>
      <Header onSearch={fetchRecipes} />

      <main>
        {loading && <p>Завантаження...</p>}
        {!loading && recipes.length === 0 && <p>Немає рецептів</p>}

        <div>
          {recipes.map(recipe => (
            <div key={recipe.id}>
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
