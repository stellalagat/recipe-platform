import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import RecipeList from "../components/RecipeList";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  // search by name or ingredient
  async function handleSearch({ type, query }) {
    // type: "name" or "ingredient" or "random"
    setLoading(true);
    try {
      let url;
      if (type === "name") {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`;
      } else if (type === "ingredient") {
        // filter by ingredient gives only id and name + thumbnail; we can then fetch details if needed
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(query)}`;
      } else if (type === "random") {
        url = `https://www.themealdb.com/api/json/v1/1/random.php`;
      }

      const res = await fetch(url);
      const data = await res.json();

      // If filter by ingredient, response structure is meals: [{idMeal,...}] - to make consistent we can fetch details for a few
      if (type === "ingredient" && data.meals) {
        // fetch details for up to first 10 to avoid too many calls
        const limited = data.meals.slice(0, 10);
        const detailed = await Promise.all(
          limited.map(m =>
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${m.idMeal}`)
              .then(r => r.json())
              .then(d => d.meals ? d.meals[0] : null)
          )
        );
        setRecipes(detailed.filter(Boolean));
      } else if (data.meals) {
        setRecipes(data.meals);
      } else {
        setRecipes([]);
      }
    } catch (err) {
      console.error(err);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <div className="mt-6">
        {loading ? (
          <p>Loading…</p>
        ) : (
          <RecipeList recipes={recipes} />
        )}
      </div>
    </div>
  );
}
