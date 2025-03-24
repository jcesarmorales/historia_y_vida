import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function AlertDismissible() {
  const navigate = useNavigate();

  return (
    <>
      <Alert variant="danger">
        <Alert.Heading>ERROR INICIO DE SESIÓN</Alert.Heading>
        <p>
          Para poder ingresar a los servicios debe iniciar sesión.
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => navigate('/login')} variant="outline-success">
            Login
          </Button>
        </div>
      </Alert>
    </>
  );
}

export default AlertDismissible;
