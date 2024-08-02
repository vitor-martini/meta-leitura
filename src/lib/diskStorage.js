const fs = require("fs");
const path = require("path");
const UPLOADS_FOLDER = path.resolve(process.cwd(), "public");
const crypto = require("crypto");
const sharp = require("sharp");

class DiskStorage {
  async save(fileName, buffer) {
    const fileHash = crypto.randomBytes(10).toString("hex");
    const baseName = fileName.split(".").slice(0, -1).join(".").replace(" ", "-");
    const uniqueFileName = `${fileHash}-${baseName}.png`;
    const pngBuffer = await sharp(buffer).png().toBuffer();
    await fs.promises.writeFile(path.resolve(UPLOADS_FOLDER, uniqueFileName), pngBuffer);
  
    return uniqueFileName;
  }

  async delete(fileName) {
    const filePath = path.resolve(UPLOADS_FOLDER, fileName);

    try {
      await fs.promises.stat(filePath);
    } catch(error) {
      console.log(error);
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

module.exports = DiskStorage;
