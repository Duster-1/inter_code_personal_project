// components/Header/Header.jsx
import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import RecipeModal from '../RecipeModal/RecipeModal';
import api from '../../api/axios'

const Header = ({ onSearch }) => {
  const { user, logout } = useContext(AuthContext);
  const [query, setQuery] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      onSearch(query);
    }, 300);
    return () => clearTimeout(delay);
  }, [query]);

  const handleSaveRecipe = async (recipeData) => {
    try {
      console.log('Sending recipe data:', recipeData);
      await api.post('/recipes', recipeData);
      setModalOpen(false);
    } catch (err) {
      console.error('Failed to save recipe:', err);
    }
  };
  
  

  return (
    <header className="header">
      <Link to="/">Home</Link>

      <input
        type="text"
        placeholder="Search recipes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {user ? (
        <>
          <button onClick={() => setModalOpen(true)}>Додати рецепт</button>
          <span>Hi, {user.username}</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}

      <RecipeModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveRecipe}
      />
    </header>
  );
};

export default Header;
