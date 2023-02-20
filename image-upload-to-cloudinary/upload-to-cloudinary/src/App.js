import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [image, setImage] = useState([]);

  //handle and convert it in base 64
    const handleImage = (e) =>{
        const file = e.target.files[0];
        setFileToBase(file);
        console.log(file);
    }

    const setFileToBase = (file) =>{
        const reader = new FileReader();
        console.log(reader, file)
        reader.readAsDataURL(file);
        reader.onloadend = () =>{
            setImage(reader.result);
        }

    }

     //submit the form
    const submitForm = async (e) =>{
        e.preventDefault();
        try {
            const {data} = await axios.post('http://localhost:8000/api/product/create', {image})
            if  (data.success === true){
                setImage('');
            }
            console.log(data);
        } catch (error) {
            console.log(error)
        }

    }

  return (
    <div className="App">
       <form className=" col-sm-6 offset-3 pt-5 signup_form " encType="multipart/form-data" onSubmit={submitForm}>
            <div className="form-outline mb-4">
                <input onChange={handleImage}  type="file" id="formupload" name="image" className="form-control"  />
                <label className="form-label" htmlFor="form4Example2">Image</label>
            </div>
            <img className="img-fluid" src={image} alt="" />
            <button  type="submit" className="btn btn-primary btn-block mb-4">Create</button>
            
         </form>
    </div>
  );
}

export default App;
