#!/bin/bash

# Dockerfile path and tag for the image
DOCKERFILE_PATH="dockerfile.local"
IMAGE_TAG="sample-app:0.1.0"

# Go to the app dir
cd ../app
echo $pwd


# Build the Docker image
docker build -f "$DOCKERFILE_PATH" -t "$IMAGE_TAG" .

# Push the Docker image to Minikube
minikube image load "$IMAGE_TAG"
