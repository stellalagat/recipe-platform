import React from "react";

function getIngredients(recipe) {
  const items = [];
  for (let i = 1; i <= 20; i++) {
    const ing = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ing && ing.trim()) items.push(`${ing}${measure ? ` — ${measure}` : ""}`);
  }
  return items;
}

export default function RecipeDetails({ recipe, onClose }) {
  const ingredients = getIngredients(recipe);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="bg-black/40 absolute inset-0" onClick={onClose} />
      <div className="relative bg-white rounded shadow-lg max-w-2xl w-full z-10 p-4 overflow-auto max-h-[90vh]">
        <button onClick={onClose} className="absolute top-3 right-3 text-slate-600">Close</button>
        <div className="flex gap-4">
          <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-48 h-48 object-cover rounded" />
          <div>
            <h2 className="text-2xl font-bold">{recipe.strMeal}</h2>
            <p className="text-sm text-slate-600">{recipe.strArea} • {recipe.strCategory}</p>
            <div className="mt-3">
              <h3 className="font-semibold">Ingredients</h3>
              <ul className="list-disc list-inside">
                {ingredients.map((it, idx) => <li key={idx}>{it}</li>)}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold">Instructions</h3>
          <p className="whitespace-pre-line">{recipe.strInstructions}</p>
        </div>

        {recipe.strYoutube && (
          <div className="mt-4">
            <h3 className="font-semibold">Video</h3>
            <a href={recipe.strYoutube} target="_blank" rel="noreferrer" className="text-indigo-600">
              Watch on YouTube
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
