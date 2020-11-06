const initialState = {
    currentUser: null,
    shownProject: null,
    userProjects: []
}

function reducer(state = initialState, action ){
    switch(action.type){
        case "LOG_USER_IN":
            return {currentUser: action.currentUser, userProjects: action.userProjects};
        case "LOG_USER_OUT":
            return {...state, currentUser: null};
        case "ADD_NEW_PROJECT":
            return {...state, userProjects: action.userProjects};
        case "SHOW_PROJECT":
            return {...state, shownProject: action.shownProject};
        case "CLEAN_PROJECT":
            return {...state, shownProject: null};
        case "ADD_DESCRIPTION":
            return {...state, shownProject: action.shownProject};
        case "UPDATE_ALL_PROJECTS":
            return {...state, userProjects: action.userProjects};
        case "ADD_OBJECTIVE":
            return {...state, shownProject: action.shownProject, userProjects: action.userProjects};
        case "UPDATED_PROJECT_DESCRIPTION":
            return {...state, shownProject: action.shownProject, userProjects: action.userProjects};
        default: 
            return state
    }
}

export default reducer