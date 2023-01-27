const {Storage} = require('@google-cloud/storage');
const express = require('express');
const cors = require('cors');
const format =require('util')
const Multer = require('multer');

const app =express();
const port = 8000;

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
      fileSize: 10 * 1024 * 1024, 
    },
  });
  
app.use(cors());

const cloudStorage = new Storage({
    keyFilename: `${__dirname}/service_account_key.json`,
    projectId: "PROJECT_ID",
  });

const bucketName = "Created-Bucket-Name";

const bucket = cloudStorage.bucket(bucketName);

app.post("/upload-to-cloud-storage", multer.single("file"), function (req, res, next) {
    if (!req.file) {
      res.status(400).send("No file uploaded.");
      return;
    }
    const bfile = bucket.file(req.file.originalname);
  const bfileStream = bfile.createWriteStream();
  bfileStream.on("error", (err) => {
    next(err);
  });

  bfileStream.on("finish", () => {
    const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${bfile.name}`);
    res.status(200).json({ publicUrl });
  });
  bfileStream.end(req.file.buffer);
  console.log(req.file);
});

app.listen(port, () => {
    console.log(`connection successful at http://localhost:${port}`);
  });