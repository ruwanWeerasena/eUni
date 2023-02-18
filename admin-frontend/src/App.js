import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BatchesPage from "./features/batches";
import StaffsPage from "./features/staffs";
import StaffForm from "./features/staffs/form";
import Header from "./features/header";
import Footer from "./features/footer";

import Profile from "./features/profile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/batches" element={<BatchesPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/staffs" element={<StaffsPage />} />
          <Route path="/staffs/:id" element={<StaffForm />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

