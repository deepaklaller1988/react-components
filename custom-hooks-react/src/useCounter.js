import {useState,useEffect} from 'react';

function useCounter(initial){
    const [counter,setCounter] = useState(initial);

    function resetCounter(){
        setCounter(counter + 1);
    }

    // useEffect(()=>{
    //     fetch(url)
    //     .then((res)=>res.json())
    //     .then(counter=> setCounter(counter));
    // }, [url])
    useEffect(()=>{
console.log(counter)
    },[resetCounter] )
return resetCounter;
}

export default useCounter;