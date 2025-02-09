import { useState } from "react";
import { Container, Form, Button, Row, Col, Card, Alert, Spinner } from "react-bootstrap";
import { pinata } from "../../config/pinata.config";
import { v4 as uuidv4 } from 'uuid';
import { useWriteNftFactoryCreateCertificate } from "../../generated";

export const CreateProgram = () => {
  const [formData, setFormData] = useState({
    studentId: "",
    Program: "",
    tokenId: "",
    year: "",
    AcademicProgress: [],
    programStatus: {
      status: "ACTIVE",
      certificateIssuedDate: "",
      comments: "",
    },
    ipfsCID: "",
    issuer: "ESGI",
    signer: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const generateJSONFile = async () => {
    setLoading(true);
    setMessage("");

    try {
      const uniqueId = uuidv4();
      const fileName = `PGM_${uniqueId}.json`;
      const dataStr = JSON.stringify(formData, null, 2);
      const file = new File([dataStr], fileName, { type: "application/json" });

      // Upload du fichier JSON sur IPFS via Pinata
      const upload = await pinata.upload.file(file);
      const ipfsUrl = await pinata.gateways.convert(upload.IpfsHash);

      setFormData({ ...formData, ipfsCID: ipfsUrl });
      setMessage(`Programme créé avec succès ! IPFS CID: ${upload.IpfsHash}`);

    } catch (error) {
      console.error("Erreur lors de l'upload sur IPFS :", error);
      setMessage("Erreur lors de la création du programme !");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <Card className="shadow-lg">
        <Card.Body>
          <h2 className="text-center mb-4">Créer un Programme</h2>

          {/* Message d'alerte */}
          {message && (
            <Alert variant={message.includes("Erreur") ? "danger" : "success"}>
              {message}
              {message.includes("IPFS CID") && (
                <div>
                  <a href={`https://gateway.pinata.cloud/ipfs/${formData.ipfsCID.replace("ipfs://", "")}`} target="_blank" rel="noopener noreferrer">
                    Voir sur IPFS
                  </a>
                </div>
              )}
            </Alert>
          )}

          <Form>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="studentId">
                  <Form.Label>Student ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                    placeholder="ESGI issued student Id"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="Program">
                  <Form.Label>Program</Form.Label>
                  <Form.Control
                    type="text"
                    name="Program"
                    value={formData.Program}
                    onChange={handleChange}
                    placeholder="Ex: Master - Ingénierie Blockchain"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="tokenId">
                  <Form.Label>Token ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="tokenId"
                    value={formData.tokenId}
                    onChange={handleChange}
                    placeholder="32"
                  />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group controlId="year">
                  <Form.Label>Year</Form.Label>
                  <Form.Control
                    type="text"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    placeholder="2022 - 2025"
                  />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group controlId="ipfsCID">
                  <Form.Label>IPFS CID</Form.Label>
                  <Form.Control
                    type="text"
                    name="ipfsCID"
                    value={formData.ipfsCID}
                    onChange={handleChange}
                    placeholder="ipfs://..."
                    disabled
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="signer">
                  <Form.Label>Signer Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="signer"
                    value={formData.signer}
                    onChange={handleChange}
                    placeholder="0xInstitutionSignedData"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="issuer">
                  <Form.Label>Issuer</Form.Label>
                  <Form.Control
                    type="text"
                    name="issuer"
                    value={formData.issuer}
                    placeholder="ESGI"
                    disabled
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Bouton Générer */}
            <Button
              variant="primary"
              className="w-100 mt-3"
              onClick={generateJSONFile}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" /> Génération...
                </>
              ) : (
                "Générer"
              )}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
