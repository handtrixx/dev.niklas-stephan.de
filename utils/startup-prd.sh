#!/bin/bash

echo Installing node modules from package.json
npm install --no-progress
echo Starting your Node.js application
npm run build
npm run start
