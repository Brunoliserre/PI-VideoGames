import React from "react";
import { useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import { getGenres, getVideogames, postVideogame } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import styles from '../styles/CreateVideogames.module.css';


export default function CreateVideogame () {
    const dispatch = useDispatch();
    const history = useHistory();
    const genres = useSelector((state) => state.genres);
    const allVideogames = useSelector(state => state.videogames);

    const [input, setInput] = useState({
        name: '',
        createdByUser: true,
        description: '',
        image: '',
        releaseDate: '',
        rating: '',
        platforms: [],
        genres: []
    })

    useEffect(() => {
        dispatch(getGenres());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getVideogames());
    }, [dispatch]);

    //PLATFORMS SET
    const platformsArray = [];
    allVideogames.map(game => game.platforms?.map(platform => platformsArray.push(platform)));
    let platformsSet = [...new Set(platformsArray)];

    //HANDLECHANGE
    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }
    
    //HANDLE GENRES
    const handleSelectGenres = (e) => {
        setInput({
            ...input,
            genres: [...new Set([...input.genres, e.target.value])]
        })
    }

    //HANDLE PLATFORMS STATE
    const handleSelectPlatforms = (e) => {
        setInput({
            ...input,
            platforms: [...new Set([...input.platforms, e.target.value])]
        })
    }

    //HANDLE DELETE GENRES
    const handleGenresDelete = (e) => {
        setInput({
            ...input,
            genres: input.genres.filter(genre => genre !== e)
        })
    }

    //HANDLE DELETE PLATFORMS
    const handlePlatformsDelete = (e) => {
        setInput({
            ...input,
            platforms: input.platforms.filter(platform => platform !== e)
        })
    }
    
    //HANDLE SUBMIT
    const handleSubmit = (e) => {
        e.preventDefault();
    
        //VALIDATOR
        if(!input.name){
            return alert('Name is required');
        } else if(!input.description){
            return alert('Description is required');
        } else if(!input.rating || input.rating < 1 || input.rating > 5){
            return alert('Enter a rating between 1 and 5');
        } else if(!input.platforms.length){
            return alert('At least one platform is required');
        } else if(!input.genres.length){
            return alert('At least one genre is required');
        }
        
        dispatch(postVideogame(input));

        alert('Videogame created successfully!');

        setInput({
            name: '',
            createdByUser: true,
            description: '',
            image: '',
            releaseDate: '',
            rating: '',
            platforms: [],
            genres: []
        })

        history.push('/home') //Redirijo cuando ya creo el personaje
        
    }

    //HANDLE HOME
    const handleClickHome = () => {
        history.push('/home');
    }

    return(
        <div className={styles.backgroundCreate} >
            <div className={styles.container}>
            <h2 className={styles.formTitle}>CREATE YOUR VIDEOGAME</h2>
            <div>
                    <button className={styles.buttonHome} onClick={handleClickHome}>
                        Home
                    </button>
            
            </div>
            <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>                
                <p className={styles.formText}>Please Complete</p>
                <p className={styles.formText2}>(The options with * are required)</p>
                
                {/*NAME*/}
                <div className={styles.formContainer}>
                    <div className={styles.formGroup}>                     
                     <input className={styles.formInput}                     
                        type= 'text'
                        value= {input.name}
                        placeholder=' '
                        name= 'name'
                        onChange={(e) => handleChange(e)}
                     />  
                     <label className={styles.labels}>Name:*</label>
                     <span className={styles.formLine}></span>
                     

                    {/*DESCRIPTION*/}
                    <div className={styles.formGroup}>
                    <input className={styles.formInputDesc}
                        type= 'text'
                        value= {input.description}
                        placeholder=' '
                        name= 'description'
                        onChange={(e) => handleChange(e)}
                    />
                    <label className={styles.labelsDesc}>Description:*</label>  
                    <span className={styles.formLine}></span>
                    </div>

                    </div>
                
                    {/*RELEASE DATE*/}
                    <div className={styles.formGroup}>
                    <input className={styles.formInput}
                        type= 'date'
                        value= {input.releaseDate}
                        placeholder=' '
                        name= 'releaseDate'
                        onChange={(e) => handleChange(e)}
                    />
                    <label className={styles.labels}>Release Date</label>
                    <span className={styles.formLine}></span>
                    </div>

                    {/*IMAGE*/}
                    <div className={styles.formGroup}>
                    <input className={styles.formInput}
                        type= 'text'
                        value= {input.text}
                        placeholder=' '
                        name= 'image'
                        onChange={(e) => handleChange(e)}
                    />
                    <label className={styles.labels}>Image:</label>
                    <span className={styles.formLine}></span>
                    </div>

                    {/*RATING*/}
                    <div className={styles.formGroup}>
                    <input  className={styles.formInput}
                        type='number' 
                        name='rating' 
                        onChange={(e) => handleChange(e)} placeholder=' '></input>
                    <label className={styles.labels}>Rating:</label>
                    <span className={styles.formLine}></span>
                    </div>

                    {/*PLATFORMS*/}
                    <div className={styles.formGroup}>
                    <label className={styles.labels}>Platforms:*</label>
                    <div className={styles.platformGenre}>
                        <select onChange={(e) => handleSelectPlatforms(e)}>
                            {
                            platformsSet.map(platform => (
                            <option key={platform} value={platform}>{platform}</option>
                            ))
                            }
                        </select>
                    </div>
                    <span className={styles.formLine}></span>
                    </div>

                    {/*GENRES*/}
                    <div className={styles.formGroup}>
                    <label className={styles.labels}>Genres:*</label>
                    <div className={styles.platformGenre}>
                        <select onChange={(e) => handleSelectGenres(e)}>
                            {
                            genres.map(genre => (
                                <option key={genre.id} value={genre.name}>{genre.name}</option>
                            ))
                            }
                        </select>
                    </div>
                    <span className={styles.formLine}></span>
                    </div>
                    
                    {/*DELETE*/}
                    <div className={styles.deleteText}>
                    <p>Platforms and Genres have been selected. </p>
                    <p> If you want to remove an option, click on its name below</p>
                    </div>
                    <div className={styles.platformsAndGenresSelected}>
                    <div className={styles.genreSelected}>
                    <div>
                        <h3 className={styles.h3selected}>Platforms Selected:</h3>
                        <div>
                            {
                                input.platforms.map(platform => (
                                    <div>
                                        <p className={styles.deleteGenreOrPlatform} onClick={() => handlePlatformsDelete(platform)}>{platform}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                        <h3 className={styles.h3selected}>Genres Selected:</h3>
                        <div>
                            {
                                input.genres.map(genre => (
                                    <div>
                                        <p className={styles.deleteGenreOrPlatform} onClick={() => handleGenresDelete(genre)}>{genre}</p>
                                    </div>
                                ))
                            }
                        </div>
                        
                    </div>                    
                </div>
                </div>
                
                <div className={styles.createCenter}>
                <button className={styles.createButton} type='submit' >Create</button>
                </div>
            </form>

            </div>
            
        </div>



    )



}