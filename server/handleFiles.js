const fs = require("fs");
const path = require("path");

var filesDir = "/home/pi/files";

if (!fs.existsSync(filesDir)) {
  fs.mkdirSync(filesDir);
}

const handleFiles = (io, client) => {
  client.on("getFiles", () => {
    console.log("");
    console.log("on getFiles");
    const xmlFiles = fs.readdirSync(filesDir).filter((fileName) => {
      console.log(fileName);
      return fileName.endsWith(".xml");
    });
    console.log("emit files");
    console.log({ xmlFiles });
    io.emit("files", xmlFiles);
    console.log("-----on getFiles");
  });

  client.on("saveFile", ({ fileName, contents }) => {
    console.log("");
    console.log("on saveFile");
    console.log({ fileName, contents });
    const filePath = path.join(filesDir, fileName);
    fs.writeFileSync(filePath, contents);
    console.log("-----on saveFile");
  });

  client.on("getFile", ({ fileName }) => {
    console.log("");
    console.log("on getFile");
    console.log({ fileName });
    const filePath = path.join(filesDir, fileName);
    if (fs.existsSync(filePath)) {
      const contents = fs.readFileSync(filePath);
      console.log("emit file");
      console.log({ contents });
      io.emit("file", contents);
    } else {
      console.log("no file");
      io.emit("file", "");
    }
    console.log("-----on getFile");
  });
};

module.exports = {
  handleFiles,
  default: handleFiles,
};
