const fs = require("fs");
const path = require("path");
const execFile = require("child_process").execFile;

console.group = (name) => {
  console.log(`---${name}---`);
};

console.groupEnd = () => {
  console.log("======");
};

const handleProjectRun = (io, client) => {
  client.on("copyProject", ({ projectCode }) => {
    console.group("on copyProject");
    console.log({ projectCode });

    fs.writeFileSync("/home/pi/Development/johnny-five/index.js", projectCode);

    console.groupEnd();
  });
  client.on("projectStarted", () => {
    console.group("on projectStarted");
    console.log();
    io.emit("projectStatus", true);
    console.groupEnd();
  });
  client.on("stopProject", () => {
    console.group("on stopProject");
    console.log();
    execFile("../scripts/stop-project.sh", [], (error, stdout, stderr) => {
      console.group("stopProject script");
      console.log({ error, stderr, stdout });
      console.groupEnd();
      io.emit("projectStatus", false);
    });
    console.groupEnd();
  });

  client.on("powerOff", () => {
    console.group("on powerOff");
    console.log();
    execFile("../scripts/power-off.sh", [], (error, stdout, stderr) => {
      console.group("powerOff script");
      console.log({ error, stderr, stdout });
      console.groupEnd();
    });
    console.groupEnd();
  });

  // client.on("saveFile", ({ fileName, contents }) => {
  //   console.log("");
  //   console.log("on saveFile");
  //   console.log({ fileName, contents });
  //   const filePath = path.join(filesDir, fileName);
  //   fs.writeFileSync(filePath, contents);
  //   console.log("-----on saveFile");
  // });

  // client.on("getFile", ({ fileName }) => {
  //   console.log("");
  //   console.log("on getFile");
  //   console.log({ fileName });
  //   const filePath = path.join(filesDir, fileName);
  //   if (fs.existsSync(filePath)) {
  //     const contents = fs.readFileSync(filePath);
  //     console.log("emit file");
  //     console.log({ contents });
  //     io.emit("file", contents);
  //   } else {
  //     console.log("no file");
  //     io.emit("file", "");
  //   }
  //   console.log("-----on getFile");
  // });
};

module.exports = {
  handleProjectRun,
  default: handleProjectRun,
};
