import React, { useState, useEffect, useCallback, useRef } from 'react';
import Header from '../components/Header/Header';
import RecipeList from '../components/RecipeList/RecipeList';
import api from '../api/axios';

export default function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [query, setQuery] = useState('');

  const observer = useRef();

  const fetchRecipes = useCallback(async (search, pageNum) => {
    try {
      setLoading(true);
      const res = await api.get('/recipes', {
        params: { q: search, page: pageNum, limit: 10 },
      });
  
      if (pageNum === 1) {
        setRecipes(res.data.data);
      } else {
        setRecipes(prev => [...prev, ...res.data.data]);
      }
  
      console.log('hasMore', res.data.hasMore);
      setHasMore(res.data.hasMore);
    } catch (err) {
      console.error('Помилка завантаження рецептів', err);
    } finally {
      setLoading(false);
    }
  }, []);
  

  const handleSearch = (search) => {
    setQuery(search);
    setPage(1)
  };

  useEffect(() => {
    fetchRecipes(query, page);
  }, [query, page, fetchRecipes]);

  const lastRecipeRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      console.log(entries)
      if (entries[0].isIntersecting && hasMore) {
        setPage(prev => prev + 1);
      }
    });

    if (node && hasMore) observer.current.observe(node);
  }, [loading]);

  return (
    <div>
      <Header onSearch={handleSearch} />

      <main>
        <RecipeList recipes={recipes} lastRecipeRef={lastRecipeRef} />
        {loading && <p>Завантаження...</p>}
        {!loading && recipes.length === 0 && <p>Немає рецептів</p>}
      </main>
    </div>
  );
}
