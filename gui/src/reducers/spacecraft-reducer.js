const INITIAL_STATE = {
    spacecrafts: [],
    count: 0,
    error: null,
    fetching: false,
    fetched: false
  }
  

  export default function reducer (state = INITIAL_STATE, action) {
    switch (action.type) {
      case 'GET_SPACECRAFTS_PENDING':
      case 'ADD_SPACECRAFTS_PENDING':
      case 'SAVE_SPACECRAFTS_PENDING':
      case 'DELETE_SPACECRAFTS_PENDING':
      case 'IMPORT_SPACECRAFTS_PENDING':
        return { ...state, error: null, fetching: true, fetched: false }
      case 'GET_SPACECRAFTS_FULFILLED':
      case 'ADD_SPACECRAFTS_FULFILLED':
      case 'SAVE_SPACECRAFTS_FULFILLED':
      case 'DELETE_SPACECRAFTS_FULFILLED':
      case 'IMPORT_SPACECRAFTS_FULFILLED':
        return { ...state, spacecrafts: action.payload.records, count: action.payload.count, error: null, fetching: false, fetched: true }
      case 'GET_SPACECRAFTS_REJECTED':
      case 'ADD_SPACECRAFTS_REJECTED':
      case 'SAVE_SPACECRAFTS_REJECTED':
      case 'DELETE_SPACECRAFTS_REJECTED':
      case 'IMPORT_SPACECRAFTS_REJECTED':
        return { ...state, spacecrafts: [], error: action.payload, fetching: false, fetched: true }
      default:
        return state
    }
  }