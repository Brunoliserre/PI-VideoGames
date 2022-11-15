import React from "react";
import { useState, useEffect} from 'react';
import { Link, useHistory } from "react-router-dom";
import { getGenres, getVideogames, postVideogame } from "../actions";
import { useDispatch, useSelector } from "react-redux";

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

    //Set de platforms
    const platformsArray = [];
    allVideogames.map(game => game.platforms?.map(platform => platformsArray.push(platform)));
    let platformsSet = [...new Set(platformsArray)];

    //Handle para ir llenando el estado con los cambios
    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }
    
    //Hande para ir cambiando el estado de genres
    const handleSelectGenres = (e) => {
        setInput({
            ...input,
            genres: [...new Set([...input.genres, e.target.value])]
        })
    }

    //Hande para ir cambiando el estado de platforms
    const handleSelectPlatforms = (e) => {
        setInput({
            ...input,
            platforms: [...new Set([...input.platforms, e.target.value])]
        })
    }

    //Handle submit
    const handleSubmit = (e) => {
        e.preventDefault();

       /* if(!input.name){
            return alert('Name is required');
        } else if(!input.description){
            return alert('Description is required');
        } else if(!input.releaseDate){
            return alert('Release date is required');
        } else if(!input.rating || input.rating < 1 || input.rating > 5){
            return alert('Enter a rating between 1 and 5');
        } else if(!input.platforms.length){
            return alert('At least one platform is required');
        } else if(!input.genres.length){
            return alert('At least one genre is required');
        }*/
        
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


    return(
        <div>
            <Link to='/home'><button>Go back to home</button></Link>
            <h1>Create your Videogame</h1>
            <form  type='submit' onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Name:</label>
                    <input 
                        type= 'text'
                        value= {input.name}
                        name= 'name'
                        onChange={(e) => handleChange(e)}
                    />
                    <label>Description:</label>
                    <input
                        type= 'text'
                        value= {input.description}
                        name= 'description'
                        onChange={(e) => handleChange(e)}
                    />
                    <label>Released Date:</label>
                    <input
                        type= 'date'
                        value= {input.releaseDate}
                        name= 'releaseDate'
                        onChange={(e) => handleChange(e)}
                    />
                    <label>Image:</label>
                    <input
                        type= 'text'
                        value= {input.name}
                        name= 'name'
                        onChange={(e) => handleChange(e)}
                    />
                    <label>Rating:</label>
                    <input
                        type= 'number'
                        value= {input.rating}
                        name= 'number'
                        onChange={(e) => handleChange(e)}
                    />
                    <label>Platforms:</label>
                    <div>
                        <select onChange={(e) => handleSelectPlatforms(e)}></select>
                            {
                            platformsSet.map(platform => (
                            <option key={platform} value={platform}>{platform}</option>
                            ))
                            }
                        <select/>
                    </div>
                    <label>Genres:</label>
                    <div>
                        <select onChange={(e) => handleSelectGenres(e)}>
                            {
                            genres.map(genre => (
                                <option key={genre.id} value={genre.name}>{genre.name}</option>
                            ))
                            }
                        </select>
                    </div>
                </div>

                <button>CREATE</button>
            </form>
        </div>



    )



}