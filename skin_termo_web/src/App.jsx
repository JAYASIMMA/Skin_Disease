import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import PatientDashboard from './pages/Patient/Dashboard';
import DoctorDashboard from './pages/Doctor/Dashboard';
import DoctorOnboarding from './pages/Doctor/DoctorOnboarding';
import AdminDashboard from './pages/Admin/Dashboard';
import LandingPage from './pages/Landing/LandingPage';
import Features from './pages/Landing/Features';
import Intelligence from './pages/Landing/Intelligence';
import Network from './pages/Landing/Network';
import Portal from './pages/Landing/Portal';
import Models from './pages/Landing/Models';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/features" element={<Features />} />
        <Route path="/intelligence" element={<Intelligence />} />
        <Route path="/network" element={<Network />} />
        <Route path="/portal" element={<Portal />} />
        <Route path="/models" element={<Models />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/patient/*" element={<PatientDashboard />} />
        <Route path="/doctor/onboarding" element={<DoctorOnboarding />} />
        <Route path="/doctor/*" element={<DoctorDashboard />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
