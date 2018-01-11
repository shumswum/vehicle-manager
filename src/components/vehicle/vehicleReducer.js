const defaultState = {
    vehicles: []
}

export default function vehicleReducer(state = defaultState, action) {
    const { type, payload } = action;

    switch(type) {
        case 'GET_FULFILLED': {
            return {
                ...state,
                vehicles: payload.data
            }
        }

        default: {
            return state;
        }
    }
}