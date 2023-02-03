import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const deletePerson = (id, setNotification, person) => {
  axios
    .delete(`${baseUrl}/${id}`)
    .catch(error => {
      setNotification({
        style: 'error',
        content: `Information of ${person.name} has already been removed from server`
      })
      setTimeout(() => {
        setNotification({
          style: null,
          content: null
        })
      }, 5000)
    })
} 

const personService = { getAll, create, update, deletePerson }
export default personService
