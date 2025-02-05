import React from 'react';
import { Card } from 'react-bootstrap';

function AboutPage() {
  return (
    <Card className="my-5">
      <Card.Body>
        <Card.Title>À propos de ESGI Certificates</Card.Title>
        <Card.Text>
          ESGI Certificates est une solution décentralisée basée sur la blockchain Avalanche. 
          Elle permet de gérer, émettre et vérifier des certificats académiques via des NFT dynamiques. 
          Cette plateforme vise à garantir la transparence et la sécurité des diplômes et performances académiques.
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default AboutPage;
