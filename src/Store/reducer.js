const initialState = {
  searchValue: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SELECT_INPUT_VALUE":
      return {
        ...state,
        searchValue: action.search
      };
    default:
      return state;
  }
};

export default reducer;
