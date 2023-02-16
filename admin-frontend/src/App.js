import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BatchesPage from "./features/batches";
import Header from "./features/header";
import Footer from "./features/footer";

import Profile from "./features/profile";
import BranchForm from "./components/branch/BranchForm";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<BatchesPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/branches" element={<BranchForm />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

