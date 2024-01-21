#!/bin/bash

# Dockerfile path and tag for the image
DOCKERFILE_PATH="docker.io/library/"
IMAGE_NAME="sample-app"
IMAGE_TAG="0.1.0"
FULL_IMAGE_NAME="$DOCKERFILE_PATH$IMAGE_NAME:$IMAGE_TAG"
RELEASE="ts-node-redis-sentinel-k8s-example"
NAMESPACE="ts-node-redis-sentinel-k8s-example"

# Uninstall the release
helm uninstall "$NAMESPACE" -n "$RELEASE"

# Remove the Docker image locally
docker rmi "$FULL_IMAGE_NAME"

sleep 5

# Remove the Docker image from Minikube
minikube image rm "$FULL_IMAGE_NAME"

