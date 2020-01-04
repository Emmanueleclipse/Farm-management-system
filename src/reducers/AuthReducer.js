const AuthReducer = (state = false, action) => {
    if(action.type === 'loggedIn'){
        state = action.payload
    }
    return state;
}

export default AuthReducer;