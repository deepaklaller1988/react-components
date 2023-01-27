import React,{useState,useEffect} from 'react'
import {getSession, signIn} from 'next-auth/react'

//component level styling
// import styles from '../styles/Dashboard.module.css' 

//Sass Support
import styles from '../styles/Dashboard.module.scss'

function Dashboard() {
    const [loading,setLoading] = useState(true);

    useEffect(() => {
    const securePage = async () => {
        const session = await getSession();
        if(!session){
            signIn();
        }else{
            setLoading(false)
        }
    }
    securePage();
    }, [])

    if(loading){
        return <h1>Loading....</h1>
    }
    return (
        <div 
        // className={styles.container} //Component Level styling
        className={styles.highlightscss} //Sass Style
        >
            Dashboard
        </div>
    )
}

export default Dashboard
