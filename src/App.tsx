import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import DetailsCharacter from "./pages/DetailsCharacter";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters/:id" element={<DetailsCharacter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
