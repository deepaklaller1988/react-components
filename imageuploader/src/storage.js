// const {Storage} = require('@google-cloud/storage');
const {google} = require('googleapis');
const express = require('express');
const cors = require('cors');
const {format} =require('util')
const Multer = require('multer');
const { Readable } = require('stream');

const app =express();
const port = 8000;

app.use(cors());

// const multer = Multer({
//     storage: Multer.diskStorage({
//       destination: function (req, file, callback) {
//         callback(null, `${__dirname}/image-files`);
//       },
//       filename: function (req, file, callback) {
//         callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
//       },
//     }),
//     limits: {
//       fileSize: 5 * 1024 * 1024,
//     },
//   });

const multer = Multer({
    storage: Multer.memoryStorage(), 
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
  });

  const authenticateGoogle = () => {
    const auth = new google.auth.GoogleAuth({
      keyFile: `${__dirname}/service_account_key.json`,
      scopes: "https://www.googleapis.com/auth/drive",
    });
    return auth;
  };

  const uploadToGDrive = async (file, auth) => {
    const fileMetadata = {
      name: file.originalname,
      parents: ["1DnhLv18124aZF4WPneYM_DJ_jzbevStn"],
    };

    const bufferStream =(buffer)=>{
        const stream = new Readable();
        stream.push(buffer);
        stream.push(null);

        return stream;
    }
  
  
    const media = {
      mimeType: file.mimetype,
    //   body: fs.createReadStream(file.path),
    body: bufferStream(file.buffer),
    };

  
    const serviceDrive = google.drive({ version: "v3", auth });
  
    const response = await serviceDrive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: "id",
    });
    return response;
  };

  app.post("/upload-to-google-drive", multer.single("file"), async (req, res, next) => {
    try {
      if (!req.file) {
        res.status(400).send("No file uploaded.");
        return;
      }
      const auth = authenticateGoogle();
      const response = await uploadToGDrive(req.file, auth);
      console.log(req.file);
      // deleteFile(req.file.path);
    // const publicUrl = req.file.response;
    // const publicUrl = `https://drive.google.com/file/d/1XSWrufwyQZJ8HkPjT7qPVcXvrD4jd0IB/${req.file.originalName}`;

      res.status(200).json({ response});
    } catch (err) {
      console.log(err);
  }});

  app.listen(port, () => {
    console.log(`connection successfull at http://localhost:${port}`);
  });