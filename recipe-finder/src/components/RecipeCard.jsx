import React, { useState } from "react";
import RecipeDetails from "./RecipeDetails";

function saveFavorite(recipe) {
  const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
  // avoid duplicates
  if (!stored.some(r => r.idMeal === recipe.idMeal)) {
    stored.push(recipe);
    localStorage.setItem("favorites", JSON.stringify(stored));
  }
}

export default function RecipeCard({ recipe }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded shadow p-3 flex flex-col">
      <img src={recipe.strMealThumb} alt={recipe.strMeal} className="rounded w-full h-44 object-cover" />
      <div className="mt-3 flex-1">
        <h3 className="font-semibold text-lg">{recipe.strMeal}</h3>
        <p className="text-sm text-slate-500">{recipe.strArea ? `${recipe.strArea} • ${recipe.strCategory}` : recipe.strCategory}</p>
      </div>

      <div className="mt-3 flex gap-2">
        <button onClick={() => setOpen(true)} className="flex-1 px-3 py-2 border rounded">View</button>
        <button
          onClick={() => {
            saveFavorite(recipe);
            alert("Saved to favorites!");
          }}
          className="px-3 py-2 bg-rose-500 text-white rounded"
        >
          Save
        </button>
      </div>

      {open && <RecipeDetails recipe={recipe} onClose={() => setOpen(false)} />}
    </div>
  );
}
