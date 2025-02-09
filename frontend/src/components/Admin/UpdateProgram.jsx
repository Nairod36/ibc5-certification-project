import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
} from "react-bootstrap";
import { pinata } from "../../config/pinata.config";
import {
  useWaitForTransactionReceipt,
  useReadContract,
  useWriteContract,
} from "wagmi";
import { config, contracts } from "../../config/wagmi.config";
import { readContract } from "@wagmi/core";

export const UpdateProgram = () => {
  const { certificateId } = useParams();

  const {
    data: hash,
    isPending: isPendingW,
    writeContract,
  } = useWriteContract();

  const {
    data: uri,
    error,
    isLoading,
  } = useReadContract({
    address: contracts.NFTFactory.address,
    abi: contracts.NFTFactory.abi,
    functionName: "getCertificateMetadata",
    args: [certificateId],
  });

  const [programData, setProgramData] = useState(null);
  const [availableYears, setAvailableYears] = useState([]); // Liste des années académiques du même studentId
  const [selectedYear, setSelectedYear] = useState(""); // Année académique sélectionnée
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Charger les métadonnées du programme via IPFS dès que l'URI est récupérée
  useEffect(() => {
    const fetchProgramFromIPFS = async () => {
      if (!uri) return;
      try {
        setLoading(true);
        const response = await pinata.gateways.get(uri);
        setProgramData(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setMessage("Erreur lors de la récupération du programme !");
        console.error(error);
      }
    };
    fetchProgramFromIPFS();
  }, [uri]);

  // Charger les années académiques associées au `studentId` du programme
  useEffect(() => {
    const fetchAcademicYears = async () => {
      if (!programData || !programData.student_id) return;

      try {
        setLoading(true);
        // Récupérer le nombre total de performances
        let result = await readContract(config, {
          address: contracts.NFTFactory.address,
          abi: contracts.NFTFactory.abi,
          functionName: "getPerformancesCount",
        });

        const totalPerformances = result;

        let yearList = [];

        for (let i = 0; i < totalPerformances; i++) {
          // Récupérer l'URI des métadonnées de la performance
          result = await readContract(config, {
            address: contracts.NFTFactory.address,
            abi: contracts.NFTFactory.abi,
            functionName: "getPerformanceInfos",
            args: [i],
          });
          console.log(result);

          const yearMetadataURI = result.ipfsCID;

          const yearMetadata = await pinata.gateways.get(yearMetadataURI);

          console.log(yearMetadata);

          if (yearMetadata.data.studentId === programData.studentId) {
            yearList.push({
              year: yearMetadata.data.year,
              ipfsCid: yearMetadataURI,
              nftId: i,
            });
          }
        }

        setAvailableYears(yearList);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setMessage("Erreur lors du chargement des années académiques !");
        console.error(error);
      }
    };

    fetchAcademicYears();
  }, [programData]);

  // Ajouter une nouvelle année académique au programme
  const addYearToProgram = async () => {
    if (!selectedYear || !programData) return;

    try {
      setLoading(true);
      setMessage("");

      const newYear = availableYears.find(
        (y) => y.nftId.toString() === selectedYear
      );
      if (!newYear) {
        setLoading(false);
        return setMessage("❌ Erreur : Année sélectionnée non valide.");
      }

      // Construire la nouvelle entrée pour `academic_progress`
      const newEntry = {
        year: newYear.year,
        nftId: newYear.nftId.toString(),
        address: "0x1123",
      };

      // Ajouter l'année au programme
      const updatedProgram = {
        ...programData,
        academic_progress: [...programData.academic_progress, newEntry],
      };

      // Uploader le nouveau programme sur IPFS
      const dataStr = JSON.stringify(updatedProgram, null, 2);
      const file = new File([dataStr], `PGM_${Date.now()}.json`, {
        type: "application/json",
      });
      const upload = await pinata.upload.file(file);
      const newProgramURI = await pinata.gateways.convert(upload.IpfsHash);

      // Mettre à jour le contrat sur la blockchain
      writeContract({
        address: contracts.NFTFactory.address,
        abi: contracts.NFTFactory.abi,
        functionName: "updateCertificate",
        args: [certificateId, newProgramURI],
      });

      setProgramData(updatedProgram);
      setLoading(false);
      setMessage(`✅ Programme mis à jour ! Nouveau CID : ${newProgramURI}`);
    } catch (error) {
      setLoading(false);
      setMessage("❌ Erreur lors de l'ajout de l'année !");
      console.error(error);
    }
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  return (
    <Container className="mt-4">
      <Card className="shadow-lg">
        <Card.Body>
          <h2 className="text-center mb-4">Mettre à Jour un Programme</h2>

          {message && (
            <Alert variant={message.includes("Erreur") ? "danger" : "success"}>
              {message}
              {hash && <div>Transaction Hash: {hash}</div>}
              {isConfirming && <div>Waiting for confirmation...</div>}
              {isConfirmed && <div>Transaction confirmed.</div>}
            </Alert>
          )}

          {loading && (
            <div className="text-center">
              <Spinner animation="border" /> Chargement du programme...
            </div>
          )}

          {programData && (
            <>
              <h4 className="mt-4">Informations du Programme</h4>
              <ListGroup className="mb-3">
                <ListGroup.Item>
                  <strong>Étudiant ID :</strong> {programData.student_id}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Programme :</strong> {programData.name}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Années :</strong> {programData.year}
                </ListGroup.Item>
              </ListGroup>

              <h4 className="mt-4">Progression Académique</h4>
              <ListGroup className="mb-3">
                {programData.academic_progress.map((entry, index) => (
                  <ListGroup.Item key={index}>
                    📚 {entry.year} - NFT ID: {entry.nftId} - Adresse:{" "}
                    {entry.address}
                  </ListGroup.Item>
                ))}
              </ListGroup>

              <h4 className="mt-4">Ajouter une Année</h4>
              <Row className="mb-3">
                <Col md={8}>
                  <Form.Group controlId="yearCID">
                    <Form.Label>Sélectionner une année</Form.Label>
                    <Form.Control
                      as="select"
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                    >
                      <option value="">
                        -- Choisir une année académique --
                      </option>
                      {availableYears.map((year) => (
                        <option key={year.nftId} value={year.nftId}>
                          {year.year} (NFT ID: {year.nftId})
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Button
                    variant="success"
                    className="w-100 mt-4"
                    onClick={addYearToProgram}
                  >
                    Ajouter Année
                  </Button>
                </Col>
              </Row>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UpdateProgram;
