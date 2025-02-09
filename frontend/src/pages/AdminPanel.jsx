import React, { useState } from 'react';
import { Container, Tabs, Tab } from 'react-bootstrap';
import CreateNFT from '../components/Admin/CreateNFT';
import UpdateNFT from '../components/Admin/UpdateNFT';
import RevokeNFT from '../components/Admin/RevokeNFT';
import NFTList from '../components/Admin/NFTList';
import { CreateProgram } from '../components/Admin/CreateProgram';
import { CreateAcademicYear } from '../components/Admin/CreateAcademicYear';
import { UpdateProgram } from '../components/Admin/UpdateProgram';

function AdminPanel() {
  const [key, setKey] = useState('create');

  return (
    <Container className="my-5">
      <h1 className="mb-4 text-center">Panneau d'administration</h1>
      <Tabs id="admin-tabs" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
        {/* <Tab eventKey="create" title="Créer NFT">
          <CreateNFT />
        </Tab> */}
        <Tab eventKey="createProgram" title="Créer un programme">
          <CreateProgram />
        </Tab>
        <Tab eventKey="updateProgram" title="Modifier un programme">
          <UpdateProgram />
        </Tab>
        <Tab eventKey="createYear" title="Créer une année">
          <CreateAcademicYear />
        </Tab>
        {/* <Tab eventKey="update" title="Mettre à jour NFT">
          <UpdateNFT />
        </Tab> */}
        <Tab eventKey="revoke" title="Révoquer NFT">
          <RevokeNFT />
        </Tab>
        <Tab eventKey="list" title="Liste des NFTs">
          <NFTList />
        </Tab>
      </Tabs>
    </Container>
  );
}

export default AdminPanel;
