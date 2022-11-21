import React from 'react';
import {useHistory} from 'react-router-dom';
import styles from '../styles/Landing.module.css';


export default function Landing(){

    const history = useHistory();
    const handleClick = () => {
        history.push('/home');
    }


    return(
        <div className={styles.background}>
            <h1 className={styles.title}>Welcome to my Videogame APP</h1>
            <div className={styles.container}>            
            <p className={styles.text}>Find your favorite videogame or create one!</p>
            
                <div className={styles.centerButton}>
                    <button className={styles.button} onClick={handleClick}>
                        START  
                    </button>
                </div>
            </div>
        </div>
    )
}
