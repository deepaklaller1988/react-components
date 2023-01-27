import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Login from './login';
import Main from './main'
import {useEffect,useState} from 'react'

export default function Home() {
  const [data,setData] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("token");
    setData(user)
  }, [])
  

  if(data) return <Main />;
  return (
    <div className={styles.container}>
      <Login />
    </div>
  )
}
