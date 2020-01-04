const LinksReducer = (state = [], action) => {
    if (action.type === 'LinksReducer') {
        state = action.payload.slice()
    }
    else if (action.type === 'addLink') {
        state.push(action.payload);
    }
    return state
}

export default LinksReducer;