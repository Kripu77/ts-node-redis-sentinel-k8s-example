#!/bin/bash

NAMESPACE="ts-node-redis-sentinel-k8s-example"

# Check if the namespace exists
if kubectl get namespace "$NAMESPACE" &> /dev/null; then
  echo "Namespace $NAMESPACE already exists. Skipping creation."
else
  # Create the namespace if it doesn't exist
  kubectl create namespace "$NAMESPACE"
  echo "Namespace $NAMESPACE created."
fi

# Change directory to the Helm chart directory
cd ../helm-chart

# Install Helm chart in the specified namespace
helm install "$NAMESPACE" ./ -n "$NAMESPACE"

#Log the running pods
kubectl get pods -n $NAMESPACE
