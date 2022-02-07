import { SERVER } from '../config/global'

export const getAstronauts = (pid) => {
    return {
      type: 'GET_ASTRONAUTS',
      payload: async () => {
        const response = await fetch(`${SERVER}/api/spacecrafts/${pid}/astronauts`)
        const data = await response.json()
        return data
      }
    }
  }
  
  export const addAstronauts = (entity, pid) => {
    return {
      type: 'ADD_ASTRONAUTS',
      payload: async () => {
        let response = await fetch(`${SERVER}/api/spacecrafts/${pid}/astronauts`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(entity)
        })
        response = await fetch(`${SERVER}/api/spacecrafts/${pid}/astronauts`)
        const data = await response.json()
        return data
      }
    }
  }
  
  export const saveAstronauts = (id, entity, pid) => {
    return {
      type: 'SAVE_ASTRONAUTS',
      payload: async () => {
        let response = await fetch(`${SERVER}/api/spacecrafts/${pid}/astronauts/${id}`, {
          method: 'put',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(entity)
        })
        response = await fetch(`${SERVER}/api/spacecrafts/${pid}/astronauts`)
        const data = await response.json()
        return data
      }
    }
  }
  
  export const deleteAstronauts = (id, pid) => {
    return {
      type: 'DELETE_ASTRONAUTS',
      payload: async () => {
        let response = await fetch(`${SERVER}/api/spacecrafts/${pid}/astronauts/${id}`, {
          method: 'delete'
        })
        response = await fetch(`${SERVER}/api/spacecrafts/${pid}/astronauts`)
        const data = await response.json()
        return data
      }
    }
  }