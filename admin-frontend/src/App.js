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
import LecturersPage from "./features/lecturers";
import LecturerForm from "./features/lecturers/form";
import CoursesPage from "./features/courses";
import CourseForm from "./features/courses/form";

import Notification from './components/notification'

import EnrollmentOption from "./features/enrollments";
import EnrollmentForm from "./features/enrollments/form";
import EnrollmentPage from "./features/enrollments/enrollmentsPage";
import EnrollmentBulk from "./features/enrollments/form/enrollmentBulk";




function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Notification />
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
            <Route path="/lecturers" element={<LecturersPage/>} />
            <Route path="/lecturers/:id" element={<LecturerForm />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:id" element={<CourseForm />} />
            <Route path="/enrollment" element={<EnrollmentOption />} />
            <Route path="/enrollment/view" element={<EnrollmentPage />} />
            <Route path="/enrollment/new" element={<EnrollmentForm />} />
            <Route path="/enrollment/bulk" element={<EnrollmentBulk />} />
          </Routes>
        </Container>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

