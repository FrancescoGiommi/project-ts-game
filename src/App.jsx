import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Componenti
import Navbar from "./components/Navbar";

// Pagine
import HomePage from "./pages/HomePage";
import PlayerNamePage from "./pages/PlayerNamePage";
import PlayerImage from "./pages/PlayerImage";
import FloorPage from "./pages/FloorPage";
import PathDetail from "./pages/PathDetail";

import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          <Route element={<HomePage />} path="/" />
          <Route element={<PlayerNamePage />} path="/playerName" />
          <Route element={<PlayerImage />} path="/playerImg" />
          <Route element={<FloorPage />} path="/floor" />
          <Route element={<PathDetail />} path="/floor/:id" />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
