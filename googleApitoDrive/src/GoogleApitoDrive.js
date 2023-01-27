import React, {useState, useEffect} from 'react';
import {gapi} from 'gapi-script';
import { FileUploader } from "react-drag-drop-files";

function Gdr() {
    const [sin,setSin] =useState(true);
    const [sout,setSout] =useState(true);
    const google = window.google;
    const [parentFolder,setParentFolder] = useState();
    const [url,setUrl] = useState("");
    const [file,setFile] = useState(null);
    const [show,setShow] = useState(false);
    const fileTypes = ["JPG","JPEG", "PNG", "GIF"];
   window.onload = () => {
        gapiLoaded();
        gisLoaded()
    } 

    useEffect(() => {
        gapiLoaded();
        gisLoaded();
    }, [handleAuthClick])

    const CLIENT_ID = '638697376575-kjfp3g69lipudvd1houve00e6vtgomqd.apps.googleusercontent.com';
    const API_KEY = 'AIzaSyCHpJWFIkMZ7BXB-AJbLm46FmV6CqXexT8';
    const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
    const SCOPES = 'https://www.googleapis.com/auth/drive';
    let tokenClient;
    let gapiInited = false;
    let gisInited = false;

    function gapiLoaded() {
        gapi.load('client', initializeGapiClient);
    }

    async function initializeGapiClient() {
        await gapi.client.init({
            apiKey: API_KEY,
            discoveryDocs: DISCOVERY_DOCS,
        });
        gapiInited = true;
        // maybeEnableButtons();
    }

    function gisLoaded() {
        tokenClient = google.accounts.oauth2.initTokenClient({
            client_id: CLIENT_ID,
            scope: SCOPES,
            callback: ''
        });
        gisInited = true;
        // maybeEnableButtons();
    }

    // function maybeEnableButtons() {
    //     if (gapiInited && gisInited) {
    //         setSin(true);
         
    //     }
    // }



    function handleAuthClick() {
        tokenClient.callback = async (resp) => {
            if (resp.error !== undefined) {
                throw (resp);
            }
            setSin(false);
            setSout(true);
            setShow(true);
            checkFolder()
        };

        if (gapi.client.getToken() === null) {
            tokenClient.requestAccessToken({ prompt: 'consent' });
        } else {
            tokenClient.requestAccessToken({ prompt: '' });
        }
    }


    function handleSignoutClick() {
        const token = gapi.client.getToken();
        if (token !== null) {
            google.accounts.oauth2.revoke(token.access_token);
            gapi.client.setToken('');
            setSin(true);
            setSout(false);
        }
    }

    function checkFolder() {
        gapi.client.drive.files.list({
            'q': 'name = "Test Folder"',
        }).then(function (response) {
            var files = response.result.files;
            console.log(files);
            if (files && files.length > 0) {
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    // localStorage.setItem('parent_folder', file.id);
                    setParentFolder(file.id);
                    console.log('Folder exist');
                }
            } else {
                // if folder not available then create
                console.log('Folder Created');
                createFolder();
            }
        })
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
       
            console.log("upload", parentFolder)
            var metadata = {
                name: 'test-image-' + String(Math.random() * 10000).split('.')[0] + '.jpg', // Filename at Google Drive
                mimeType: file.mimetype, // mimeType at Google Drive
                parents: [parentFolder]
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
                headers: new Headers({ "Authorization": "Bearer " + gapi.auth.getToken().access_token }),
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

    function createFolder() {
        var access_token = gapi.auth.getToken().access_token;
        var request = gapi.client.request({
            'path': 'drive/v2/files',
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token,
            },
            'body': {
                'title': 'Test Folder',
                'mimeType': 'application/vnd.google-apps.folder'
            }
        });
        request.execute(function (response) {
            setParentFolder(response.id);
        })
    }

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
    return (
        <div>
            <div className="header">
        <div className="title">Backup To Google Drive</div>
        <div className="auth-buttons">
            <button className="signin"  style= {{ display: sin?"block":"none"  }} onClick={handleAuthClick}>Sign In</button>
            <button className="signout" style= {{ display: sout?"block":"none"  }} onClick={handleSignoutClick}>Sign Out</button>
        </div>
    </div>
    {show && (<div className="actions">
    <form style={{margin:"auto",padding:"10vh"}} onSubmit={upload}>
        {/* <input type="file" name="file" onChange={handleUpload}></input> */}
        <FileUploader handleChange={handleUpload} name="file" types={fileTypes}/>
        <button type="submit">Upload</button>
        </form>
        {/* <textarea placeholder="Enter text here ..."></textarea>
        <button className="upload" onClick={upload}>Backup</button> */}
    </div>)}
    
    {url && (
          // <a href={url}>{url}</a>
          <img src={url} alt="uploaded image"></img>
        )}
        </div>
    )
}

export default Gdr
