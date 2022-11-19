import React from 'react';
import styles from '../styles/Pagination.module.css'

export default function Pagination ({videogamesPerPage, allVideogames, pagination}) {
    const pageNumber = []

    for (let i =0; i <= Math.ceil(allVideogames/videogamesPerPage); i++) {
        pageNumber.push(i+1);
    }

    return(
        <nav>
            <ul className={styles.container}>
                {pageNumber && 
                 pageNumber.map(number => (
                    <li className={styles.item} key={number} onClick={()=> pagination(number)}>
                    <a>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}