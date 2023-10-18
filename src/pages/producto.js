import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';

function producto() {

  // Crear un estado para cada campo del formulario
  const [nombre, setnombre] = useState('');
  const [cantidad, setcantidad] = useState('');
  const [precio, setprecio] = useState('');
  const [descripcion, setdescripcion] = useState('');
  const [porcentaje_alcohol, setporcentaje_alcohol] = useState('');

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un objeto con los datos del formulario
    const formData = {
      nombre,
      cantidad,
      precio,
      descripcion,
      porcentaje_alcohol,
    };

    try {
      // Realizar una solicitud HTTP al backend para enviar los datos
      const response = await fetch('http://localhost:5000/crud/createproducto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // El registro se creó exitosamente
        alert('Registro exitoso');
        // Reiniciar los campos del formulario
        setnombre('');
        setcantidad('');
        setprecio('');
        setdescripcion('');
        setporcentaje_alcohol('');
      } else {
        alert('Error al registrar el producto');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error en la solicitud al servidor');
    }
  };

  return(
    <div>
      <Header />
      
      <Container>
        <Card className="mt-3">
          <Card.Body>
            <Card.Title>Registro de producto</Card.Title>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row className="g-3">

                <Col sm="6" md="6" lg="4">
                  <FloatingLabel controlId="nombre" label="nombre">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese los nombres de los producto"
                      value={nombre}
                      onChange={(e) => setnombre(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="4">
                  <FloatingLabel controlId="cantidad" label="cantidad">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese la cantidad"
                      value={cantidad}
                      onChange={(e) => setcantidad(e.target.value)}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="4">
                  <FloatingLabel controlId="precio" label="precio">
                    <Form.Control 
                      type="date" 
                      placeholder="Seleccione el precio"
                      value={precio}
                      onChange={(e) => setprecio(e.target.value)} 
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="8">
                  <FloatingLabel controlId="porcentaje_alcohol" label="porcentaje_alcohol">
                    <Form.Control 
                      type="text" 
                      placeholder="Ingrese el porcentaje"
                      value={porcentaje_alcohol}
                      onChange={(e) => setporcentaje_alcohol(e.target.value)} 
                    />
                  </FloatingLabel>
                </Col>

              </Row>
              <div className="center-button">
                <Button variant="primary" type="submit" className="mt-3" size="lg">
                  Registrar
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>

    </div>
  );
}

export default producto;