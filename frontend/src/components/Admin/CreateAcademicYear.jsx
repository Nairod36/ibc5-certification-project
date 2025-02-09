import { useState } from "react";
import { Container, Form, Button, Row, Col, Card, ListGroup, Alert, Spinner } from "react-bootstrap";
import { pinata } from "../../config/pinata.config";
import { v4 as uuidv4 } from 'uuid';

export const CreateAcademicYear = () => {
  const [formData, setFormData] = useState({
    year: "",
    studentId: "",
    studentName: "",
    courses: [],
    yearStartDate: "",
    yearEndDate: "",
    academicStatus: {
      status: "",
      comments: "",
    },
    ipfsCID: "",
    issuer: "ESGI",
    signer: "",
  });

  const [courseEntry, setCourseEntry] = useState({
    courseName: "",
    grade: "",
    result: "",
    comments: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStatusChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      academicStatus: { ...formData.academicStatus, [name]: value },
    });
  };

  const handleCourseChange = (e) => {
    const { name, value } = e.target;
    setCourseEntry({ ...courseEntry, [name]: value });
  };

  const addCourse = () => {
    setFormData({
      ...formData,
      courses: [...formData.courses, courseEntry],
    });
    setCourseEntry({ courseName: "", grade: "", result: "", comments: "" });
  };

  const generateJSONFile = async () => {
    setLoading(true);
    setMessage("");

    try{
        const uniqueId = uuidv4()
        const fileName = `YEAR_${uniqueId}.json`
        const dataStr = JSON.stringify(formData, null, 2);
        const file = new File([dataStr], fileName, { type: "application/json" });
        const upload = await pinata.upload.file(file)
        console.log(upload);
        
        const ipfsUrl = await pinata.gateways.convert(upload.IpfsHash)
        setFormData({ ...formData, ipfsCID: ipfsUrl });
        setMessage(`✅ Année académique créée avec succès ! IPFS CID: ${upload.IpfsHash}`);
    }catch(error){
        console.error("❌ Erreur lors de l'upload sur IPFS :", error);
        setMessage("❌ Erreur lors de la création de l'année académique !");
    }finally{
        setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <Card className="shadow-lg">
        <Card.Body>
          <h2 className="text-center mb-4">Créer une Année Académique</h2>

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
            {/* Informations Générales */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="year">
                  <Form.Label>Année</Form.Label>
                  <Form.Control
                    type="text"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    placeholder="Ex: 3rd Year"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="studentId">
                  <Form.Label>Student ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                    placeholder="xxx"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="studentName">
                  <Form.Label>Nom de l'Étudiant</Form.Label>
                  <Form.Control
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    placeholder="Nom de l'étudiant"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="ipfsCID">
                  <Form.Label>IPFS CID</Form.Label>
                  <Form.Control
                    type="text"
                    name="ipfsCID"
                    value={formData.ipfsCID}
                    onChange={handleChange}
                    placeholder="ipfs://..."
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Dates de l'Année */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="yearStartDate">
                  <Form.Label>Date de Début</Form.Label>
                  <Form.Control
                    type="date"
                    name="yearStartDate"
                    value={formData.yearStartDate}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="yearEndDate">
                  <Form.Label>Date de Fin</Form.Label>
                  <Form.Control
                    type="date"
                    name="yearEndDate"
                    value={formData.yearEndDate}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Statut Académique */}
            <h4 className="mt-4">Statut Académique</h4>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="status">
                  <Form.Label>Statut</Form.Label>
                  <Form.Control
                    type="text"
                    name="status"
                    value={formData.academicStatus.status}
                    onChange={handleStatusChange}
                    placeholder="SUCCESS"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="comments">
                  <Form.Label>Commentaires</Form.Label>
                  <Form.Control
                    type="text"
                    name="comments"
                    value={formData.academicStatus.comments}
                    onChange={handleStatusChange}
                    placeholder="Commentaires académiques"
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Ajout des Cours */}
            <h4 className="mt-4">Ajouter un Cours</h4>
            <Row className="mb-3">
              <Col md={3}>
                <Form.Control
                  type="text"
                  name="courseName"
                  value={courseEntry.courseName}
                  onChange={handleCourseChange}
                  placeholder="Nom du cours"
                />
              </Col>
              <Col md={2}>
                <Form.Control
                  type="text"
                  name="grade"
                  value={courseEntry.grade}
                  onChange={handleCourseChange}
                  placeholder="Grade"
                />
              </Col>
              <Col md={2}>
                <Form.Control
                  type="text"
                  name="result"
                  value={courseEntry.result}
                  onChange={handleCourseChange}
                  placeholder="Résultat"
                />
              </Col>
              <Col md={3}>
                <Form.Control
                  type="text"
                  name="comments"
                  value={courseEntry.comments}
                  onChange={handleCourseChange}
                  placeholder="Commentaires"
                />
              </Col>
              <Col md={2}>
                <Button variant="success" onClick={addCourse}>
                  Ajouter
                </Button>
              </Col>
            </Row>

            {/* Liste des cours ajoutés */}
            <ListGroup className="mb-3">
              {formData.courses.map((course, index) => (
                <ListGroup.Item key={index}>
                  {course.courseName} - {course.grade} ({course.result}) : {course.comments}
                </ListGroup.Item>
              ))}
            </ListGroup>

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
                "Générer et Télécharger JSON"
              )}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
