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
            <h3 className={styles.cardTitle}>{name}</h3>
            <img className={styles.cardImage} src={image} alt='img not found'/> 
            <h4 className={styles.text}>{rating}</h4>
            <h5 className={styles.text}>{genres}</h5>
            <div className={styles.details}>
                <button onClick={e=>{handleClickDetails(e)}} className={styles.details}>
                  Details
                </button>
            </div>
        </div>
    )
}