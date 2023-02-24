import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BatchesPage from "./features/batches";
import BatcheForm from "./features/batches/form";
import StaffsPage from "./features/staffs";
import StaffForm from "./features/staffs/form";
import Header from "./features/header";
import Footer from "./features/footer";

import Profile from "./features/profile";
import BranchForm from "./components/branch/BranchForm";
import BranchesPage from "./features/branches";
import BranchFormx from "./features/branches/form";
import Container from '@mui/material/Container';
import StudentsPage from "./features/students";
import StudentForm from "./features/students/form";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Container fixed sx={{minHeight:'75vh',pt:2,pb:2}}>
          <Routes>
            <Route path="/batches" element={<BatchesPage />} />
            <Route path="/batches/:id" element={<BatcheForm />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/staffs" element={<StaffsPage />} />
            <Route path="/staffs/:id" element={<StaffForm />} />
            <Route path="/branches" element={<BranchesPage />} />
            <Route path="/branchesx/:id" element={<BranchFormx />} />
            <Route path="/branch/:id" element={<BranchForm />} />
            <Route path="/students" element={<StudentsPage />} />
            <Route path="/students/:id" element={<StudentForm />} />
          </Routes>
        </Container>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

