import { useState, useEffect } from 'react'
import noteService from './services/persons.js'


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

    noteService
      .getAll()
      .then(initialNotes => setPersons(initialNotes))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (isDuplicate()) {
      alert(`${newName} is already added to the phonebook`)
      setNewName('')
      setNewNumber('')
      return 
    }

    const personObject = {
      name: newName,
      number: newNumber,
    }

    noteService
      .create(personObject)
      .then( newObject => {
        setPersons(persons.concat(newObject))
        setNewName('')
        setNewNumber('')
      }
    )
  }

  const handleChange = (event, stateSetter) => {
    stateSetter(event.target.value)
  }

  const isDuplicate = () => {
    if (persons
      .filter( person => person.name === newName)
      .length > 0)
      return true
    return false
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <FormInput
          title={'filter shown with'}
          handleChange={event => handleChange(event, setNewFilter)}
          newValue={nameFilter}
        />
      </form>
      <h3>Add a new person</h3>
      <form onSubmit={addPerson}>
         <FormInput 
            title={'name'}
            handleChange={event => handleChange(event, setNewName)}
            newValue={newName}
          />
          <FormInput
            title={'number'}
            handleChange={event => handleChange(event, setNewNumber)}
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
