const INITIAL_STATE = {
    databse: [],
    error: null,
    fetching: false,
    fetched: false
  }
  
  //import si export nu stiu ce sa zic de ele

  export default function reducer (state = INITIAL_STATE, action) {
    switch (action.type) {
      case 'EXPORT_SPACECRAFTS_PENDING':
        return { ...state, error: null, fetching: true, fetched: false }
      case 'EXPORT_SPACECRAFTS_FULFILLED':
        return { ...state, databse: action.payload, error: null, fetching: false, fetched: true }
      case 'EXPORT_SPACECRAFTS_REJECTED':
        return { ...state, databse: [], error: action.payload, fetching: false, fetched: true }
      default:
        return state
    }
  }