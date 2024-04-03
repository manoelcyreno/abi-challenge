#!/bin/sh

echo "==================================="
echo "STARTING SONAR CONFIGURATION"
echo "==================================="

# remove any sonarqube previous configuration
docker stop sonarqube
docker rm sonarqube

# Install docker
docker pull sonarqube

# Run Docker
docker run -d --name sonarqube -p 9000:9000 sonarqube
sleep 100
curl -u admin:admin -X POST "http://localhost:9000/api/users/change_password?login=admin&previousPassword=admin&password=abi"

echo "==================================="
echo "FINISHED SONAR CONFIGURATION"
echo "==================================="
echo "Access by: http://localhost:9000"
echo "==================================="