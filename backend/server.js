const { response } = require("express");
const express = require("express");
const fileUplaod = require("express-fileupload");
const app = express();
var cors = require("cors");

app.use(cors());
app.use(fileUplaod());
const port = 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/upload", (req, res) => {
  //res.send("Hello World!");

  if (!req.files) {
    return res.status(400).json("No files were uploaded.");
  }

  const file = req.files.file;

  file.mv(
    `/Users/sergio/Documents/GitHub/bootstrapfileupload/frontend/public/uploads/${file.name}`,
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      //Ok response
      res.send({ fileName: file.name, filePath: `/uploads/${file.name}` });
    }
  );
});
app.listen(port, () => {
  console.log(`Backend listening on port: ${port}`);
});
