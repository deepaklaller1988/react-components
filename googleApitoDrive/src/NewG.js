import React, {useState, useEffect} from 'react';
import {gapi} from 'gapi-script';
import { FileUploader } from "react-drag-drop-files";
// import { google } from 'googleapis';

const {google} = require('googleapis');

function NewG() {
    const [auths, setAuths] = useState()
    const [url,setUrl] = useState("");
    const [file,setFile] = useState(null);
    const fileTypes = ["JPG","JPEG", "PNG", "GIF"];
    // const google = window.google;

    useEffect(()=>{
        authenticateGoogle();
    },[]);

    const authenticateGoogle = () => {
        const auth = new google.auth.GoogleAuth({
          keyFile: `${__dirname}/service_account_key.json`,
          scopes: "https://www.googleapis.com/auth/drive",
        });
        setAuths(auth);
        return auth;
      };

  return (
    <div>
      {console.log(auths)}
      Auth
    </div>
  )
}

export default NewG
