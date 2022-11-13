import React from 'react';
import {Link} from 'react-router-dom';

export default function Landing(){
    return(
        <>
            <h1>Welcome</h1>
            <Link to='/home'>
                <button>Start</button>
            </Link>
        </>
    )
}
