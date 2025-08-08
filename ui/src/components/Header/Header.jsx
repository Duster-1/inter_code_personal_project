import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Header = ({ onSearch }) => {
  const { user, logout } = useContext(AuthContext);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const delay = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => clearTimeout(delay);
  }, [query, onSearch]);

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
          <button>Додати рецепт</button>
          <span>Hi, {user.username}</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </header>
  );
};

export default Header;
