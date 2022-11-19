import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from '../styles/Card.module.css';

export default function Card({name, image, genres, rating, id}) {

    const history = useHistory();

    //HANDLE HISTORYDETAILS
    const handleClickDetails = () => {
        history.push(`/videogame/${id}`);
    }

    return(
        <div className={styles.cardContainer}>
            <h3>{name}</h3>
            <img src={image} alt='img not found' width='200px' height='250px'/> 
            <h4>{rating}</h4>
            <h5>{genres}</h5>
            <div className={styles.details}>
                <button onClick={e=>{handleClickDetails(e)}} className={styles.details}>
                  Details
                </button>
            </div>
        </div>
    )
}