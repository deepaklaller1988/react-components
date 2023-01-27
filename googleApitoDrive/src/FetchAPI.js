import React, {useState} from 'react'
import { FileUploader } from "react-drag-drop-files";
import { gapi } from 'gapi-script';

function FetchAPI() {
    const [url,setUrl] = useState("");
  const [file,setFile] = useState(null);


var accessToken = `--API KEY --`; 

const fileTypes = ["JPG","JPEG", "PNG", "GIF"];

const handleSubmit = async (e)=>{
  e.preventDefault();
  console.log(file)
  console.log(file.data);
  let formData = new FormData();
  var filename = new Blob([file.data], {type: 'image/jpg'});
  formData.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
  formData.append("file", filename);

var metadata = {
    name: file.originalname, // Filename at Google Drive
    mimeType: file.mimetype, // mimeType at Google Drive
    parents: ["__Parent Folder ---"],// Folder ID at Google Drive
};

  const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id',{
    method:"POST",
    headers: new Headers({ 'Authorization': 'Bearer ' + accessToken }),
    body:formData,
  });
  const resBody = await res.json();
  if(res){
    // console.log(resBody.response.id);
    // setUrl(`https://drive.google.com/uc?export=view&id=${resBody.response.data.id}`)
    // setShow()
    console.log(resBody);
  }
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
            <div className="App">
      <form style={{margin:"auto",padding:"10vh"}} onSubmit={handleSubmit}>
        {/* <input type="file" name="file" onChange={handleUpload}></input> */}
        <FileUploader handleChange={handleUpload} name="file" types={fileTypes}/>
        <button type="submit">Upload</button>
        </form>
        <div>
        {url && (
          // <a href={url}>{url}</a>
          <img src={url} alt="uploaded image"></img>
        )}
        </div>
        
     
    </div>
        </div>
    )
}

export default FetchAPI
