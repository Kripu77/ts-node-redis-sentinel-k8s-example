# ts-node-redis-sentinel-k8s-example

## Overview

This repository serves as a demonstration of harnessing the power of TypeScript, Redis, Helm and Kubernetes. The included TypeScript application showcases the seamless integration of Node.js with Redis Sentinel for robust and scalable solutions. Additionally, Helm charts are provided to simplify the deployment process on Kubernetes.

## Prerequisites

Make sure you have the following tools installed:

- Node.js (for running the TypeScript application)
- Helm (for managing Kubernetes applications)
- Kubernetes cluster (local or cloud-based) 

The example will be based on minikube:

## Getting Started

1. **Clone this repository to your local machine:**

    ```bash
    git clone https://github.com/kripu77/ts-node-redis-sentinel-k8s-example.git
    cd ts-node-redis-sentinel-k8s-example
    ```

2. **Create a docker image for the sampleapp located inside app directory:**
    ```bash
     cd app
     docker build -f dockerfile.local -t sample-app:tag .

    example:
    docker build -f dockerfile.local -t sample-app:0.1.0 .
    ```
    
3. **Asuuming Minikube is running on your local machine Load the docker image into minikube.**
    ```bash
   minikube image load sample-app:tag .
    ```
    
4. **Create a namespace for the application stack:**
    ```bash
    kubectl create namespace <your-desired-namespace>

    example:
    kubectl create namespace ts-node-redis-sentinel-k8s-example  
    ```
    
    
5. **Switch to the helm-chart directory in order to Deploy Redis Sentinel and the node.js app using Helm:**

    ```bash
    cd ../helm-chart
    helm install ts-node-redis-sentinel-k8s-example ./ -n  <your-desired-namespace>
    ```



6. **Access the application:**

       ```bash
    kubectl get svc -n <your-desired-namespace>
    
    minikube service cd-service --url
    ``

    The application is now running! Visit the url displayed on your console.

## Cleanup

To remove the deployed resources:

```bash
helm uninstall redis-sentinel
# Additional cleanup steps if needed
