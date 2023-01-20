import { useState, useEffect } from 'react'
import personService from './services/persons.js'


const Person = ({person, persons, setPersons}) => {
  const deletePerson = () => {
    personService.deletePerson(person.id)
    setPersons(persons.filter(p => p.id !== person.id))
  } 

  return (
    <p> {person.name} {person.number} <button onClick={deletePerson}>delete</button></p>
  )
}

const PersonForm = ({persons, setPersons, nameFilter}) => {
  return (
    <>
    {persons
      .filter(person => person.name
        .toLowerCase()
        .includes(nameFilter.toLowerCase()))
        .map(person => {
            return (
              <Person
                key={person.id}
                person={person}
                setPersons={setPersons}
                persons = {persons}
              /> 
            )
        })
    }
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
    personService
      .getAll()
      .then(initialNotes => setPersons(initialNotes))
  }, [])

  const addPerson = (event) => {
    if (!newName) return

    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber,
    }

    if (isDuplicate()) {
      const [existing] = persons.filter(person => {
        return person.name === newName
      })

      if (!window.confirm(`${existing.name} is already added to the phonebook,
        replace the old number with a new one?`)) {

        setNewName('')
        setNewNumber('')
        return 
      }

      personService
        .update(existing.id, personObject)
        .then(newObject => 
          setPersons(persons.map(person => person.id !== existing.id ? person : newObject))
        )
    }
    else {
      personService
        .create(personObject)
        .then( newObject => {
          setPersons(persons.concat(newObject))
        })
    }
    setNewName('')
    setNewNumber('')
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
      <PersonForm persons={persons} nameFilter={nameFilter} setPersons={setPersons}/>
    </div>
  );
}

export default App;
