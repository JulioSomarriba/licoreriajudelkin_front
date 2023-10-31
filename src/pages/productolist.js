import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Row, Col, Form, Modal, FloatingLabel  } from 'react-bootstrap';
import Header from '../components/Header';

function Productolist() {
  const [productos, setProductos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState({});
  const [formData, setFormData] = useState({
    nombre: '',
    existencia: '',
    precio: '',
    descripcion: '',
    porcentaje_alcohol: '',
  });

  // Crear busqueda

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  

  const filteredCategoria = productos.filter((producto) => {
    // Convierte los valores de los campos a minúsculas para realizar una búsqueda insensible a mayúsculas y minúsculas
    const idproducto = producto.idproducto;
    const nombre = producto.nombre.toLowerCase(); 
    const existencia = producto.existencia;
    const precio = producto.precio;
    const descripcion = producto.descripcion.toLowerCase();
    const porcentaje_alcohol = producto.porcentaje_alcohol;
    const idcategoria = producto.idcategoria;
    const search = searchQuery.toLowerCase();
    
  
    // Verifica si la cadena de búsqueda se encuentra en algún campo
    return (
      idproducto === (search) ||
      nombre.includes(search) ||
      existencia === (search) ||
      precio === (search) ||
      descripcion.includes(search) ||
      porcentaje_alcohol === (search) ||
      idcategoria === (search)
      
    );
  });

  // Función para abrir el modal y pasar los datos del docente seleccionado
  const openModal = (producto) => {
    setSelectedProducto(producto);

    setFormData({
      nombre: producto.nombre,
      existencia: producto.existencia,
      precio: producto.precio,
      descripcion: producto.descripcion,
      porcentaje_alcohol: producto.porcentaje_alcohol,
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

  const loadProducto = () => {
    fetch('http://localhost:5000/crud/readproducto')
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error('Error al obtener productos:', error));
  };


  // Función para enviar el formulario de actualización
  const handleUpdate = () => {
    // Realiza la solicitud PUT al servidor para actualizar el registro
    fetch(`http://localhost:5000/crud/updateproducto/${selectedProducto.idproducto}`, {
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
          loadProducto(); // Cargar la lista de docentes actualizada
        }
      })
      .catch((error) => console.error('Error al actualizar el registro:', error));
  };

  // Función para eliminar un docente
  const handleDelete = (idproducto) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar este producto?');
    if (confirmation) {
      // Realiza la solicitud DELETE al servidor para eliminar el docente
      fetch(`http://localhost:5000/crud/deleteproducto/${idproducto}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            // La eliminación fue exitosa, refresca la lista de docentes
            loadProducto();
          }
        })
        .catch((error) => console.error('Error al eliminar el producto:', error));
    }
  };

  // Realiza una solicitud GET al servidor para obtener los docentes
  useEffect(() => {
    fetch('http://localhost:5000/crud/readproducto')
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error('Error al obtener los productos:', error));
  }, []);

  return (
    <div>
      <Header />

      <Card className="m-3">
        <Card.Body>
          <Card.Title className="mb-3">Listado de Productos</Card.Title>
          <Row className="mb-3">
            <Col sm="6" md="6" lg="4">
              <FloatingLabel controlId="search" label="Buscar">
                <Form.Control
                  type="text"
                  placeholder="Buscar"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Table striped bordered hover>


            <thead>
              <tr>
                <th>ID</th>
                <th>Nombres</th>
                <th>Existencia</th>
                <th>Precio</th>
                <th>Descripcion</th>
                <th>Porcentaje de alcohol</th>
                <th>IDCategoria</th>
              </tr>
            </thead>
            <tbody>
            {filteredCategoria.map((producto) => (
                <tr key={producto.idproducto}>
                  <td>{producto.idproducto}</td>
                  <td>{producto.nombre}</td>
                  <td>{producto.existencia}</td>
                  <td>{producto.precio}</td>
                  <td>{producto.descripcion}</td>
                  <td>{producto.porcentaje_alcohol}</td>
                  <td>{producto.idcategoria}</td>
                  <td>
                    <Button variant="primary" onClick={() => openModal(producto)}>Actualizar</Button>
                    <Button variant="danger" onClick={() => handleDelete(producto.idproducto)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Productos</Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <Card className="mt-3">
                <Card.Body>
                    <Card.Title>actualización de Productos</Card.Title>
                    <Form className="mt-3">
                        <Row className="g-3">

                            <Col sm="6" md="6" lg="6">
                                <FloatingLabel controlId="nombre" label="Nombre">
                                    <Form.Control
                                    type="text"
                                    placeholder="Ingrese el nombre del producto"
                                    value={formData.nombre}
                                    name="nombre"
                                    onChange={handleFormChange}
                                    />
                                </FloatingLabel>
                            </Col>

                            <Col sm="6" md="6" lg="6">
                                <FloatingLabel controlId="existencia" label="Cantidad">
                                    <Form.Control
                                    type="number"
                                    placeholder="Ingrese la existencia"
                                    value={formData.existencia}
                                    name="existencia"
                                    onChange={handleFormChange}
                                    />
                                </FloatingLabel>
                            </Col>

                            <Col sm="12" md="6" lg="6">
                                <FloatingLabel controlId="precio" label="Precio">
                                    <Form.Control 
                                    type="number" 
                                    placeholder="Ingrese el precio"
                                    value={formData.precio}
                                    name="precio"
                                    onChange={handleFormChange}
                                    />
                                </FloatingLabel>
                            </Col>

                            <Col sm="12" md="12" lg="6">
                                <FloatingLabel controlId="porcentaje_alcohol" label="Porcentaje de alcohol">
                                    <Form.Control 
                                    type="number" 
                                    placeholder="Ingrese el porcentaje de alcohol" 
                                    value={formData.porcentaje_alcohol}
                                    name="porcentaje_alcohol"
                                    onChange={handleFormChange}
                                    />
                                </FloatingLabel>
                            </Col>

                            <Col sm="12" md="6" lg="12">
                                <FloatingLabel controlId="descripcion" label="Descripciòn">
                                    <Form.Control 
                                    type="text" 
                                    placeholder="Ingrese la descripcion"
                                    value={formData.descripcion}
                                    name="descripcion"
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

export default Productolist;