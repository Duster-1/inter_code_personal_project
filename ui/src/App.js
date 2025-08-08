import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import RecipesPage from './pages/RecipesPage'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header onSearch={(query) => console.log('Searching:', query)} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<RecipesPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;


