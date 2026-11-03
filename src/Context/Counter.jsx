import { createContext } from "react";
import { useState } from "react";

export let data = createContext();

export function DataProvider(props) {
    
    let [count, setCount] = useState(10);
    return <data.Provider value = { { count, setCount } }>
        {props.children}
    </data.Provider>
}
