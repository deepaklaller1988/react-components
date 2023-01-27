import React, {useState} from 'react'

function Calculator() {
    const [val,setVal] = useState("");
    const [input,setInput] = useState([]);

    const handleValue = (e) =>{
        setVal(val.concat(e.target.outerText));
        // console.log(e)
        // setInput([...input, _.join(val)]);

    }
    // console.log(input);
    const clear = ()=>{
        setVal("");
    }

    const backspace = () =>{
       setVal(val.slice(0,val.length-1))
    }

    const resultValue = (e) =>{
        try{
            setVal(eval(val).toString());
        }
        catch(err){
            console.log("Error");
            setVal("Error")
        }


    }
    return (
        <div>
            <div style={{margin:"auto", marginTop:"20vh",width:"300px", height:"400px", border:"1px solid black",backgroundColor:"black"}}>
                <div style={{margin:"5px", paddingTop:"5px",paddingRight:"5px", height:"45px", border:"1px solid black", textAlign:"right", fontWeight:'500', letterSpacing:"2px", backgroundColor:"White"}}>
                {val}
                    {console.log(val)}
                </div>
                <div style={{margin:"5px", height:"82.5%", border:"1px solid black", backgroundColor:"black"}}>
                <div style={{display:"flex"}}>
                <div onClick={clear} style={{margin:"5px", width:"110px", height:"50px", border:"1px solid black", textAlign:"center", backgroundColor:"grey"}}>Clear</div>
                <div onClick={backspace} style={{margin:"5px", width:"50px", height:"50px", border:"1px solid black", textAlign:"center", backgroundColor:"grey"}}>C</div>
                {/* <div value="" onClick={} style={{margin:"5px", width:"50px", height:"50px", border:"1px solid black", textAlign:"center", backgroundColor:"white"}}></div> */}
                <div onClick={handleValue} style={{margin:"5px", width:"85px", height:"50px", border:"1px solid black", textAlign:"center", backgroundColor:"grey"}}>/</div>
                </div>
                <div style={{display:"flex"}}>
                <div onClick={handleValue} style={{margin:"5px", width:"50px", height:"50px", border:"1px solid black", textAlign:"center", backgroundColor:"white"}}>1</div>
                <div onClick={handleValue} style={{margin:"5px", width:"50px", height:"50px", border:"1px solid black", textAlign:"center", backgroundColor:"white"}}>2</div>
                <div onClick={handleValue} style={{margin:"5px", width:"50px", height:"50px", border:"1px solid black", textAlign:"center", backgroundColor:"white"}}>3</div>
                <div onClick={handleValue} style={{margin:"5px", width:"85px", height:"50px", border:"1px solid black", textAlign:"center", backgroundColor:"grey"}}>*</div>
                </div>
                <div style={{display:"flex"}}>
                <div onClick={handleValue} style={{margin:"5px", width:"50px", height:"50px", border:"1px solid black", textAlign:"center", backgroundColor:"white"}}>4</div>
                <div onClick={handleValue} style={{margin:"5px", width:"50px", height:"50px", border:"1px solid black", textAlign:"center", backgroundColor:"white"}}>5</div>
                <div onClick={handleValue} style={{margin:"5px", width:"50px", height:"50px", border:"1px solid black", textAlign:"center", backgroundColor:"white"}}>6</div>
                <div onClick={handleValue} style={{margin:"5px", width:"85px", height:"50px", border:"1px solid black", textAlign:"center", backgroundColor:"grey"}}>&ndash;</div>
                </div>
                <div style={{display:"flex"}}>
                <div onClick={handleValue} style={{margin:"5px", width:"50px", height:"50px", border:"1px solid black", textAlign:"center", backgroundColor:"white"}}>7</div>
                <div onClick={handleValue} style={{margin:"5px", width:"50px", height:"50px", border:"1px solid black", textAlign:"center", backgroundColor:"white"}}>8</div>
                <div onClick={handleValue} style={{margin:"5px", width:"50px", height:"50px", border:"1px solid black", textAlign:"center", backgroundColor:"white"}}>9</div>
                {/* <div onClick={handleValue} style={{margin:"5px", width:"50px", height:"50px", border:"1px solid black", textAlign:"center", backgroundColor:"white"}}>9</div> */}
                <div onClick={handleValue} style={{margin:"5px", width:"85px", height:"50px", border:"1px solid black", textAlign:"center", backgroundColor:"grey"}}>+</div>
                </div>
                <div style={{display:"flex"}}>
                <div onClick={handleValue} style={{margin:"5px", width:"50px", height:"50px", border:"1px solid black", textAlign:"center", backgroundColor:"white"}}>00</div>
                <div onClick={handleValue} style={{margin:"5px", width:"50px", height:"50px", border:"1px solid black", textAlign:"center", backgroundColor:"white"}}>0</div>
                <div onClick={handleValue} style={{margin:"5px", width:"50px", height:"50px", border:"1px solid black", textAlign:"center", backgroundColor:"white"}}>.</div>
                <div onClick={resultValue} style={{margin:"5px", width:"85px", height:"50px", border:"1px solid black", textAlign:"center", backgroundColor:"grey"}}>=</div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Calculator
