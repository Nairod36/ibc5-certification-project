import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';

function NFTList() {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    // Simulation d'un appel au service blockchain pour récupérer la liste des NFTs.
    // Remplacez par votre appel réel.
    const fetchedNFTs = [
      { tokenId: '001', studentId: 'ESGI-0001', program: 'Master Blockchain' },
      { tokenId: '002', studentId: 'ESGI-0002', program: 'Bachelor IT' },
      { tokenId: '003', studentId: 'ESGI-0003', program: 'Master Blockchain' },
    ];
    setNfts(fetchedNFTs);
  }, []);

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Liste des NFTs</Card.Title>
        <ListGroup variant="flush">
          {nfts.map((nft) => (
            <ListGroup.Item key={nft.tokenId}>
              <strong>Token ID:</strong> {nft.tokenId} - <strong>ID Étudiant:</strong> {nft.studentId} - <strong>Programme:</strong> {nft.program}
              <Button variant="link" href={`/nft/${nft.tokenId}`}>
                Voir détails
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default NFTList;
