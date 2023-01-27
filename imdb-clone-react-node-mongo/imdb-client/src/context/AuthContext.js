import React,{useState,useEffect,createContext} from 'react';
import axios from 'axios';

const AuthContext = createContext();

function AuthContextProvider(props) {
    const [userInfo,setUserInfo] = useState({});

    
  useEffect(() => {
    // console.log("called context")
    getLoggedIn();
  }, []);


    const getLoggedIn = async () =>{
        const res = await axios.get("http://localhost:8080/api/user");
        // console.log(res.data)
        setUserInfo(res.data);
        return res.data;
    }
  return (
    <AuthContext.Provider value={{ userInfo, getLoggedIn }}>
    {props.children}
  </AuthContext.Provider>
  )
}

export default AuthContext;
export {AuthContextProvider};
