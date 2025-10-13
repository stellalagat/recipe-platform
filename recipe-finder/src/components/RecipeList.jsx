import React from "react";
import RecipeCard from "./RecipeCard";

export default function RecipeList({ recipes }) {
  if (!recipes || recipes.length === 0) {
    return <p className="text-center text-slate-500">No recipes found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {recipes.map(r => (
        <RecipeCard key={r.idMeal} recipe={r} />
      ))}
    </div>
  );
}
