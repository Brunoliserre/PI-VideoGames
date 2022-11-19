import React, {useEffect} from "react";
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getDetail, resetDetail} from '../actions';
import styles from '../styles/Details.module.css';

export default function Details(props){
    const dispatch = useDispatch();

    //ComponentDidMount
    useEffect(() => {
        dispatch(getDetail(props.match.params.id))
    }, [dispatch])

    const videogame = useSelector(state => state.detail)

    //Component will unmount
    useEffect(() => {
        return() => {
            dispatch(resetDetail())
        }
    }, [])
    
    return(
        <div className={styles.background}>
            {
                <div>
                    <div  className={styles.container}>
                    <h1>{videogame.name}</h1>
                    <img src={videogame.image}></img>
                    </div>
                    <div className={styles.description} dangerouslySetInnerHTML={{ __html: videogame.description }}></div>
                    <div className={styles.container2}>
                    <h4>RATING: {videogame.rating}</h4>
                    <h5>GENRES: {videogame.genres}</h5>
                    <h5>RELEASE DATE: {videogame.releaseDate}</h5>
                    <h5>PLATFORMS: {videogame.platforms}</h5>
                    </div>
                </div>
                
            }
            <div className={styles.centerButton}>
            <Link to='/home'>
                <button className={styles.button}>GO BACK</button>
            </Link>
            </div>
        </div>
    )
}