#!/bin/bash

# Navigate to the client folder
echo "Navigating to the client folder..."
cd client || { echo "Client folder not found!"; exit 1; }

# Install dependencies
echo "Running npm install in the client folder..."
npm install

# Build the application
echo "Running npm run build in the client folder..."
npm run build

# Navigate back to the root folder
echo "Navigating back to the root folder..."
cd ..

# Install dependencies
echo "Running npm install in the root folder..."
npm install

# Run the development server
echo "Running npm run dev in the root folder..."
#npm start
