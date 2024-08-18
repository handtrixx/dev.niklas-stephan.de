#!/bin/bash
TIMESTAMP=$(date)

echo "$TIMESTAMP - Starting the development environment"
echo "-------------------------------------------------"
# Check if the required environment variables are set
if [ -z "$API_URL" ]; then
  echo "API_URL environment variable is not set. Exiting."
  exit 1
else 
  echo "API_URL is set to $API_URL"
fi
if [ -z "$API_TOKEN" ]; then
  echo "API_TOKEN environment variable is not set. Exiting."
  exit 1
else
  echo "API TOKEN is set"
fi

# Check if curl can reach the API_URL
if curl --output /dev/null --silent --head --fail "$API_URL"; then
  echo "API_URL is reachable"
else
  echo "API_URL is not reachable. Exiting."
  exit 1
fi

# Check if the API_TOKEN is valid
response=$(curl -s -o /dev/null -w "%{http_code}" -H "Api-Token: $API_TOKEN" $API_URL/wp-json/babelnext/v1/pages)

if [ "$response" -ne 200 ]; then
  echo "API_TOKEN is not valid. Exiting."
  exit 1
else
  echo "API_TOKEN is valid"
fi

# Create .env.local file based on the environment variables
echo "Creating .env.local file"
cat <<EOL > .env.local
NEXT_PUBLIC_API_URL=${API_URL}
API_TOKEN=${API_TOKEN}
EOL

echo Installing node modules from package.json
npm install --no-progress
echo Starting your Node.js application
npm run dev

TIMESTAMP=$(date)
# Keep the script running in case of errors to be able to inspect the container
echo "$TIMESTAMP - Application stopped. Keeping the container running for debugging."
tail -f /dev/null