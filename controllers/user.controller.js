const { request, response } = require('express')

const getUsers = (req = request, res = response) => {
  // url/api/users/?name=Sergio&date=2022-01-25  -> query
  const { name, date } = req.query

  req.res.status(200).json({
    msg: 'Get - controller',
    name,
    date,
  })
}

const getUserById = (req = request, res = response) => {
  // url/api/users/25 -> Segmento: El 25 entra en el id
  const id = req.params.id
  res.json({
    msg: 'Usuario por id - controller',
    id,
  })
}

const createUser = (req = request, res = response) => {
  // url/api/users/ -> Body: Es el objeto en JSON
  const { name, lastname, age } = req.body
  res.status(201).json({
    msg: 'post API - controller',
    name,
  })
}

const updateUser = (req = request, res = response) => {
  const id = req.params.id
  const body = req.body

  res.json({
    msg: 'put API - controller',
    id,
    body,
  })
}

const deleteUser = (req = request, res = response) => {
  const id = req.params.id
  res.json({
    msg: 'delete API - Controller',
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}
