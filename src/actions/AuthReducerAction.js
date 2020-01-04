const AuthReducerAction = (x) => {
    return {
        type: 'loggedIn',
        payload: x
    }
}

export default AuthReducerAction;