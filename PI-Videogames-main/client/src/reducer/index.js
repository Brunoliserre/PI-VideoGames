const initialState = {
    videogames : []
};

export default function rootReducer (state= initialState, action){
    switch(action.type) {
        case 'GET_VIDEOGAMES':
            return{
                ...state,
                videogames: [...state.videogames, action.payload]
            }
        case 'FILTER_BY_GENRE':
            const allVideogames = state.allVideogames
            const ratingFiltered = action.payload === 'All' ? allVideogames : allVideogames.filter(el => el.genres === action.payload)
            return{
                ...state,
                videogames: ratingFiltered
            }
        case 'FILTER_CREATED':
            const createdFilter = action.payload === 'created' ? state.allGames.filter(el => el.createdInDb) : state.allVideogames.filter(el => !el.createdInDb)
            return {
                ...state,
                videogames: action.payload === 'All' ? state.allVideogames : createdFilter
            }     
        case 'ALPHABETICAL_ORDER':
            let sortedArr = action.payload === 'asc' ?
                state.videogames.sort(function(a,b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (b.name > a.name) {
                        return -1;
                    }
                    return 0;
                }) :
                state.videogames.sort(function(a,b){
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                characters: sortedArr
            } 
            case 'ORDER_BY_RATING':
            let sortedArr2 = action.payload === 'asc' ?
                state.videogames.sort(function(a,b) {
                    if (a.rating > b.rating) {
                        return 1;
                    }
                    if (b.rating > a.rating) {
                        return -1;
                    }
                    return 0;
                }) :
                state.videogames.sort(function(a,b){
                    if (a.rating > b.rating) {
                        return -1;
                    }
                    if (b.rating > a.rating) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                characters: sortedArr2
            }   
            case 'GET_NAME_VIDEOGAMES':
                return {
                    ...state,
                    videogames: action.payload
                }            
            default:
                 return {...state}        
    }    
};