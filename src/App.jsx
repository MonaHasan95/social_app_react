import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import NotFound from './components/NotFound/NotFound';
import Profile from './components/Profile/Profile';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import { DataProvider } from './Context/Counter';

function App() {
  let routerMap = createBrowserRouter([
    {path:'', element:<Layout/>, children:[
      {index:true, element:<Home/>},
      {path:'profile', element:<Profile/>},
      {path:'login', element:<Login/>},
      {path:'register', element:<Register/>},
      {path:'*', element:<NotFound/>},
    ]},
  ]);
  return (
    <>
    <DataProvider>
      <RouterProvider router={routerMap}></RouterProvider>
    </DataProvider>
    </>
  )
}

export default App
