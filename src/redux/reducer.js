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
        case "ADD_DESCRIPTION":
            return {...state, shownProject: action.shownProject};
        case "UPDATE_ALL_PROJECTS":
            return {...state, currentUser: action.currentUser};
        default: 
            return state
    }
}

export default reducer