const url = require("url");

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const parsedApiUrl = url.parse(apiUrl);
const apiProtocol = parsedApiUrl.protocol.slice(0, -1);
const apiHost = parsedApiUrl.host;
const apiToken = process.env.API_TOKEN;

const frontendUrl = "https://dev.niklas-stephan.de";
const parsedFrontendUrl = url.parse(frontendUrl);
const frontendProtocol = parsedFrontendUrl.protocol.slice(0, -1);
const frontendHost = parsedFrontendUrl.host;

module.exports = {
  apiUrl,
  apiProtocol,
  apiHost,
  apiToken,
  frontendUrl,
  frontendProtocol,
  frontendHost,
};
