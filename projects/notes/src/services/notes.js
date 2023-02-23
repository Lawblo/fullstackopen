import axios from 'axios'
const baseUrl = '/api/notes'

const getAll = () => {
  const fakeNote = {
    content: 'Test note',
    imporant: true,
    id: 1234
  }
  return axios
    .get(baseUrl)
    .then(res => res.data.concat(fakeNote))
}

const create = newObject => {
  return axios
    .post(baseUrl, newObject)
    .then(res => res.data)
}

const update = (id, newObject) => {
  return axios
    .put(`${baseUrl}/${id}`, newObject)
    .then(res => res.data)
}

export default { getAll, create, update }
