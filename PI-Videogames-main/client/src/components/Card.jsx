import React from 'react';
import { NavLink } from 'react-router-dom';
//import styles from '../styles/Card.module.css';

export default function Card({name, image, genres, rating, id}) {
    return(
        <div /*className={styles.card}*/>
            <h3>{name}</h3>
            <img src={image} alt='img not found' width='200px' height='250px'/> 
            <h4>{rating}</h4>
            <h5>{genres}</h5>
            <NavLink /*className={styles.details}*/ to={`/videogame/${id}`}>
                <h3>{'Details'}</h3>
            </NavLink>
        </div>
    )
}