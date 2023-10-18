import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Cliente from './pages/cliente';
import About from './pages/About';



function App() {
  return (
    <Router>
      <Routes>
        <Route path= "/" element={<Home />} />
        <Route path= "/About" element={<About />} />
        <Route path= "/cliente" element={<Cliente />} />
      </Routes>
    </Router>

    
  );

  
}

export default App;

