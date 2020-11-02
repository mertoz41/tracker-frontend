const initialState = {
    currentUser: null 
}

function reducer(state = initialState, action ){
    switch(action.type){
        case "LOG_USER_IN":
            return {currentUser: action.currentUser};
        default: 
            return state
    }
}

export default reducer