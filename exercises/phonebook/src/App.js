import { useState} from 'react'

const Person = ({person}) => <li> {person.name} {person.number} </li>


const App = () => {

  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '040-1234567',
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (isDuplicate()) {
      alert(`${newName} is already added to the phonebook`)
      setPersons([...persons])
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber
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
      <form onSubmit={addPerson}>
        <div>
          name:
          <input
            onChange={handleNameChange}
            value={newName}
          />
        </div>
        <div>
          number:
          <input
            onChange={handleNumberChange}
            value={newNumber}
          />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <Person key={person.name} person={person} />)}
      </ul>
    </div>
  );
}

export default App;
