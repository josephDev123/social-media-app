import { createContext } from "react";
const context = createContext();


export function SetContext({children}){
    
    return (
        <context.Provider value={}>
            {children}
        </context.Provider>
    )
}