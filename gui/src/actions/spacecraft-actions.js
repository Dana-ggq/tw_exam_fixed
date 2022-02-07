import { SERVER } from '../config/global'

export const getSpacecrafts = (filterString, page, pageSize, sortField, sortOrder) => {
  return {
    type: 'GET_SPACECRAFTS',
    payload: async () => {
      const response = await fetch(`${SERVER}/api/spacecrafts?${filterString}&sortField=${sortField || ''}&sortOrder=${sortOrder || ''}&page=${page || ''}&pageSize=${pageSize || ''}`)
      const data = await response.json()
      return data
    }
  }
}

export const addSpacecrafts = (entity, filterString, page, pageSize, sortField, sortOrder) => {
  return {
    type: 'ADD_SPACECRAFTS',
    payload: async () => {
      let response = await fetch(`${SERVER}/api/spacecrafts`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(entity)
      })
      response = await fetch(`${SERVER}/api/spacecrafts?${filterString}&sortField=${sortField || ''}&sortOrder=${sortOrder || ''}&page=${page || ''}&pageSize=${pageSize || ''}`)
      const data = await response.json()
      return data
    }
  }
}

export const saveSpacecrafts = (id, entity, filterString, page, pageSize, sortField, sortOrder) => {
  return {
    type: 'SAVE_SPACECRAFTS',
    payload: async () => {
      let response = await fetch(`${SERVER}/api/spacecrafts/${id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(entity)
      })
      response = await fetch(`${SERVER}/api/spacecrafts?${filterString}&sortField=${sortField || ''}&sortOrder=${sortOrder || ''}&page=${page || ''}&pageSize=${pageSize || ''}`)
      const data = await response.json()
      return data
    }
  }
}

export const deleteSpacecrafts = (id, filterString, page, pageSize, sortField, sortOrder) => {
  return {
    type: 'DELETE_SPACECRAFTS',
    payload: async () => {
      let response = await fetch(`${SERVER}/api/spacecrafts/${id}`, {
        method: 'delete'
      })
      response = await fetch(`${SERVER}/api/spacecrafts?${filterString}&sortField=${sortField || ''}&sortOrder=${sortOrder || ''}&page=${page || ''}&pageSize=${pageSize || ''}`)
      const data = await response.json()
      return data
    }
  }
}

//IMPORT 
export const importSpacecrafts = (json, filterString, page, pageSize, sortField, sortOrder) => {
  return {
    type: 'IMPORT_SPACECRAFTS',
    payload: async () => {
      let response = await fetch(`${SERVER}/import`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(json)
      })
      response = await fetch(`${SERVER}/api/spacecrafts?${filterString}&sortField=${sortField || ''}&sortOrder=${sortOrder || ''}&page=${page || ''}&pageSize=${pageSize || ''}`)
      const data = await response.json()
      return data
    }
  }
}

// //EXPORT
export const exportSpacecrafts = () => {
  return {
    type: 'EXPORT_SPACECRAFTS',
    payload: async () => {
      let response = await fetch(`${SERVER}/export`)
      let data = await response.json()
      //console.log(data)
      return data
    }
  }
}
