const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('build'))

const unknownEndpoint = (req, res, next) => {
  res.status(404).send({error: 'unknown endpoint'})
}

morgan.token('req_data', req => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req_data'))

persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (req, res) => {
  res.redirect('/api/persons')
})

app.get('/api/persons', (req, res) => {
  '3.1'
  res.send(persons)
})

app.get('/info', (req, res) => {
  '3.2'
  html_content = `
  <p>Phonebook has info for ${persons.length} people</p>
  <p>${Date()}</p>
  `
  res.send(html_content)
})

app.get('/api/persons/:id', (req, res) => {
  '3.3'
  const id = Number(req.params.id)
  person = persons.find(person => person.id === id)
  if (person) {
    res.json(person)
  }
  else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  '3.4'
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  '3.5, 3.6'

  const body = req.body

  if(!body.name || !body.number) {
    return res.status(400).json({
      error: 'name and number is required.'
    })
  } else if (persons.find(person => person.name === body.name)){
    return res.status(400).json({
      error: `name must be unique`
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random()*100000000000)
  }

  persons = persons.concat(person)
  res.json(person)

})

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
