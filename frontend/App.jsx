import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProgressProvider } from "./context/ProgressContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Reg from "./pages/Reg";
import Landing from "./pages/Landing";
import SleepPage from "./pages/SleepPage";
import Stress from "./pages/Stress";
import Mind from "./pages/Mind";
import ChatPage from "./pages/ChatPage";
import ProgressTracker from "./pages/ProgressTracker";
import Header from "./components/Header";
import GenericPageLayout from "./components/GenericPageLayout";

function App() {
  return (
    <AuthProvider>
      <ProgressProvider>
        <Routes>
         
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Reg />} />
          <Route path="/header" element={<Header />} />

          <Route element={<GenericPageLayout />}>
            
            <Route 
    path="/landing" 
    element={
      <ProtectedRoute>
        <Landing/>
      </ProtectedRoute>
    } 
  />
    <Route 
    path="/sleep" 
    element={
      <ProtectedRoute>
        <SleepPage />
      </ProtectedRoute>
    } 
  />
            <Route path="/sleep" element={<SleepPage />} />
            <Route path="/stress" element={<Stress />} />
            <Route path="/mind" element={<Mind />} />
           
               <Route path="/chat" element={<ChatPage />} />
            <Route path="/progresstracker" element={<ProgressTracker />} />
          </Route>
        </Routes>
      </ProgressProvider>
    </AuthProvider>
  );
}

export default App;


