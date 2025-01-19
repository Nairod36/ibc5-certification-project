# IBC-5 Certification Project 🚀

Bienvenue dans le dépôt du projet **IBC-5 Certification** ! Ce repo met en place une architecture **Foundry** (pour la partie smart contracts) et **React** (pour le frontend), ainsi qu'un dossier dédié à la configuration Avalanche Subnet et un dossier pour les métadonnées NFT.

---
  
## Table des matières 📖
1. [Structure du projet](#structure-du-projet)
2. [Pré-requis](#pré-requis)
3. [Installation et Configuration](#installation-et-configuration)
   - [1. Cloner le projet](#1-cloner-le-projet)
   - [2. Installer Foundry](#2-installer-foundry)
   - [3. Initialiser la partie Foundry](#3-initialiser-la-partie-foundry)
   - [4. Initialiser la partie Frontend (React)](#4-initialiser-la-partie-frontend-react)
   - [5. Démarrer le Subnet Avalanche (exemple)](#5-démarrer-le-subnet-avalanche-exemple)
4. [Utilisation](#utilisation)
   - [A. Build & Test des contrats (Foundry)](#a-build--test-des-contrats-foundry)
   - [B. Scripts de déploiement (Foundry)](#b-scripts-de-déploiement-foundry)
   - [C. Lancement du Frontend](#c-lancement-du-frontend)
5. [Arborescence finale](#arborescence-finale)
6. [Fichiers importants](#fichiers-importants)
7. [Ressources et Documentation](#ressources-et-documentation)

---

## Structure du projet 🏗

L’objectif est d’obtenir une arborescence proche de la suivante :

ibc5-certification-project/
├── avalanche/
│   ├── config/
│   ├── scripts/
│   └── README.md
├── foundry.toml
├── lib/
├── metadata/
│   ├── examples/
│   └── ipfs/
├── script/
│   ├── Deploy.s.sol
│   ├── UpdateNFT.s.sol
│   └── RevokeNFT.s.sol
├── src/
│   ├── MyProgramNFT.sol
│   ├── MyYearNFT.sol
│   └── NFTFactory.sol
├── test/
│   ├── MyProgramNFT.t.sol
│   └── MyYearNFT.t.sol
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── admin/
│   │   │   └── AdminPanel.jsx
│   │   └── public/
│   │       └── VerificationPortal.jsx
│   ├── package.json
│   └── README.md
├── .env.example
├── .gitignore
└── README.md

- **avalanche/** : Configurer et lancer votre **Subnet** personnalisé (Avalanche).
- **foundry.toml** : Fichier de configuration Foundry.
- **metadata/** : Stocker vos exemples de métadonnées NFT et scripts d’upload IPFS.
- **script/** : Scripts Foundry (en Solidity ou TS) pour le déploiement et l’interaction.
- **src/** : Vos contrats Solidity (MyProgramNFT, MyYearNFT, etc.).
- **test/** : Tests Foundry pour valider la logique de vos smart contracts.
- **frontend/** : Application React (panel d’admin + portail de vérification).

---

## Pré-requis ⚙️

- **Node.js** (version 14+ recommandée)
- **npm** ou **yarn**
- **Foundry** (forge, cast) : [Documentation Foundry](https://book.getfoundry.sh/)
- **Git**
- **Avalanche CLI** (optionnel) pour gérer le subnet, ou un client `avalanchego` local

---

## Installation et Configuration 🔧

### 1. Cloner le projet

Si vous partez d’un dépôt Git existant :

```bash
git clone <URL_DU_REPO> ibc5-certification-project
cd ibc5-certification-project

(Si vous créez un nouveau projet, vous pouvez simplement créer un dossier vide, l’initialiser avec git init, puis suivre la suite.)

2. Installer Foundry

Si vous n’avez pas encore Foundry :

curl -L https://foundry.paradigm.xyz | bash
foundryup

Vérifiez l’installation :

forge --version

3. Initialiser la partie Foundry
	1.	Initialisation (si pas déjà fait) :

forge init .

Cela crée les dossiers src/, script/, test/, lib/ et un fichier foundry.toml.

	2.	Installation des dépendances (ex. OpenZeppelin, etc.) :

forge install OpenZeppelin/openzeppelin-contracts



4. Initialiser la partie Frontend (React)
	1.	Créer l’application React :

npx create-react-app frontend


	2.	Organisation interne :
	•	Dans frontend/src/, créez par exemple :

mkdir admin
mkdir public
touch admin/AdminPanel.jsx
touch public/VerificationPortal.jsx


	•	Vous pouvez configurer un .env dans frontend/ pour gérer l’URL RPC du subnet, l’adresse de vos contrats, etc.

5. Démarrer le Subnet Avalanche (exemple)

Dans le dossier avalanche/, vous pouvez avoir :
	•	config/ : fichiers JSON/YAML de configuration du subnet.
	•	scripts/ : scripts Shell ou Node pour lancer le subnet local via avalanchego ou avalanche-cli.

Exemple de script minimal deploy_subnet.sh :

#!/bin/bash

echo "=== Déploiement local du subnet ESGI ==="
# Utiliser avalanche-cli ou avalanchego
# avalanche subnet create esgiSubnet
# avalanche subnet deploy esgiSubnet
# etc.

(À adapter selon votre configuration réelle.)

Utilisation 🌐

A. Build & Test des contrats (Foundry)

Assurez-vous d’être à la racine du projet (où se trouve foundry.toml).
	1.	Compilation :

forge build


	2.	Tests :

forge test

Vous pouvez cibler un test précis :

forge test --match-test testCreationNFT



B. Scripts de déploiement (Foundry)

Dans script/, vous trouverez (par exemple) Deploy.s.sol, UpdateNFT.s.sol, etc.
Pour exécuter un script :

forge script script/Deploy.s.sol \
  --rpc-url http://127.0.0.1:9650/ext/bc/<SUBNET_ID>/rpc \
  --private-key <YOUR_PRIVATE_KEY> \
  --broadcast

(Le flag --broadcast exécute réellement les transactions après la simulation.)

C. Lancement du Frontend
	1.	Rendez-vous dans le dossier frontend/ :

cd frontend


	2.	Installez les dépendances (si nécessaire) :

npm install


	3.	Démarrez l’application React :

npm start



L’application sera disponible sur http://localhost:3000.

Arborescence finale 📂

Une fois tout configuré, vous devriez avoir :

ibc5-certification-project/
├── avalanche/
│   ├── config/
│   │   └── subnet-config.json
│   ├── scripts/
│   │   └── deploy_subnet.sh
│   └── README.md
├── foundry.toml
├── lib/
├── metadata/
│   ├── examples/
│   │   ├── program-nft-metadata.json
│   │   └── year-nft-metadata.json
│   └── ipfs/
│       └── (scripts d’upload IPFS)
├── script/
│   ├── Deploy.s.sol
│   ├── UpdateNFT.s.sol
│   └── RevokeNFT.s.sol
├── src/
│   ├── MyProgramNFT.sol
│   ├── MyYearNFT.sol
│   └── NFTFactory.sol
├── test/
│   ├── MyProgramNFT.t.sol
│   └── MyYearNFT.t.sol
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── admin/
│   │   │   └── AdminPanel.jsx
│   │   └── public/
│   │       └── VerificationPortal.jsx
│   ├── package.json
│   └── README.md
├── .env.example
├── .gitignore
└── README.md

Fichiers importants ✨
	•	.env.example : Exemple de configuration d’environnement (RPC_URL, PRIVATE_KEY, etc.).
	Note : N’oubliez pas de créer un .env (qui ne sera pas commité) avec vos vraies données sensibles.
	•	avalanche/README.md : Explications sur la configuration et le lancement de votre Subnet Avalanche.
	•	foundry.toml : Paramètres Foundry (version de Solidity, chemins, etc.).
	•	frontend/README.md : Documentation spécifique au frontend (scripts npm, dépendances…).
	•	README.md (ce fichier) : Guide global pour l’ensemble du projet.

Ressources et Documentation 📚
	•	Foundry Book : https://book.getfoundry.sh/
	•	Avalanche CLI : https://github.com/ava-labs/avalanche-cli
	•	React : https://reactjs.org/docs/getting-started.html
	•	Create React App : https://create-react-app.dev/
	•	OpenZeppelin (librairies Solidity) : https://docs.openzeppelin.com/contracts/

Pour toute question ou suggestion, n’hésitez pas à ouvrir une issue ou à soumettre une pull request.
Happy hacking! 😎

