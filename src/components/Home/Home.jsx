import React, {useContext} from 'react'
import { data } from '../../Context/Counter'

export default function Home() {

  let {count, setCount} = useContext(data);  

  return (<>
    <div>Home Componenet</div>
    <p>{count}</p> 
    <button onClick={()=>setCount(30)} className='bg-amber-400 text-white rounded-2xl p-3'>Click me</button>
  </>)
}
