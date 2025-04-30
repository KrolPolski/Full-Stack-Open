import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { key: 'Arto Hellas',
      name: 'Arto Hellas',
      number: '040-123456'
    },
    {
      key: 'Ada Lovelace', 
      name: 'Ada Lovelace',
      number: '39-44-5323523'
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const addName = (event) => {
    event.preventDefault()

    const nameExists = persons.some(person => person.name === newName)
    if (nameExists)
    {
      alert(`${newName} is already in the phonebook`)
      return
    }
    console.log("button clicked", event.target)
    const nameObject = {
      key: newName,
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilter = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input 
                        value={newFilter}
                        onChange={handleFilter}/>
      <h2>Add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
                value={newName}
                onChange={handleNameChange}
                />
        </div>
        <div>
          number: <input
                  value={newNumber}
                  onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>{personsToShow.map((person) => (
          <p key={person.key}>{person.name} {person.number}</p>))}</div>
      {/* <div>debug: {newName}</div> */}
    </div>
  )
}

export default App