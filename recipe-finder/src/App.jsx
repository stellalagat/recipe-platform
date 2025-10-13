import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link to="/" className="text-xl font-bold">Recipe Finder</Link>
            <nav>
              <Link to="/favorites" className="mr-4">Favorites</Link>
            </nav>
          </div>
        </header>

        <main className="max-w-4xl mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
