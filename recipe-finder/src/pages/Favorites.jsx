import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(stored);
  }, []);

  function clearFavorites() {
    localStorage.removeItem("favorites");
    setFavorites([]);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Favorites</h1>
        <button onClick={clearFavorites} className="text-sm text-rose-600">Clear all</button>
      </div>

      {favorites.length === 0 ? (
        <p className="text-slate-500">No favorites yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {favorites.map(r => <RecipeCard key={r.idMeal} recipe={r} />)}
        </div>
      )}
    </div>
  );
}
