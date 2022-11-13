import React from 'react';

export default function Pagination ({videogamesPerPage, allVideogames, pagination}) {
    const pageNumber = []

    for (let i =0; i <= Math.ceil(allVideogames/videogamesPerPage); i++) {
        pageNumber.push(i+1);
    }

    return(
        <nav>
            <ul className='pagination'>
                {pageNumber && 
                 pageNumber.map(number => (
                    <li className='number' key={number}>
                    <a onClick={()=> pagination(number)}>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}