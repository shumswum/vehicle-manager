const defaultState = {
  customers: []
};

export default function vehicleReducer(state = defaultState, action) {
  const { type, payload } = action;

  switch (type) {
    case "GET_FULFILLED": {
      return {
        ...state,
        customers: payload.data
      };
    }

    default: {
        return state;
    }
  }
}
