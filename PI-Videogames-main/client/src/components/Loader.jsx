import React from "react";
import '../styles/Loader.css'

export default function Loader(){
    return(
        <div className='container'>
            <div className='lds-ring'><div></div><div></div><div></div><div></div></div>
        </div>
    )
}