const initialState = {
    userValue: ""
}

const reducer = (state = initialState, action) => {
    if (action.type === "SELECT_INPUT_VALUE") {
        return {
            ...state,
            userValue: state.userValue
        }
    }
    return state
}

export default reducer;