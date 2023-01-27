//Client Side Data Fetching

import {useState,useEffect} from 'react';

function Dashboard(){
    const [dataFetched,setDataFetched] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        async function FetchData(){
            const res = await fetch("http://localhost:4000/dashboard");
            const data = await res.json();
            setDataFetched(data);
            setIsLoading(false);
        }
        FetchData();
    },[]);

    if(isLoading){
        return <h1>Loading....</h1>
    }

    return(
        <div>
            <h1>Dashboard</h1>
            <h2>Likes: {dataFetched.likes}</h2>
            <h2>Post: {dataFetched.posts}</h2>
            <h2>Followers: {dataFetched.followers}</h2>
            <h2>Following: {dataFetched.following}</h2>
            
        </div>
    )

}
export default Dashboard;