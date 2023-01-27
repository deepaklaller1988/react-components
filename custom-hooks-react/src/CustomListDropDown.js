import {useState, useEffect} from 'react'
import useFetch from './useFetch';

export const CustomDropdown = (props) => (
    <div className="form-group">
      {/* <strong>{props.name}</strong> */}
      <select
        className="form-control"
        name="{props.username}"
        onChange={props.onChange}
      >
        <option defaultValue>Select </option>
        {props.options && props.options.map((item, index) => (
          <option key={index} value={item.id}>
            {item.username}
          </option>
        ))}
      </select>
    </div>
  )

export default function CustomListDropDown(){
    const [val, setVal] = useState('');
    // const [collection,setCollection] = useState([]);

    const [collection] = useFetch("https://jsonplaceholder.typicode.com/users") 

    const onChange = (event) => {
        setVal(event.target.value);
      }

    return(
        <div className="container mt-4">
            {console.log(collection)}
        <h2>Dynamic List DropDown with custom hook</h2>
        <CustomDropdown
          name={val}
          options={collection}
          onChange={onChange}
        />
      </div>
    )
}