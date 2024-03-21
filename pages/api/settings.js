import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method === "POST") {
    const colors = req.body;

    let scss = "";
    for (const [name, color] of Object.entries(colors)) {
      scss += `$${name}: ${color};\n`;
    }

    fs.writeFileSync(path.resolve("./styles/colors.scss"), scss);

    res.status(200).json({ message: "Colors updated successfully." });
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}