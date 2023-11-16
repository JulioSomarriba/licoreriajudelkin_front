import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Card, Row, Col, Form, Modal, FloatingLabel  } from 'react-bootstrap';
import Header from '../components/Header';
import { FaPencil, FaTrashCan } from 'react-icons/fa6';

function CategoriaList() {
  const [Categoria, setCategoria] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategoria, setSelectedCategoria] = useState({});
  const [formData, setFormData] = useState({
    nombre: '',
  });

  // Función para abrir el modal y pasar los datos del docente seleccionado
  const openModal = (categoria) => {
    setSelectedCategoria(categoria);

    setFormData({
      nombre: categoria.nombre,
    });
    setShowModal(true);
  };


  // Función para manejar cambios en el formulario
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const loadCategoria = () => {
    fetch('http://localhost:5000/crud/readcategoria')
      .then((response) => response.json())
      .then((data) => setCategoria(data))
      .catch((error) => console.error('Error al obtener categorias:', error));
  };


  // Función para enviar el formulario de actualización
  const handleUpdate = () => {
    // Realiza la solicitud PUT al servidor para actualizar el registro
    fetch(`http://localhost:5000/crud/updatecategoria/${selectedCategoria.idcategoria}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          // La actualización fue exitosa, puedes cerrar el modal y refrescar la lista de docentes
          setShowModal(false);
          loadCategoria(); // Cargar la lista de docentes actualizada
        }
      })
      .catch((error) => console.error('Error al actualizar el registro:', error));
  };

  // Función para eliminar un docente
  const handleDelete = (idcategoria) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar esta categoria?');
    if (confirmation) {
      // Realiza la solicitud DELETE al servidor para eliminar el docente
      fetch(`http://localhost:5000/crud/deletecategoria/${idcategoria}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            // La eliminación fue exitosa, refresca la lista de docentes
            loadCategoria();
          }
        })
        .catch((error) => console.error('Error al eliminar la marca:', error));
    }
  };

  // Realiza una solicitud GET al servidor para obtener los docentes
  useEffect(() => {
    fetch('http://localhost:5000/crud/readcategoria')
      .then((response) => response.json())
      .then((data) => setCategoria(data))
      .catch((error) => console.error('Error al obtener la categoria:', error));
  }, []);

  return (
    <div>
      <Header />

      <Card className="margen-contenedor">
        <Card.Body>
          <Card.Title className="mb-3">Lista de categoria</Card.Title>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombres</th>
              </tr>
            </thead>
            <tbody>
              {Categoria.map((categoria) => (
                <tr key={categoria.idcategoria}>
                  <td>{categoria.idcategoria}</td>
                  <td>{categoria.nombre}</td>
                  <td>
                    <Button variant="primary" className='margin-button' onClick={() => openModal(categoria)}><FaPencil /></Button>
                    <Button variant="danger" className='margin-button' onClick={() => handleDelete(categoria.idcategoria)}><FaTrashCan /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Categoria</Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <Card className="mt-3">
                <Card.Body>
                    <Card.Title>actualización de categoria</Card.Title>
                    <Form className="mt-3">
                        <Row className="g-3">

                            <Col sm="6" md="6" lg="6">
                                <FloatingLabel controlId="nombre" label="Nombre">
                                    <Form.Control
                                    type="text"
                                    placeholder="Ingrese el nombre dela Marca"
                                    value={formData.nombre}
                                    name="nombre"
                                    onChange={handleFormChange}
                                    />
                                </FloatingLabel>
                            </Col>

                        </Row>
                    </Form>
                </Card.Body>
            </Card>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Actualizar
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default CategoriaList;