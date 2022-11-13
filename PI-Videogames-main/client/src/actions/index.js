import axios from 'axios';

export function getVideogames(){
    return async function(dispatch){
        let json = await axios.get('http://localhost:3001/videogames');
        return dispatch({
            type: 'GET_VIDEOGAMES', 
            payload: json.data 
        })
    }
};

export function filterByGenre(payload){
    return {
            type: 'FILTER_BY_GENRE', 
            payload
        }    
};

export function filterCreated(payload){
    return {
        type: 'FILTER_CREATED',
        payload
    }
};

export function alphabeticalOrder(payload){
    return {
        type: 'ALPHABETICAL_ORDER',
        payload
    }
};

export function orderByRating(payload){
    return {
        type: 'ORDER_BY_RATING',
        payload
    }
};

export function getNameVideogames(name){
    return async function (dispatch){
        try {
            let json = await axios.get('http://localhost:3001/videogames?name=' + name)
            return dispatch({
                type: 'GET_NAME_VIDEOGAMES',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
};




/*export function addVideogame(payload) {
    let post = {
        name: payload.name,
        description: payload.description,
        release: payload.release,
        raiting: payload.raiting,
        platforms: payload.platforms,
        genres: payload.genres
    }
    return function(){
        axios.post('http://localhost:3001/videogames', post)
    }
}*/