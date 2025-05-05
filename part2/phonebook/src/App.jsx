import { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
const App = () => {
  // const [persons, setPersons] = useState([
  //   { key: 'Arto Hellas',
  //     name: 'Arto Hellas',
  //     number: '040-123456'
  //   },
  //   {
  //     key: 'Ada Lovelace', 
  //     name: 'Ada Lovelace',
  //     number: '39-44-5323523'
  //   }
  // ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [persons, setPersons] = useState([])
  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
      })
    }
    useEffect(hook, [])
    console.log('render', persons.length, 'persons')
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
  
  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input 
                        value={newFilter}
                        onChange={handleFilter}/>
      <h2>Add a new</h2>
     <PersonForm 
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Filter persons={persons}
              newFilter={newFilter}/>
      {/* <div>debug: {newName}</div> */}
    </div>
  )
}

export default App