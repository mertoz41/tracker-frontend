const initialState = {
    currentUser: null,
    shownProject: null
}

function reducer(state = initialState, action ){
    switch(action.type){
        case "LOG_USER_IN":
            return {currentUser: action.currentUser};
        case "LOG_USER_OUT":
            return {...state, currentUser: null};
        case "ADD_NEW_PROJECT":
            return {...state, currentUser: action.currentUser};
        case "SHOW_PROJECT":
            return {...state, shownProject: action.shownProject};
        case "CLEAN_PROJECT":
            return {...state, shownProject: null};
        default: 
            return state
    }
}

export default reducer