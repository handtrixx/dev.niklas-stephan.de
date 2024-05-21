import fs from "fs";
import path from "path";
import crypto from "crypto";
import cheerio from "cheerio";

export async function fetchTranslations(
  text: string,
  source: string,
  target: string
) {
  // Create a hash of the text, source, and target to use as a filename
  const hash = crypto
    .createHash("md5")
    .update(text + source + target)
    .digest("hex");
  const cacheDir = path.resolve(`./apiCache/translations`);
  const cacheFile = path.resolve(`${cacheDir}/${hash}.json`);

  // Create directory if it does not exist
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true });
  }

  // Check if cache file exists
  if (fs.existsSync(cacheFile)) {
    const data = fs.readFileSync(cacheFile, "utf8");
    return JSON.parse(data);
  }

  // Load the HTML content into cheerio
  const $ = cheerio.load(text);

  // Replace the content of <pre> and <code> tags and store the original content
  const originalContents = [];
  $("pre, code").each((index, element) => {
    originalContents.push($(element).text());
    $(element).text("CODE_BLOCK");
  });

  // Get the modified HTML
  const modifiedText = $.html();

  const response = await fetch("https://translate.handtrixxx.com/translate", {
    method: "POST",
    body: JSON.stringify({
      api_key: "de58a722-7ec2-447b-b133-edbc811c0d04",
      q: modifiedText,
      source: source,
      target: target,
      format: "html",
    }),
    headers: { "Content-Type": "application/json" },
  });
  const translations = await response.json();

  // Reinsert the original content of <pre> and <code> tags
  console.log(translations.translatedText);
  if (translations.translatedText) {
    const $translated = cheerio.load(translations.translatedText);
    $translated("pre, code").each((index, element) => {
      $translated(element).text(originalContents[index]);
    });

      // Save the translated text to cache file
    const translatedText = $translated("body").html(); // Select the <body> tag and get its inner HTML
    fs.writeFileSync(cacheFile, JSON.stringify(translatedText), "utf8");

      // Return only the inner HTML of the <body> tag
    return translatedText;
  } else {
    return text;
  }
}
