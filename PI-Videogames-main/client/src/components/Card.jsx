import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Card({name, image, genres, rating, id}) {
    return(
        <div>
            <h3>{name}</h3>
            <img src={image} alt='img not found' width='200px' height='250px'/> 
            <h4>{rating}</h4>
            <h5>{genres}</h5>
            <NavLink to={`/videogame/${id}`}>
                <h3>{'Details'}</h3>
            </NavLink>
        </div>
    )
}