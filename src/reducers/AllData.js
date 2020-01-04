const AllData = (state = [], action) => {
    if (action.type === 'AllData') {
        state = action.payload.slice();
    }
    else if (action.type === 'AddRecord') {
        state.unshift(action.payload)
    }
    else if (action.type === 'UpdateData') {
        state[action.payload.index] = action.payload;
    }
    else if(action.type === 'DeleteData'){
        state.splice(action.payload, 1);
    }
    return state;
}

export default AllData;