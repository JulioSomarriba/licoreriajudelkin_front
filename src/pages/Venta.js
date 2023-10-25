import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';

function Venta() {

  // Crear un estado para cada campo del formulario
  const [fecha, setFecha] = useState('');
  const [tipo_de_venta, setTipo_de_venta] = useState('');
 
  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un objeto con los datos del formulario
    const formData = {
      fecha,
      tipo_de_venta,
    };

    try {
      // Realizar una solicitud HTTP al backend para enviar los datos
      const response = await fetch('http://localhost:5000/crud/createventa', {
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
        setFecha('');
        setTipo_de_venta('');
      } else {
        alert('Error al registrar la venta');
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
            <Card.Title>Registro de Venta</Card.Title>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row className="g-3">

                <Col sm="12" md="6" lg="4">
                  <FloatingLabel controlId="fecha" label="Fecha de venta">
                    <Form.Control 
                      type="date" 
                      placeholder="Seleccione dela venta"
                      value={fecha}
                      onChange={(e) => setFecha(e.target.value)} 
                    />
                  </FloatingLabel>
                </Col>
 
                <Col sm="12" md="6" lg="4">
                  <FloatingLabel controlId="tipo_de_venta" label="Tipo de venta">
                    <Form.Select 
                      aria-label="Tipo de venta"
                      value={tipo_de_venta}
                      onChange={(e) => setTipo_de_venta(e.target.value)}
                    >
                      <option>Seleccione el tipo de venta</option>
                      <option value="Linea">Linea</option>
                      <option value="Presencial">Presencial</option>
                    </Form.Select>
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

export default Venta;