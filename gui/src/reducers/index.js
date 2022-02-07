import { combineReducers } from 'redux'
import spacecraft from './spacecraft-reducer'
import astronaut from './astronaut-reducer'
import exported from './export-reducer'

export default combineReducers({
  spacecraft,
  astronaut,
  exported
})