const instalState = {
    searchLine: [],
    movies: [],
    favMovies: [],
    idList: '',
}

function reduser(state = instalState, action) {
    switch (action.type) {
        case 'SEARCH':
            const searchLine = action.payload.searchLine;
            console.log(searchLine);

            return {
                ...state,
                searchLine: action.payload.searchLine
            }
            break;
        case 'ADD_TO_FAVS':
            const favAction = action.payload;
            console.log(favAction);
            const arr = [...state.favMovies];
            let fav = arr.find(item => item.id === action.payload.id)
            if (fav) {
                return state;
            }
            else {
                arr.push(favAction);
            }
            return {
                ...state,
                favMovies: arr,
            }
            break;
        case 'DELETE_FROM_FAVS':
            const favs = [...state.favMovies];
            const newFilms = favs.filter(
                item => item.id !== action.payload.id
            );
            return {
                ...state,
                favMovies: newFilms,
            };
            break;
        case 'GET_LIST_ID':
            return {
                ...state,
                idList: action.payload.idList,
            }
            break;
    }
    return instalState;
}

export default reduser;