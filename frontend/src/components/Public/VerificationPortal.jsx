// src/components/Public/VerificationPortal.jsx
import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';

function VerificationPortal() {
  const [identifier, setIdentifier] = useState('');
  const [result, setResult] = useState(null);

  const handleVerify = (e) => {
    e.preventDefault();
    // Remplacez ce bloc par l'appel à votre service blockchain pour récupérer les données NFT.
    // Par exemple : blockchainService.fetchNFTData(identifier)
    setResult({
      studentId: identifier,
      program: "Master - Ingénierie de la Blockchain",
      status: "ACTIVE",
      ipfsCID: "ipfs://QmExampleCID"
    });
  };

  return (
    <Container className="my-5">
      <h1 className="mb-4 text-center">Portail de Vérification</h1>
      <Form onSubmit={handleVerify}>
        <Form.Group className="mb-3">
          <Form.Label>Identifiant Étudiant ou Token ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrez l'identifiant ou le Token ID"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Vérifier
        </Button>
      </Form>
      
      {result && (
        <Card className="mt-4">
          <Card.Body>
            <Card.Title>Détails du Certificat</Card.Title>
            <Card.Text>
              <strong>ID Étudiant:</strong> {result.studentId} <br />
              <strong>Programme:</strong> {result.program} <br />
              <strong>Status:</strong> {result.status} <br />
              <strong>IPFS CID:</strong> {result.ipfsCID}
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}

export default VerificationPortal;
