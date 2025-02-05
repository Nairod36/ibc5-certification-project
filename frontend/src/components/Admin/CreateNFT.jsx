import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

function CreateNFT() {
  const [studentId, setStudentId] = useState('');
  const [program, setProgram] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Appel à votre service blockchain pour créer le NFT
    alert(`Création du NFT pour l'étudiant ${studentId} avec le programme ${program}`);
    // Réinitialiser le formulaire
    setStudentId('');
    setProgram('');
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Créer NFT</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formStudentId">
            <Form.Label>ID Étudiant</Form.Label>
            <Form.Control
              type="text"
              placeholder="Entrez l'ID de l'étudiant"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formProgram">
            <Form.Label>Programme</Form.Label>
            <Form.Control
              type="text"
              placeholder="Entrez le programme"
              value={program}
              onChange={(e) => setProgram(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Créer NFT
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default CreateNFT;
