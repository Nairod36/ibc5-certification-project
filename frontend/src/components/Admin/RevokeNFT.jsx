import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

function RevokeNFT() {
  const [tokenId, setTokenId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Appel à votre service blockchain pour révoquer le NFT
    alert(`Révocation du NFT ${tokenId}`);
    // Réinitialiser le formulaire
    setTokenId('');
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Révoquer NFT</Card.Title>
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
          <Button variant="danger" type="submit">
            Révoquer NFT
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default RevokeNFT;
