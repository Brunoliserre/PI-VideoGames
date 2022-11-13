import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames, filterByGenre, filterCreated, alphabeticalOrder, orderByRating } from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card';
import Pagination from './Pagination';

export default function Home () {

    const dispatch = useDispatch();
    const allVideogames = useSelector((state) => state.videogames)
    const [orderAlph, setAlphaOrdered] = useState(''); //Estado local para el ordenamiento alfabético
    const [orderRating, setRatingOrder] = useState(''); //Estado local para el ordenamiento por rating


    useEffect (() => {
        dispatch(getVideogames());
        console.log(getVideogames)
    },[dispatch])
    

    //Paginado
    const [currentPage, setCurrentPage] = useState(1); //Declaro estado global. Empieza en 1 porque arranco en la página 1
    const [videogamesPerPage, setVideogamesPerPage] = useState(15) //Declaro estado local. Acá cuántos juegos voy a querer por página (15)
    const indexOfLastVideogame = currentPage * videogamesPerPage // Pag 1 (15)
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage // Pag 1 (0)
    const currentVideogames = allVideogames.slice(indexOfFirstVideogame,indexOfLastVideogame)//Me devuelve un arreglo que toma [0,15] en página 1 - Pag 2 [16-31].
    
    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber)
    }   

    //Handle Refresh
    let handleClick = (e) => {
        e.preventDefault();
        dispatch(getVideogames());
    }

    //Handle Filtro Genero
    let handleFilterGenre = (e) => {
        dispatch(filterByGenre(e.target.value))
    }

    //Handle Filtro Creado
    let handleFilterCreated = (e) => {
        dispatch(filterCreated(e.target.value))
    }

    //Handle Alpha Sort
    let handleAlphaSort= (e) => {
        e.preventDefault();
        dispatch(alphabeticalOrder(e.target.value))
        setCurrentPage(1);
        setAlphaOrdered(`Ordered ${e.target.value}`)
    }

    //Handle Rating Sort
    let handleRatingSort= (e) => {
        e.preventDefault();
        dispatch(orderByRating(e.target.value))
        setCurrentPage(1);
        setRatingOrder(`Ordered ${e.target.value}`)
    }

    return (
        <div>
            <Link to='/videogames'>Create Videogames</Link>
            <h1>VIDEOGAMES</h1>
            <button onClick={e=>{handleClick(e)}}>
                Reload Videogames
            </button>
            <div>
                <select onChange={e => handleAlphaSort(e)}>
                    <option value='asc'>A-Z</option>
                    <option value='desc'>Z-A</option>
                </select>
                <select onChange={e => handleRatingSort(e)}>
                    <option value='asc'>A-Z</option>
                    <option value='desc'>Z-A</option>
                </select>
                <select onChange={e => handleFilterGenre(e)}>
                    <option value='All'>All</option>
                    <option value='Indie'>Indie</option>
                    <option value='Shooter'>Shooter</option>
                    <option value='Simulation'>Simulation</option>
                    <option value='Racing'>Racing</option>
                    <option value='Massively Multiplayer'>MMO</option>
                    <option value='Strategy'>Strategy</option>
                    <option value='Puzzle'>Puzzle</option>
                    <option value='Sports'>Sports</option>
                    <option value='Adventure'>Adventure</option>
                    <option value='Arcade'>Arcade</option>
                    <option value='Fighting'>Fighting</option>
                    <option value='RPG'>RPG</option>
                    <option value='Casual'>Casual</option>
                    <option value='Platformer'>Platformer</option>
                </select>
                <select onChange={e => handleFilterCreated(e)}>
                    <option value='createdInDB'>Creado</option>
                    <option value='apiDB'>Existente</option>
                </select>

                <Pagination
                 videogamesPerPage = {videogamesPerPage}
                 allVideogames = {allVideogames.length}
                 pagination = {pagination}
                 />

                {currentVideogames?.map((v) => {
                    return (
                        <div>
                            <Link to={'/home/' + v.id}>
                                <Card name={v.name} image={v.image} genres={v.genres} key={v.id}/>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
        
    )  
}