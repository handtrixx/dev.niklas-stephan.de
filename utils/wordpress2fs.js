const axios = require("axios");
const fs = require("fs");
const path = require("path");

const wordpressUrl = "https://niklas-stephan.de";

async function fetchAndSave(endpoint) {
  const response = await axios.get(`${wordpressUrl}/wp-json/wp/v2/${endpoint}?per_page=100`);
  const data = response.data;

  // Loop over each entry in the data
  for (const entry of data) {
    // Use the id field of the entry as the filename
    const filename = `${entry.id}.json`;
    fs.writeFileSync(
      path.resolve(`/usr/src/apiCache/${endpoint}/${filename}`),
      JSON.stringify(entry),
      "utf8"
    );
  }
}

async function run() {
    await fetchAndSave("posts");
    await fetchAndSave("pages");
    await fetchAndSave("media");
}
run();

//https://niklas-stephan.de/wp-json/wp/v2/media?per_page=100&_fields=id,modified,source_url
