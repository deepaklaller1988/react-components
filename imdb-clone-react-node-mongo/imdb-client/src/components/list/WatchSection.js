import React,{useState} from 'react';
import { useEffect } from 'react';
import {Route, Routes, Link} from 'react-router-dom';
import Tabs from './Tabs';
// import TopPicks from './TopPicks';
import Watchlist from './Watchlist';


function WatchSection() {
  const [sectionShown, setSectionShown] = useState();
  useEffect(()=>{
    setSectionShown(handleSection("highrated"));
  },[])

  const handleSection = (category)=>{
    console.log("first")
    return <Tabs category={category} />
  }

  return (
    <div className='text-white p-5 m-5'>
        <h1
        className="mb-5"
        style={{
          width: "50%",
          color: "gold",
          backgroundColor: "black",
        }}
      >
        Watch Section
      </h1>
      <ul className="nav-bar">
        <li onClick={()=>{setSectionShown(handleSection("highrated")) }}>
          Top Rated Movies
        </li>
        <li onClick={()=>{setSectionShown(handleSection("wishlist")) }}>
          Watchlist
        </li>
        <li onClick={()=>{setSectionShown(handleSection("popular")) }}>
         Popular
        </li>
        <li onClick={()=>{setSectionShown(handleSection("favorites")) }}>
          Fan Favorites
        </li>
      </ul>
      <div>
        {
          sectionShown
        }
      </div>
      {/* <Routes>
      <Route path="/top-rated-tab" element={<TopPicks category="highrated" />}></Route>
      </Routes> */}
      {/* <Route path="/watchlist-tab" element={<TopPicks category="wishlist" />}></Route>
      <Route path="/popular-tab" element={<TopPicks category="popular" />}></Route>
      <Route path="/favorites-tab" element={<TopPicks category="favorites" />}></Route>
      </Routes> */}
    </div>
  )
}

export default WatchSection
