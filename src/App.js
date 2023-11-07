import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Cliente from './pages/Cliente';
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
import Estadisticas from './pages/Estadisticas';
import Galeria from './pages/Galeria';




function App() {

 const [userRol, setUserRol] = useState('');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login rol={userRol} setRol={setUserRol} />} />
        <Route path="/home" element={<Home rol={userRol} />} />
        <Route path= "/About" element={<About rol={userRol} />} />
        <Route path= "/cliente" element={<Cliente rol={userRol} />} />
        <Route path= "/producto" element={<Producto rol={userRol} />} />
        <Route path= "/productolist" element={<Productolist rol={userRol} />} />
        <Route path= "/ClienteList" element={<CLienteList rol={userRol} />} />
        <Route path= "/Empleado" element={<Empleado rol={userRol} />} />
        <Route path= "/EmpleadoList" element={<EmpleadoList rol={userRol} />} />
        <Route path= "/Categoria" element={<Categoria rol={userRol} />} />
        <Route path= "/CategoriaList" element={<CategoriaList rol={userRol} />} />
        <Route path= "/Detalleventa" element={<Detalleventa rol={userRol} />} />
        <Route path= "/DetalleventaList" element={<DetalleventaList rol={userRol} />} />
        <Route path= "/Venta" element={<Venta rol={userRol} />} />
        <Route path= "/VentaList" element={<VentaList rol={userRol} />} />
        <Route path= "/Estadisticas" element={<Estadisticas rol={userRol} />} />
        <Route path="/galeria" element={<Galeria rol={userRol} />} />
      </Routes>
    </Router>

    
  );

  
}

export default App;

