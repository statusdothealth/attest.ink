#!/bin/bash
# Simple script to store attestations on the server
# Usage: ./store-attestation.sh attestation.json

if [ $# -eq 0 ]; then
    echo "Usage: $0 <attestation.json>"
    exit 1
fi

# Read the attestation file
ATTESTATION_FILE=$1

if [ ! -f "$ATTESTATION_FILE" ]; then
    echo "Error: File $ATTESTATION_FILE not found"
    exit 1
fi

# Extract the ID from the JSON
ID=$(jq -r '.id' "$ATTESTATION_FILE")

if [ -z "$ID" ]; then
    echo "Error: No ID found in attestation"
    exit 1
fi

# Create attestations directory if it doesn't exist
mkdir -p attestations

# Copy the attestation to the attestations directory
cp "$ATTESTATION_FILE" "attestations/${ID}.json"

echo "Attestation stored successfully!"
echo "Short URL: https://attest.ink/verify/?id=${ID}"
echo "Direct file: https://attest.ink/attestations/${ID}.json"