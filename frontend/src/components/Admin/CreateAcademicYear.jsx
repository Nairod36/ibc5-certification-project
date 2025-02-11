import { useState } from "react";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Card,
  ListGroup,
  Alert,
  Spinner,
  FormGroup,
} from "react-bootstrap";
import { pinata } from "../../config/pinata.config";
import { v4 as uuidv4 } from "uuid";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { config, contracts } from "../../config/wagmi.config";
import {
  getCourses,
  getStudents,
  getStudentById,
  getGrades,
} from "../../services/bdd.service";

const courseList = getCourses();
const studentList = getStudents();
const gradeList = getGrades();

export const CreateAcademicYear = () => {
  const { address } = useAccount();

  const { data: hash, isPending, writeContract } = useWriteContract();

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
    if (name == "studentId")
      setFormData({
        ...formData,
        ["studentName"]: getStudentById(value).fullname,
        [name]: value,
      });
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

    try {
      const uniqueId = uuidv4();
      const fileName = `YEAR_${uniqueId}.json`;
      const metadata = {
        name: `${formData.year} Performance - ${formData.studentName}`,
        description: `Academic performance record for the ${formData.year} of student ${formData.studentName} at ESGI.`,
        external_url: `https://esgi.school/student/${formData.studentId}`,
        student_id: formData.studentId,
        year: formData.year,
        attributes: [
          { trait_type: "Year", value: formData.year },
          { trait_type: "Student ID", value: formData.studentId },
          { trait_type: "Student Name", value: formData.studentName },
          {
            trait_type: "Academic Status",
            value: formData.academicStatus.status,
          },
          {
            trait_type: "Year Start Date",
            value: new Date(formData.yearStartDate).getTime() / 1000,
            display_type: "date",
          },
          {
            trait_type: "Year End Date",
            value: new Date(formData.yearEndDate).getTime() / 1000,
            display_type: "date",
          },
          ...formData.courses.map((course) => ({
            trait_type: course.courseName,
            value: course.result,
            max_value: 20,
            display_type: "number",
          })),
        ],
        courses: formData.courses,
        academic_status: formData.academicStatus,
        issuer: formData.issuer,
        signer: address,
      };
      const dataStr = JSON.stringify(metadata, null, 2);
      const file = new File([dataStr], fileName, { type: "application/json" });
      const upload = await pinata.upload.file(file);

      const ipfsUrl = await pinata.gateways.convert(upload.IpfsHash);

      writeContract({
        address: contracts.NFTFactory.address,
        abi: contracts.NFTFactory.abi,
        functionName: "createPerformance",
        args: [formData.studentId, ipfsUrl, formData.year],
        chainId: 43112,
      });

      setFormData({ ...formData, ipfsCID: ipfsUrl });
      setMessage(
        `✅ Année académique créée avec succès ! IPFS CID: ${upload.IpfsHash}`
      );
    } catch (error) {
      console.error("❌ Erreur lors de l'upload sur IPFS :", error);
      setMessage("❌ Erreur lors de la création de l'année académique !");
    } finally {
      setLoading(false);
    }
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

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
                  <a
                    href={`https://gateway.pinata.cloud/ipfs/${formData.ipfsCID.replace(
                      "ipfs://",
                      ""
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Voir sur IPFS
                  </a>
                </div>
              )}
              {hash && <div>Transaction Hash: {hash}</div>}
              {isConfirming && <div>Waiting for confirmation...</div>}
              {isConfirmed && <div>Transaction confirmed.</div>}
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
                  <Form.Select
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                  >
                    <option value="">Sélectionnez un étudiant</option>
                    {studentList.map((student) => (
                      <option key={student.studentId} value={student.studentId}>
                        {student.studentId}
                      </option>
                    ))}
                  </Form.Select>
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
                    disabled={true}
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
                <Form.Group controlId="courseName">
                  <Form.Label>Nom du Cours</Form.Label>
                  <Form.Select
                    name="courseName"
                    value={courseEntry.courseName}
                    onChange={handleCourseChange}
                  >
                    <option value="">Sélectionnez un cours</option>
                    {courseList.map((course) => (
                      <option key={course.courseId} value={course.name}>
                        {course.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group controlId="grade">
                  <Form.Label>Grade</Form.Label>
                  <Form.Select
                    name="grade"
                    value={courseEntry.grade}
                    onChange={handleCourseChange}
                  >
                    <option value="">Sélectionnez une note</option>
                    {gradeList.map((grade) => (
                      <option key={grade.gradeId} value={grade.value}>
                        {grade.value}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={2}>
                <FormGroup controlId="result">
                  <Form.Label>Résultat</Form.Label>
                  <Form.Control
                    type="number"
                    name="result"
                    max={20}
                    min={0}
                    value={courseEntry.result}
                    onChange={handleCourseChange}
                    placeholder="Résultat"
                  />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Form.Label>Commentaire</Form.Label>
                  <Form.Control
                    type="text"
                    name="comments"
                    value={courseEntry.comments}
                    onChange={handleCourseChange}
                    placeholder="Commentaires"
                  />
                </FormGroup>
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
                  {course.courseName} - {course.grade} ({course.result}) :{" "}
                  {course.comments}
                </ListGroup.Item>
              ))}
            </ListGroup>

            {/* Bouton Générer */}
            <Button
              variant="primary"
              className="w-100 mt-3"
              onClick={generateJSONFile}
              disabled={loading || !address}
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
