const initialState = {
    currentUser: null,
    shownProject: null,
    userProjects: [],
    shownStory: {id: 1}
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
            return {...state, shownProject: null, shownStory: null};
        case "ADD_DESCRIPTION":
            return {...state, shownProject: action.shownProject};
        case "UPDATE_ALL_PROJECTS":
            return {...state, userProjects: action.userProjects};
        case "ADD_OBJECTIVE":
            return {...state, shownStory: action.shownStory};
        case "ADD_STORY":
            return {...state, shownProject: action.shownProject};
        case "UPDATED_PROJECT_DESCRIPTION":
            return {...state, shownProject: action.shownProject, userProjects: action.userProjects};
        case "SHOW_STORY":
            return {...state, shownStory: action.shownStory};
        case "CLEAR_STORY":
            return {...state, shownStory: null}
        case "DELETE_STORY":
            return {...state, shownProject: action.shownProject, userProjects: action.userProjects};
        case "DELETE_OBJECTIVE":
            return {...state, shownProject: action.shownProject, shownStory: action.shownStory};
        case "UPDATE_OBJ":
            let shownStory = state.shownStory
            let objIndex = shownStory.objectives.indexOf(shownStory.objectives.find(obj => obj.id == action.shownStory.id))
            shownStory.objectives.splice(objIndex, 1, action.shownStory)
            let updatedShownStory = {...shownStory}
            return {...state, shownStory: updatedShownStory};
        case "UPDATE_OBJ_PROGRESS":
            return {...state, shownStory: action.shownStory};
        default: 
            return state
    }
}

export default reducer