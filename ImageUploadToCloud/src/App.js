
import './App.css';
// import {Storage} from '@google-cloud/storage';
import React, {useState} from 'react'
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF"];

function App() {
  const [url,setUrl] = useState("");
  const [file,setFile] = useState(null)

  const handleSubmit = async (e)=>{
    e.preventDefault();
    console.log(file)
    console.log(file.data);
    let formData = new FormData();
    formData.append("file", file.data);

    const res = await fetch("http://localhost:8000/upload-to-cloud-storage",{
      method:"POST",
      body:formData,
    });
    const resBody = await res.json();
    if(res){
      console.log(resBody);
      setUrl(resBody.publicUrl)
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
        {url && (
          <div>{url}</div>
        )}
        
      </form>
    </div>
  );
}

export default App;
