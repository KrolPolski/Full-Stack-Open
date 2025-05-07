import { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'
const App = () => {
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
    personService
      .create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
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
  
  const handleDelete = (id) => {
	console.log("We want to delete something with id of ", id)
	personService
		.deleteEntry(id)
	.then(() => {
		setPersons(persons.filter(person => person.id !== id))
	})
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
              newFilter={newFilter}
			  handleDelete={handleDelete}/>
      {/* <div>debug: {newName}</div> */}
    </div>
  )
}

export default App