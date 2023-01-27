import React, {useState, useEffect} from 'react';
import {gapi} from 'gapi-script';
import { FileUploader } from "react-drag-drop-files";

function TryGDrive() {

    const [sin,setSin] =useState(true);
    const [sout,setSout] =useState(true);
    const google = window.google;
    const [parentFolder,setParentFolder] = useState();
    const [url,setUrl] = useState("");
    const [file,setFile] = useState(null);
    const [show,setShow] = useState(false);
    const fileTypes = ["JPG","JPEG", "PNG", "GIF"];

    const CLIENT_ID = '--CLIENT ID_--';
    const API_KEY = '---API KEY---';
    const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
    const SCOPES = 'https://www.googleapis.com/auth/drive';
    let tokenClient;

    useEffect(() => {
        function gapiLoaded() {
            gapi.load('client', initializeGapiClient);
        }
       gapiLoaded();
    }, [])

    async function initializeGapiClient() {
        await gapi.client.init({
            apiKey: API_KEY,
            discoveryDocs: DISCOVERY_DOCS,
        });
        // gapiInited = true;
        // maybeEnableButtons();
        tokenClient = google.accounts.oauth2.initTokenClient({
            client_id: CLIENT_ID,
            scope: SCOPES,
            callback: ''
        });
        tokenClient.callback = async (resp) => {
            if (resp.error !== undefined) {
                throw (resp);
            }}
        if (gapi.client.getToken() === null) {
            tokenClient.requestAccessToken({ prompt: 'consent' });
        } else {
            console.log(gapi.client.getToken())
            tokenClient.requestAccessToken({ prompt: '' });
        }
    }
    console.log(gapi.auth)
    const handleUpload =(pic)=>{
        console.log(pic)
        // const img ={
        //   preview: URL.createObjectURL(e.target.files[0]),
        //   data: e.target.files[0],
        // }
        const img ={
          preview: URL.createObjectURL(pic),
          data: pic,
        }
        setFile(img);
      }

    function upload(e) {
        e.preventDefault();
        console.log(file)
        console.log(file.data);
        if (file.data != null) {
            // const blob = new Blob([text.value], { type: 'plain/text' });
            // get parent folder id from localstorage
            // const parentFolder = localStorage.getItem('parent_folder');
            // set file metadata
       
            // console.log("upload", parentFolder)
            var metadata = {
                name: 'test-image-' + String(Math.random() * 10000).split('.')[0] + '.jpg', // Filename at Google Drive
                mimeType: file.mimetype, // mimeType at Google Drive
                parents: [`1DnhLv18124aZF4WPneYM_DJ_jzbevStn`]
            };
            let formData = new FormData();
            var filename = new Blob([file.data], {type: 'image/jpg'});
            formData.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
            formData.append("file", filename);
            // var formData = new FormData();
            // formData.append("metadata", new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
            // formData.append("file", blob);
            
            fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", {
                method: 'POST',
                headers: new Headers({ "Authorization": "Bearer " + "ya29.a0Aa4xrXNCv9LdCc7AvkVVV1x6fdzPhdZ6HmKh_6u63qB0BaRpr_H0wQoSfKxhJPtTOul2tzFcqUbMTWCHBfgCzs6WrrJjFMAkHPZXfjNE_cUk2lAqCz5C7jh2ggFsQwwunE5h1UereHQCUzHMLxFnZ1AbS0U6aCgYKATASARASFQEjDvL9GukyAJCJLuFzcIHAoPElMQ0163" }),
                body: formData
            }).then(function (response) {
               
                // console.log(res);
                // const resBody = response.json();
                // setUrl(`https://drive.google.com/uc?export=view&id=${resBody.response.data.id}`)
                return response.json();
            }).then(function (value) {
                console.log(value)
                setUrl(`https://drive.google.com/uc?export=view&id=${value.id}`)
            });
        }
    }

  return (
    <div>
      <form style={{margin:"auto",padding:"10vh"}} onSubmit={upload}>
        {/* <input type="file" name="file" onChange={handleUpload}></input> */}
        <FileUploader handleChange={handleUpload} name="file" types={fileTypes}/>
        <button type="submit">Upload</button>
        </form>
        {url && (
          // <a href={url}>{url}</a>
          <img src={url} alt="uploaded image"></img>
        )}
    </div>
  )
}

export default TryGDrive
