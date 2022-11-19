import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames, filterByGenre, filterCreated, alphabeticalOrder, orderByRating, getGenres } from '../actions';
import { useHistory } from 'react-router-dom';
import Card from './Card';
import Pagination from './Pagination';
import Searchbar from './SearchBar';
import styles from '../styles/Home.module.css';

export default function Home () {

    const dispatch = useDispatch();
    const allVideogames = useSelector((state) => state.videogames) //Almaceno todo lo que está en el state videogames
    const [orderAlph, setAlphaOrdered] = useState(''); //Estado local para el ordenamiento alfabético
    const [orderRating, setRatingOrder] = useState(''); //Estado local para el ordenamiento por rating
    const genres = useSelector((state) => state.genres)
    const history = useHistory();
    
    useEffect (() => {
        dispatch(getVideogames());
        dispatch(getGenres());
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
    

    //HANDLE REFRESHVIDEOGAMES
    let handleClick = (e) => {
        e.preventDefault();
        dispatch(getVideogames())
        setCurrentPage(1);
    }

    //HANDLE CREATEVIDEOGAMES
    const handleClickCreate = () => {
        history.push('/videogame');
    }

    //HANDLE GENREFILTER
    let handleFilterGenre = (e) => {
        dispatch(filterByGenre(e.target.value))
    }

    //HANDLE CREATORFILTER
    let handleFilterCreated = (e) => {
        dispatch(filterCreated(e.target.value))
    }

    //HANDLE ALPHASORT
    let handleAlphaSort= (e) => {
        e.preventDefault();
        dispatch(alphabeticalOrder(e.target.value))
        setCurrentPage(1);
        setAlphaOrdered(`Ordered ${e.target.value}`)
    }

    //HANDLE RATINGSORT
    let handleRatingSort= (e) => {
        e.preventDefault();
        dispatch(orderByRating(e.target.value))
        setCurrentPage(1);
        setRatingOrder(`Ordered ${e.target.value}`)
    }

    return (
        <div className={styles.background}>
            <h1>VIDEOGAMES APP</h1>
            
            

            <div className={styles.container}>                
                {/*SORT*/}
                <div className={styles.sort}>
                {/*ALPHASORT*/}
                <select onChange={e => handleAlphaSort(e)} className={styles.selectOrderSort}>
                    <option default>ALPHABETICALLY ORDERED</option>
                    <option value='asc'>A-Z</option>
                    <option value='desc'>Z-A</option>
                </select>
                {/*RATINGSORT*/}
                <select onChange={e => handleRatingSort(e)} className={styles.selectOrderSort}>
                    <option default>SORT BY RATING</option>
                    <option value='asc'>Best Rated</option>
                    <option value='desc'>Worst Rated</option>
                </select>
                </div>
                {/*FILTERS*/}
                <div className={styles.filters}>
                {/*GENREFILTERS*/}
                <select onChange={e => handleFilterGenre(e)} className={styles.selectOrderSort}>
                <option value='All' default>All</option>
                        {genres.map((g) => (
                            <option key={g.name} value={g.name}>{g.name}</option>                            
                        ))}
                </select>                
                {/*CREATORFILTERS*/}
                <select onChange={e => handleFilterCreated(e)} className={styles.selectOrderSort}>
                    <option default>CREATED BY...</option>
                    <option value='false'>API</option>
                    <option value='true'>User</option>
                </select>
                </div>                
            </div>

            {/*RELOAD AND CREATE VIDEOGAMES*/}
            <div className={styles.container2}>
                <button onClick={e=>{handleClickCreate(e)}} className={styles.reloadCreate}>
                Create Videogames
                </button>
                <button onClick={e=>{handleClick(e)}} className={styles.reloadCreate}>
                Reload Videogames
                </button>
            </div>
                
                {/*SEARCHBAR*/}
                <Searchbar/>

                {/*PAGINATION*/}
                <Pagination
                 videogamesPerPage = {videogamesPerPage}
                 allVideogames = {allVideogames.length}
                 pagination = {pagination}
                 />

                {/*CARDS*/}
                 <div className={styles.containerCards}>
                 {
                    currentVideogames?.map((game) => {
                        return (
                                game.error? <div>Videogame not found</div> :
                                <Card key={game.id} name={game.name} image={game.image} genres={game.genres} rating={game.rating} id={game.id}/>
                                
                        );
                    })
                 }
                 </div>
        </div>
        
    )  
}