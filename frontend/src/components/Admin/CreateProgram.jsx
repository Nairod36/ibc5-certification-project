import { useState } from "react";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Card,
  Alert,
  Spinner,
} from "react-bootstrap";
import { pinata } from "../../config/pinata.config";
import { v4 as uuidv4 } from "uuid";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { contracts } from "../../config/wagmi.config";
import { getStudents } from "../../services/bdd.service";

const studentList = getStudents();

export const CreateProgram = () => {
  const { address } = useAccount();

  const { data: hash, isPending, writeContract } = useWriteContract();

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

      const metadata = {
        name: `${formData.Program} - ${formData.studentId}`,
        description: `Academic program for student ${formData.studentId}, covering the years ${formData.year}.`,
        external_url: `https://esgi.school/student/${formData.studentId}`,
        student_id: formData.studentId,
        year: formData.year,
        attributes: [
          { trait_type: "Student ID", value: formData.studentId },
          { trait_type: "Year", value: formData.year },
          { trait_type: "Program Status", value: "ACTIVE" },
          // { trait_type: "Certificate Issued Date", value: Date.now() / 1000, display_type: "date" },
        ],
        academic_progress: formData.AcademicProgress.map((entry) => ({
          year: entry.year,
          nftId: entry.nftId,
          address: entry.ipfsCid,
        })),
        program_status: formData.programStatus,
        issuer: "ESGI",
        signer: address,
      };

      const dataStr = JSON.stringify(metadata, null, 2);
      const file = new File([dataStr], fileName, { type: "application/json" });
      const upload = await pinata.upload.file(file);
      const ipfsUrl = await pinata.gateways.convert(upload.IpfsHash);

      writeContract({
        address: contracts.NFTFactory.address,
        abi: contracts.NFTFactory.abi,
        functionName: "createCertificate",
        args: [formData.studentId, ipfsUrl, formData.year],
      });

      setFormData({ ...formData, ipfsCID: ipfsUrl });
      setMessage(`Programme créé avec succès ! IPFS CID: ${upload.IpfsHash}`);
    } catch (error) {
      console.error("Erreur lors de l'upload sur IPFS :", error);
      setMessage("Erreur lors de la création du programme !");
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
          <h2 className="text-center mb-4">Créer un Programme</h2>

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
            <Row className="mb-3">
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
            </Row>

            {/* Bouton Générer */}
            <Button
              variant="primary"
              className="w-100 mt-3"
              onClick={generateJSONFile}
              disabled={loading || isPending || !address}
            >
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" /> Génération...
                </>
              ) : isPending ? (
                <>
                  <Spinner animation="border" size="sm" /> Confirmation...
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
