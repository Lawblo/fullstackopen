import { useState, useEffect } from 'react'
import axios from 'axios'


const Person = ({person}) => <p> {person.name} {person.number} </p>

const PersonForm = ({persons, nameFilter}) => {
  return (
    <>
    {persons
      .filter(person => 
        person.name
        .toLowerCase()
        .includes(nameFilter.toLowerCase()))
      .map(person => <Person key={person.id} person={person} />)}
    </>
  )
}

const FormInput = ({title, handleChange, newValue}) => {
  return (
    <div>
      {title + ': '} 
      <input
        onChange={handleChange}
        value={newValue}
      />
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (isDuplicate()) {
      alert(`${newName} is already added to the phonebook`)
      setPersons([...persons])
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(personObject))
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const isDuplicate = () => {
    const duplicateFound = persons.filter(
      person => person.name === newName
    )
    if (duplicateFound.length > 0) {
      return true
    }
    return false
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <FormInput
          title={'filter shown with'}
          handleChange={handleFilterChange}
          newValue={nameFilter}
        />
      </form>
      <h3>Add a new person</h3>
      <form onSubmit={addPerson}>
         <FormInput 
            title={'name'}
            handleChange={handleNameChange}
            newValue={newName}
          />
          <FormInput
            title={'number'}
            handleChange={handleNumberChange}
            newValue={newNumber}
          />
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h3>Numbers</h3>
      <PersonForm persons={persons} nameFilter={nameFilter} />
    </div>
  );
}

export default App;
