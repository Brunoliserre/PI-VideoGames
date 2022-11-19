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
            <h1 className={styles.title}>Welcome to the Videogame APP</h1>
            <div className={styles.container}>            
            <h2 className={styles.text}>Find your favorite videogame or create one!</h2>
            <br/>
            <h3>This project was created using React, Redux, Express, Sequelize</h3>
                <div className={styles.centerButton}>
                    <button className={styles.button} onClick={handleClick}>
                        START  
                    </button>
                </div>
            </div>
        </div>
    )
}
