import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";

import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="container text-center">
          <Routes>
            <Route element={<HomePage />} path="/" />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
