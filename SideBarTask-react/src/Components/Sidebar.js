import React from 'react'
import '../App.css';
import {Sidebardata} from './sidebardata'
import {Link,Outlet} from 'react-router-dom'

function Sidebar() {
  return (
    <>
    <div className="sidebar">
      <ul className="sidebarlist">
      {Sidebardata.map((items,key)=>{
        return (
          // <Link to={items.link}>
      <li key={key} 
      onClick={()=>{window.location.pathname=items.link}}
       className="row">{items.title}</li>
      //  </Link>
        );
      })}
      </ul>
    </div>
    <Outlet></Outlet>
    </>
  )
}

export default Sidebar
