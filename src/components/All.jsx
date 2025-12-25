import { useState } from 'react'
import VroLogin from './pages/VroLogin.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx'
import './App.css'

function All() {
  const[isLoggedin,setIsLoggedIn] = useState(false);
  return(
    <>
    {isLoggedin ? (<AdminDashboard/>)  : (<VroLogin onLogin={()=>
    setIsLoggedIn(true)}/>)}
    </>
  )
}
export default All

