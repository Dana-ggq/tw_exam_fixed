const INITIAL_STATE = {
    astronauts: [],
    error: null,
    fetching: false,
    fetched: false
}

export default function (state = INITIAL_STATE, action){
    switch (action.type) {
        case 'GET_ASTRONAUTS_PENDING':
        case 'ADD_ASTRONAUTS_PENDING':
        case 'SAVE_ASTRONAUTS_PENDING':
        case 'DELETE_ASTRONAUTS_PENDING':
          return { ...state, error: null, fetching: true, fetched: false }
        case 'GET_ASTRONAUTS_FULFILLED':
        case 'ADD_ASTRONAUTS_FULFILLED':
        case 'SAVE_ASTRONAUTS_FULFILLED':    
        case 'DELETE_ASTRONAUTS_FULFILLED':
          return { ...state, astronauts: action.payload, fetching: false, fetched: true }
        case 'GET_ASTRONAUTS_REJECTED':
        case 'ADD_ASTRONAUTS_REJECTED':
        case 'SAVE_ASTRONAUTS_REJECTED':
        case 'DELETE_ASTRONAUTS_REJECT':
          return { ...state, astronauts: action.payload, fetching: false, fetched: false }
        default:
          return state
    }
}