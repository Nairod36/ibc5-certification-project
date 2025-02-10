import { useEffect, useState } from "react";
import { Container, Table, Spinner, Alert, Button } from "react-bootstrap";
import { useReadContract } from "wagmi";
import { config, contracts } from "../../config/wagmi.config";
import { useNavigate } from "react-router-dom";
import { getStudentById } from "../../services/bdd.service";

export const CertificateList = () => {
  const navigate = useNavigate();
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { data, isLoading, isError } = useReadContract({
    address: contracts.NFTFactory.address,
    abi: contracts.NFTFactory.abi,
    functionName: "getAllCertificates",
  });

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    } else if (isError) {
      setError("Erreur lors de la récupération des certificats.");
      setLoading(false);
    } else if (data) {
      setCertificates(data);
      setLoading(false);
    }
  }, [data, isLoading, isError]);

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Liste des Certificats</h2>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" /> Chargement des certificats...
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && certificates.length === 0 && (
        <Alert variant="warning">Aucun certificat trouvé.</Alert>
      )}

      {!loading && certificates.length > 0 && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Token ID</th>
              <th>Étudiant</th>
              <th>Année</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {certificates.map((cert, index) => (
              <tr key={index}>
                <td>{cert.tokenId.toString()}</td>
                <td>{getStudentById(cert.studentId).fullname}</td>
                <td>{cert.year}</td>
                <td>
                  <Button
                    variant="primary"
                    href={cert.ipfsCID}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Voir sur IPFS
                  </Button>

                  <Button
                    variant="info"
                    onClick={() => navigate(`/update-program/${cert.tokenId}`)}
                  >
                    Modifier
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default CertificateList;
