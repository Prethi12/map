import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Report from "./pages/Report";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Report />} />
      </Routes>
    </Router>
  );
};

export default App;
