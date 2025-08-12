import React from 'react';

export default function RecipeCard({ recipe, ref }) {
  return (
    <div ref={ref}>
      {recipe.imageUrl && (
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          style={{ width: '100%', maxWidth: '400px', height: 'auto' }}
        />
      )}
      <h3>{recipe.title}</h3>
    </div>
  );
}
