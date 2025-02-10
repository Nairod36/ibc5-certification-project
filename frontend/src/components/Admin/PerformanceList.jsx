import { useEffect, useState } from "react";
import { Container, Table, Spinner, Alert, Button } from "react-bootstrap";
import { useReadContract } from "wagmi";
import { contracts } from "../../config/wagmi.config";
import { getStudentById } from "../../services/bdd.service";

export const PerformanceList = () => {
  const [performances, setPerformances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { data, isLoading, isError } = useReadContract({
    address: contracts.NFTFactory.address,
    abi: contracts.NFTFactory.abi,
    functionName: "getAllPerformances",
  });

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    } else if (isError) {
      setError("Erreur lors de la récupération des performances.");
      setLoading(false);
    } else if (data) {
      setPerformances(data);
      setLoading(false);
    }
  }, [data, isLoading, isError]);

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Liste des Performances Annuelles</h2>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" /> Chargement des performances...
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && performances.length === 0 && (
        <Alert variant="warning">Aucune performance trouvée.</Alert>
      )}

      {!loading && performances.length > 0 && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Token ID</th>
              <th>Étudiant</th>
              <th>Année</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {performances.map((perf, index) => (
              <tr key={index}>
                <td>{perf.tokenId.toString()}</td>
                <td>{getStudentById(perf.studentId).fullname}</td>
                <td>{perf.year}</td>
                <td>
                  <Button
                    variant="primary"
                    href={perf.ipfsCID}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Voir sur IPFS
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

export default PerformanceList;
