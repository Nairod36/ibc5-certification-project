import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <>
      <Row className="justify-content-center">
        <Col md={8} className="text-center">
          <h1 className="mb-4">ESGI Academic Certificates</h1>
          <p className="lead">
            Gérez, vérifiez et émettez facilement des certificats académiques sur la blockchain Avalanche.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Button variant="primary" as={Link} to="/admin">
              Accès Administration
            </Button>
            <Button variant="success" as={Link} to="/verify">
              Vérifier un Certificat
            </Button>
          </div>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Comment ça marche ?</Card.Title>
              <Card.Text>
                Ce portail utilise des <strong>NFT dynamiques</strong> déployés sur un <strong>subnet Avalanche personnalisé</strong>. 
                Vous pouvez créer, mettre à jour ou révoquer des certificats académiques, 
                et le public peut vérifier leur authenticité via une interface sécurisée.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default HomePage;
