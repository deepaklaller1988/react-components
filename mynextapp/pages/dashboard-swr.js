//swr for client side dat fetching

import useSwr from 'swr';

const fetcher = async ()=>{
    const res = await fetch("http://localhost:4000/dashboard");
    const data = await res.json();
    return data;
}

const fetcherSwr = async (...args)=>{
    const res = await fetch(...args);
    const data = await res.json();
    return data;
}

function DashboardSWR(){
    const {data,error} = useSwr("http://localhost:4000/dashboard", fetcherSwr) //can write "dashbord" in first argument and replace fetcherSwr with fetcher, this will also work

    if(error){ return <h1> Error Occured</h1>}
    if(!data){ return <h1> Loading...</h1>}

    return(
        <div>
            <h1>Dashboard</h1>
            <h2>Likes: {data.likes}</h2>
            <h2>Post: {data.posts}</h2>
            <h2>Followers: {data.followers}</h2>
            <h2>Following: {data.following}</h2>
            
        </div>
    )
}

export default DashboardSWR