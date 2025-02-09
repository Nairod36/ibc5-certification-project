import { useState } from "react";
import { Container, Form, Button, Row, Col, Card, ListGroup, Alert } from "react-bootstrap";
import { pinata } from "../../config/pinata.config";

export const UpdateProgram = () => {
  const [programCID, setProgramCID] = useState("");
  const [programData, setProgramData] = useState(null);
  const [yearCID, setYearCID] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Charger le programme depuis IPFS
  const fetchProgramFromIPFS = async () => {
    if (!programCID) return;

    try {
      setLoading(true);
      setMessage("");

      const response = await pinata.gateways.get(programCID)
      console.log(response);
      
      setProgramData(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setMessage("Erreur lors de la récupération du programme !");
      console.error(error);
    }
  };

  // Ajouter une nouvelle année académique au programme
  const addYearToProgram = async () => {
    if (!yearCID || !programData) return;

    try {
      setLoading(true);
      setMessage("");

      // Récupérer l'année depuis IPFS
      const response = await pinata.gateways.get(yearCID)
      const newYear = response.data;

      // Construire la nouvelle entrée pour Academic Progress
      const newEntry = {
        studentId: newYear.studentId,
        year: newYear.year,
        nftId: Date.now().toString(), // Génération d'un ID unique basé sur le timestamp
        ipfsCid: `ipfs://${yearCID}`,
      };

      // Ajouter l'année au programme
      const updatedProgram = {
        ...programData,
        AcademicProgress: [...programData.AcademicProgress, newEntry],
      };

      // Convertir en fichier JSON et uploader sur IPFS
      const dataStr = JSON.stringify(updatedProgram, null, 2);
      const file = new File([dataStr], `PGM_${Date.now()}.json`, { type: "application/json" });
      const upload = await pinata.upload.file(file);
      const newProgramCID = await pinata.gateways.convert(upload.IpfsHash);
      const unpin = await pinata.unpin([programCID])
      setProgramCID(newProgramCID)

      setProgramData(updatedProgram);
      setLoading(false);
      setMessage(`Programme mis à jour ! Nouveau CID : ${newProgramCID}`);
    } catch (error) {
      setLoading(false);
      setMessage("Erreur lors de l'ajout de l'année !");
      console.error(error);
    }
  };

  return (
    <Container className="mt-4">
      <Card className="shadow-lg">
        <Card.Body>
          <h2 className="text-center mb-4">Mettre à Jour un Programme</h2>

          {/* Formulaire pour récupérer le programme */}
          <Form>
            <Row className="mb-3">
              <Col md={8}>
                <Form.Group controlId="programCID">
                  <Form.Label>IPFS CID du Programme</Form.Label>
                  <Form.Control
                    type="text"
                    value={programCID}
                    onChange={(e) => setProgramCID(e.target.value)}
                    placeholder="Entrez l'IPFS CID du programme"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Button variant="primary" className="w-100 mt-4" onClick={fetchProgramFromIPFS}>
                  Charger Programme
                </Button>
              </Col>
            </Row>
          </Form>

          {/* Affichage du programme récupéré */}
          {programData && (
            <>
              <h4 className="mt-4">Informations du Programme</h4>
              <ListGroup className="mb-3">
                <ListGroup.Item><strong>Étudiant ID :</strong> {programData.studentId}</ListGroup.Item>
                <ListGroup.Item><strong>Programme :</strong> {programData.Program}</ListGroup.Item>
                <ListGroup.Item><strong>Années :</strong> {programData.year}</ListGroup.Item>
              </ListGroup>

              {/* Affichage des années académiques existantes */}
              <h4 className="mt-4">Progression Académique</h4>
              <ListGroup className="mb-3">
                {programData.AcademicProgress.map((entry, index) => (
                  <ListGroup.Item key={index}>
                    📚 {entry.year} - {entry.studentId} (<a href={`https://gateway.pinata.cloud/ipfs/${entry.ipfsCid.replace("ipfs://", "")}`} target="_blank" rel="noopener noreferrer">Voir NFT</a>)
                  </ListGroup.Item>
                ))}
              </ListGroup>

              {/* Formulaire pour ajouter une nouvelle année */}
              <h4 className="mt-4">Ajouter une Année</h4>
              <Row className="mb-3">
                <Col md={8}>
                  <Form.Group controlId="yearCID">
                    <Form.Label>IPFS CID de l'Année</Form.Label>
                    <Form.Control
                      type="text"
                      value={yearCID}
                      onChange={(e) => setYearCID(e.target.value)}
                      placeholder="Entrez l'IPFS CID de l'année académique"
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Button variant="success" className="w-100 mt-4" onClick={addYearToProgram}>
                    Ajouter Année
                  </Button>
                </Col>
              </Row>
            </>
          )}

          {/* Message de retour */}
          {message && (
            <Alert variant="info" className="mt-3">
              {message}
            </Alert>
          )}

          {loading && <p className="text-center mt-3">⏳ Chargement...</p>}
        </Card.Body>
      </Card>
    </Container>
  );
};
