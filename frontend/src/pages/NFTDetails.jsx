import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Spinner } from 'react-bootstrap';
import { fetchNFTDetails } from '../services/blockchainService'; // À implémenter

function NFTDetails() {
  const { tokenId } = useParams();
  const [nft, setNft] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getNFT() {
      try {
        const data = await fetchNFTDetails(tokenId);
        setNft(data);
      } catch (error) {
        console.error("Erreur lors de la récupération du NFT", error);
      }
      setLoading(false);
    }
    getNFT();
  }, [tokenId]);

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (!nft) {
    return <p className="text-center my-5">NFT non trouvé.</p>;
  }

  return (
    <Card className="my-5">
      <Card.Body>
        <Card.Title>Détails du NFT {tokenId}</Card.Title>
        <Card.Text>
          <strong>ID Étudiant:</strong> {nft.studentId} <br />
          <strong>Programme:</strong> {nft.program} <br />
          <strong>Status:</strong> {nft.status} <br />
          <strong>IPFS CID:</strong> {nft.ipfsCID}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default NFTDetails;
