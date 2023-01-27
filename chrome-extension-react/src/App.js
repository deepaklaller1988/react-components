import logo from './logo.svg';
import './App.css';
import React,{useState,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {RiDeleteBin4Line} from 'react-icons/ri'
import { MdAddCircle} from 'react-icons/md';

const getLocalItems = () => {
  let list = localStorage.getItem('lists');
  console.log(list);
  if (list) {
      console.log(JSON.parse(localStorage.getItem('lists')));
      return JSON.parse(localStorage.getItem('lists'));
  } else {
      return []
  }
};

function App() {
  const [items,setItems] = useState(getLocalItems());
  const [val,setVal] = useState();

  const addList = ()=>{
    if(!val){
      console.log("no val")

    }else{
    //   setItems([...items,val]);
    // setVal('');
    const allInputData = { id: new Date().getTime().toString() , name:val}
    setItems([...items, allInputData]);
    setVal('');
    }
    
  }

  const deleteItems = (id)=>{
    console.log(id);
    const updatedItems = items.filter((elem,ind) => {
      return ind !== id;
  })
  console.log(updatedItems)
  setItems(updatedItems);
  }

  const removeAllItems = () =>{
    setVal('');
    setItems('');
  }

      // add data to localStorage
      useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(items));
    }, [items]); 

  return (
    <div className="App">
      <div>
        {/* <input type="text" value={val} onChange={(e)=>{setVal(e.target.value)}} placeholder="Add task"></input> */}
        <Form.Label>Add Items:</Form.Label>
        <InputGroup size="sm" className="mb-3" style={{width:"300px", margin:"auto"}}>
        <Form.Control
          placeholder="Add Tasks"
          aria-describedby="basic-addon2"
          value={val} 
          onChange={(e)=>{setVal(e.target.value)}}
        />
          <Button variant="success" onClick={addList}><MdAddCircle style={{height:"20px", width:"20px"}}></MdAddCircle></Button>
      </InputGroup>
        {/* <button onClick={addList}>Add</button> */}
     
      </div>
      <div>{items && items.map((item,i)=>{
        return(
          <>
          <div key={i} style={{width:"290px", margin:"auto", border:"1px solid black", height:"35px", marginTop:"5px", display:"flex",   backgroundColor: "#d1d2d4", 
          borderRadius:"3px"}}>
            <div style={{width:"160px", textAlign:"start",paddingLeft:"5px"}}>
            {item.name}
            </div>
          
          {/* <button onClick={()=>deleteItems(i)}>-</button> */}
          <div style={{width:"auto"}}>
          <Button variant="danger" size="sm" onClick={()=>deleteItems(i)} style={{ marginLeft:"100px", height:"33px"}}><RiDeleteBin4Line></RiDeleteBin4Line></Button>
          </div>
          </div>
          
          </>
        )
      })
        
        }
      </div>
      <Button variant="primary" style={{marginTop:"10px"}} onClick={removeAllItems}>Remove All</Button>
      
    </div>
  );
}

export default App;
