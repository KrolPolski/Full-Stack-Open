import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { key: 'Arto Hellas',
      name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
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
      name: newName
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
  }
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
                value={newName}
                onChange={handleNameChange}
                />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>{persons.map((person) => (
          <p key={person.key}>{person.name}</p>))}</div>
      <div>debug: {newName}</div>
    </div>
  )
}

export default App