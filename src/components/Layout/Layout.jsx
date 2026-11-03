import React, { useContext } from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import { data } from '../../Context/Counter'

export default function Layout() {
  let {count, setCount} = useContext(data);
  return (<>
    <Navbar/>
    <p>Outelt's inherited count: {count}</p>
    <Outlet/>
    <Footer/>
  </>)
}
