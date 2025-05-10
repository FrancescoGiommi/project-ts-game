import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

// Pagine
import HomePage from "./pages/HomePage";
import PlayerNamePage from "./pages/PlayerNamePage";
import Stats from "./pages/PlayerStatsPage";

import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<HomePage />} path="/" />
          <Route element={<PlayerNamePage />} path="/playerName" />
          <Route element={<Stats />} path="/stats" />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
