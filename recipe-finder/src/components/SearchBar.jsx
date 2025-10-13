import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex gap-2">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="flex-1 border rounded px-3 py-2"
          placeholder="Search by name or ingredient (e.g. chicken or curry)"
        />
        <button
          onClick={() => onSearch({ type: "name", query })}
          className="px-4 py-2 bg-indigo-600 text-white rounded"
        >
          Search Name
        </button>
        <button
          onClick={() => onSearch({ type: "ingredient", query })}
          className="px-4 py-2 border rounded"
        >
          Search Ingredient
        </button>
        <button
          onClick={() => onSearch({ type: "random" })}
          className="px-4 py-2 bg-amber-400 rounded"
        >
          Random
        </button>
      </div>
    </div>
  );
}
