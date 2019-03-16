export default (state = [], action) => {
    switch (action.type) {
      case "FETCH_FEATURES":
        return [...state, action.payload];
      default:
        return state;
    }
  };
  