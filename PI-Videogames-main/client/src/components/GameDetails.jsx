import React, {useEffect} from "react";
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getDetail, resetDetail} from '../../actions';

export default function Detail(props){
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
    }, [dispatch])
    
    return(
        <div>
            {
                <div>
                    <h1>{videogame.name}</h1>
                    <img src={videogame.image}></img>
                    <div className dangerouslySetInnerHTML={{ __html: videogame.description }}></div>
                    <h4>RATING: {videogame.rating}</h4>
                    <h5>GENRES: {videogame.genres}</h5>
                    <h5>RELEASE DATE: {videogame.releaseDate}</h5>
                    <h5>PLATFORMS: {videogame.platforms}</h5>
                </div>
                
            }
            <Link to='/home'>
                <button>GO BACK</button>
            </Link>
        </div>
    )
}