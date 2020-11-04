const initialState = {
    currentUser: null,
    userProjects: []
}

function reducer(state = initialState, action ){
    switch(action.type){
        case "LOG_USER_IN":
            return {currentUser: action.currentUser};
        case "LOG_USER_OUT":
            return {...state, currentUser: null};
        case "ADD_NEW_PROJECT":
            return {...state, userProjects: action.userProjects};
        default: 
            return state
    }
}

export default reducer