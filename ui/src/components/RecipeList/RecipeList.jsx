import React from 'react';
import RecipeCard from '../RecipeCard/RecipeCard';

export default function RecipeList({ recipes, lastRecipeRef }) {
  return (
    <div>
      {recipes.map((recipe, index) => {
        if (recipes.length === index + 1) {
          return <RecipeCard key={recipe.id} ref={lastRecipeRef} recipe={recipe} />
        } else {
          return <RecipeCard key={recipe.id} recipe={recipe} />;
        }
      })}
    </div>
  );
}
