#!/bin/bash
set -e

echo "=== Création du Subnet ESGI ==="

# Création du subnet à partir de la configuration
avalanche subnet create --config avalanche/config/subnet-config.json

echo "=== Déploiement du Subnet ESGI ==="

# Déploiement du subnet (remplacez "ESGI_Subnet" par le nom exact défini dans le fichier de config si nécessaire)
avalanche subnet deploy ESGI_Subnet

echo "=== Subnet ESGI déployé avec succès ! ==="