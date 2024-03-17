// env.js

// A function to read and validate the API_URL environment variable
/*
const url_backend = (() => {
  const url_backend = process.env.BACKEND_URL;
  if (!url_backend) {
    throw new Error('The BACKEND_URL environment variable is not set');
  }
  if (!url_backend.startsWith('http')) {
    throw new Error('The BACKEND_URL environment variable must start with http or https');
  }
  return url_backend;
})();
*/

function validateUrl(url) {
  if (!url) {
    throw new Error('The URL '+url+' is not set in the environment variables');
  }
  let validatedUrl;
  try {
    validatedUrl = new URL(url);
  } catch (err) {
    throw new Error(`The URL ${url} is not valid`);
  }
  return validatedUrl;
}

const backendUrl = validateUrl(process.env.BACKEND_URL);
const backendProtocol = backendUrl.protocol.slice(0, -1);
const backendHost = backendUrl.host;

const frontendUrl = validateUrl(process.env.FRONTEND_URL);
const frontendProtocol = frontendUrl.protocol.slice(0, -1);
const frontendHost = frontendUrl.host;

module.exports = {
  backendUrl,
  backendProtocol,
  backendHost,
  frontendUrl,
  frontendProtocol,
  frontendHost
};