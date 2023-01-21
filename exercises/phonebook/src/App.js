import './index.css'
import { useState, useEffect } from 'react'
import personService from './services/persons.js'

const Notifications = ({content, style}) => {
  return (
    <div className={style}>
      <p>{content}</p>
    </div>
  )
}

const Person = ({person, persons, setPersons, setNotification}) => {
  const deletePerson = () => {
    personService.deletePerson(person.id, setNotification, person) 
    setPersons(persons.filter(p => p.id !== person.id))
  } 

  return (
    <p> {person.name} {person.number} <button onClick={deletePerson}>delete</button></p>
  )
}

const PersonForm = ({persons, setPersons, nameFilter, setNotification}) => {
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
                setNotification={setNotification}
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
  const [notification, setNotification] = useState({style: null, content: null})

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

      setNotification({
        style: 'message',
        content: `Updated number for ${newName}`
      })
      setTimeout(() => {
        setNotification({
          style: null,
          content: null
        })
      }, 5000)

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
      setNotification({
        style: 'message',
        content: `Added ${newName}`
      })
      setTimeout(() => {
        setNotification({style: null, content: null})
      }, 5000)
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
      <Notifications content={notification.content} style={notification.style}/>
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
      <PersonForm
        persons={persons}
        nameFilter={nameFilter}
        setPersons={setPersons}
        setNotification={setNotification}
      />
    </div>
  );
}

export default App;
