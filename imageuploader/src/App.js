
import './App.css';
// import {Storage} from '@google-cloud/storage';
import React, {useState} from 'react'
import { FileUploader } from "react-drag-drop-files";

function App() {
  const [url,setUrl] = useState("");
  const [file,setFile] = useState(null);
  // const [show,setShow] = useState();

  const fileTypes = ["JPG","JPEG", "PNG", "GIF"];

  const handleSubmit = async (e)=>{
    e.preventDefault();
    console.log(file)
    console.log(file.data);
    let formData = new FormData();
    formData.append("file", file.data);

    const res = await fetch("http://localhost:8000/upload-to-google-drive",{
      method:"POST",
      body:formData,
    });
    const resBody = await res.json();
    if(res){
      console.log(resBody.response.data.id);
      setUrl(`https://drive.google.com/uc?export=view&id=${resBody.response.data.id}`)
      // setShow()
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
  );
}

export default App;
