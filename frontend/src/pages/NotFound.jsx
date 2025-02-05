import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="text-center my-5">
      <h1>404 - Page non trouvée</h1>
      <p>La page que vous recherchez n'existe pas.</p>
      <Button variant="primary" as={Link} to="/">
        Retour à l'accueil
      </Button>
    </div>
  );
}

export default NotFound;
