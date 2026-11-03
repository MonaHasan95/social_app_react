import React, {useContext} from 'react'
import { data } from '../../Context/Counter'

export default function Home() {

  let x = useContext(data);  

  return (<>
    <div>Home Componenet</div>
  </>)
}
