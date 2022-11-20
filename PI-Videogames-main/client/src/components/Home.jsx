import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames, filterByGenre, filterCreated, alphabeticalOrder, orderByRating, getGenres } from '../actions';
import { useHistory } from 'react-router-dom';
import Card from './Card';
import Pagination from './Pagination';
import Searchbar from './SearchBar';
import Loader from './Loader';
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

    //HANDLE HISTORYVIDEOGAMES
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
            <div className={styles.navContainer}>
            <span className={styles.navTitle}>VIDEOGAMES APP</span>

            {/*RELOAD AND CREATE VIDEOGAMES*/} 
            <a>
                <button onClick={e=>{handleClickCreate(e)}} className={styles.reloadCreate}>
                Create Videogames
                </button></a>
            <a>
                <button onClick={e=>{handleClick(e)}} className={styles.reloadCreate}>
                Reload Videogames
                </button>
            </a>
            {/*SEARCHBAR*/}
            <p className={styles.searchbarNav}><Searchbar/></p>
            </div>  
            

            <div className={styles.container}>                
                <div className={styles.orderFilters}>
                {/*ALPHASORT*/}
                <select onChange={e => handleAlphaSort(e)} className={styles.selectOrderSort}>
                    <option default>Order by</option>
                    <option value='asc'>A-Z</option>
                    <option value='desc'>Z-A</option>
                    <option value='asc'>Best Rated</option>
                    <option value='desc'>Worst Rated</option>
                </select>                
                {/*GENREFILTERS*/}
                <select onChange={e => handleFilterGenre(e)} className={styles.selectOrderSort}>
                <option value='All' default>All Genres</option>
                        {genres.map((g) => (
                            <option key={g.name} value={g.name}>{g.name}</option>                            
                        ))}
                </select>                
                {/*CREATORFILTERS*/}
                <select onChange={e => handleFilterCreated(e)} className={styles.selectOrderSort}>
                    <option default>Created by...</option>
                    <option value='false'>API</option>
                    <option value='true'>User</option>
                </select>
                </div>                
            </div>               
                

            {/*CARDS*/}                             
                <div className={styles.containerCards}>
                {   
                    currentVideogames.length ?
                    currentVideogames?.map((game) => {
                        return (
                                game.error? <div className={styles.errorContainer}><h2 >Videogame not found</h2></div> 
                                :
                                <Card key={game.id} name={game.name} image={game.image} genres={game.genres} rating={game.rating} id={game.id}/>
                        );
                    })      
                    
                    :
                    <div className={styles.loader}>
                        <Loader />                        
                    </div>
                }
                </div>

            {/*PAGINATION*/}
                <div>
                {
                    currentVideogames.length ? 
                    <Pagination
                    videogamesPerPage = {videogamesPerPage}
                    allVideogames = {allVideogames.length}
                    pagination = {pagination}
                    />
                    :
                    <div className={styles.loader}>
                        <Loader />                        
                    </div>

                }
                </div>
                
        </div>
        
    )  
}