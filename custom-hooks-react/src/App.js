import {useState,useEffect} from 'react';
import './App.css';
import useFetch from './useFetch';
import useCounter from './useCounter'
import CustomListDropDown from './CustomListDropDown';

function App() {

  const [data] = useFetch("https://jsonplaceholder.typicode.com/users");

  const clickedButton = useCounter(0);

  return (
    <div className="App">
      {/* {console.log(data)} */}
      {/* {data} */}
      {data &&
        data.map((item) => {
          return <p key={item.id}>{item.name}</p>;
        })}

        <button onClick={clickedButton}>Count</button>

        <CustomListDropDown></CustomListDropDown>
    </div>
  );
}

export default App;
