import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import {AuthProvider} from './context/AuthContext';
import Navbar from "./components/Navbar";
import PrivateRouter from './components/PrivateRoute';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Books from "./pages/Books";
import BookDetail from "./pages/BookDetail";
import './App.css';

const App = () => {
  return(
    <Router>
      <AuthProvider>
        <div className="app">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/books" element={<PrivateRoute><Books /></PrivateRoute>} />
              <Route path="/books/:id" element={<PrivateRoute><BooksDetail /></PrivateRoute>} />
              {}
            </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
} ;

export default App;