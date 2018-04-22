import axios from 'axios'

// const baseUrl = 'http://localhost:3001/api/persons' 
const baseUrl = '/api/persons' 

const getAll = () => axios.get(baseUrl)

const create = (newObject) => axios.post(baseUrl, newObject)

const updateOne = (id, newObject) => axios.put(`${baseUrl}/${id}`, newObject)

const deleteOne = (id) => axios.delete(`${baseUrl}/${id}`)

export default { getAll, create, updateOne, deleteOne }