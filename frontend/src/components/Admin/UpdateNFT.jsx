import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

function UpdateNFT() {
  const [tokenId, setTokenId] = useState('');
  const [newData, setNewData] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Appel à votre service blockchain pour mettre à jour le NFT
    alert(`Mise à jour du NFT ${tokenId} avec les nouvelles données: ${newData}`);
    // Réinitialiser le formulaire
    setTokenId('');
    setNewData('');
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Mettre à jour NFT</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formTokenId">
            <Form.Label>Token ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Entrez le Token ID"
              value={tokenId}
              onChange={(e) => setTokenId(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formNewData">
            <Form.Label>Nouvelle Information</Form.Label>
            <Form.Control
              type="text"
              placeholder="Entrez la nouvelle information"
              value={newData}
              onChange={(e) => setNewData(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Mettre à jour NFT
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default UpdateNFT;
