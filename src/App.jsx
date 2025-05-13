import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

// Pagine
import HomePage from "./pages/HomePage";
import PlayerNamePage from "./pages/PlayerNamePage";
import Stats from "./pages/PlayerStatsPage";
import FloorPage from "./pages/FloorPage";

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
          <Route element={<FloorPage />} path="/floor" />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
