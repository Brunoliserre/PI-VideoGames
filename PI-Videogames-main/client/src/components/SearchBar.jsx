import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameVideogames } from "../actions";

export default function Searchbar(){
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    const handleInputChange = (e) => {
        e.preventDefault();
        setName(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getNameVideogames(name)); //Lo que escriba el usuario se va a guardar en nuestro estado local
        setName('');
    }

    return(
        <div>
        <input 
                    type='text' 
                    value={name}
                    placeholder='Search'
                    onChange={(e) => handleInputChange(e)}
        />
                <button onClick={(e) => handleSubmit(e)}>🔎</button>
        </div>
    )
}