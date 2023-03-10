const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')

const Person = require('./models/person')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

const unknownEndpoint = (request, response, next) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

morgan.token('request_data', request => JSON.stringify(request.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :request_data'))


app.get('/', (request, response) => {
  response.redirect('/api/persons')
})

app.get('/api/persons', (request, response) => {
  '3.1'
  Person
    .find({})
    .then(persons => {
      response.json(persons)
    })
})

app.get('/info', (request, response) => {
  '3.2'
  html_content = `
  <p>Phonebook has info for ${persons.length} people</p>
  <p>${Date()}</p>
  `
  response.send(html_content)
})

app.get('/api/persons/:id', (request, response) => {
  '3.3'
  const id = Number(request.params.id)
  person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  }
  else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  '3.4'
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  '3.5, 3.6'

  const body = request.body

  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({
      error: 'name and number is required.'
    })
  } 

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {

    response.json(savedPerson)
  })
})

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
