import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Cliente from './pages/cliente';
import About from './pages/About';
import Producto from './pages/producto';
import Productolist from './pages/productolist';
import CLienteList from './pages/ClienteList';
import Empleado from './pages/Empleado';
import EmpleadoList from './pages/EmpleadoList';
import Categoria from './pages/Categoria';
import CategoriaList from './pages/CategoriaList';
import Detalleventa from './pages/Detalleventa';
import DetalleventaList from './pages/DetalleventaList';
import Venta from './pages/Venta';
import VentaList from './pages/VentaList';




function App() {
  return (
    <Router>
      <Routes>
        <Route path= "/" element={<Home />} />
        <Route path= "/About" element={<About />} />
        <Route path= "/cliente" element={<Cliente />} />
        <Route path= "/producto" element={<Producto />} />
        <Route path= "/productolist" element={<Productolist />} />
        <Route path= "/ClienteList" element={<CLienteList />} />
        <Route path= "/Empleado" element={<Empleado />} />
        <Route path= "/EmpleadoList" element={<EmpleadoList />} />
        <Route path= "/Categoria" element={<Categoria />} />
        <Route path= "/CategoriaList" element={<CategoriaList />} />
        <Route path= "/Detalleventa" element={<Detalleventa />} />
        <Route path= "/DetalleventaList" element={<DetalleventaList />} />
        <Route path= "/Venta" element={<Venta />} />
        <Route path= "/VentaList" element={<VentaList />} />
      </Routes>
    </Router>

    
  );

  
}

export default App;

