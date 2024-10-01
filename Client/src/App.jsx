import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login, SignIn } from "./pages"; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
