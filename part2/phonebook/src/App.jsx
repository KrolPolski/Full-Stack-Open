import { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification from './components/Notification'
const App = () => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [persons, setPersons] = useState([])
  const [notificationMessage, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState('success')
  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
      })
      .catch(error => {
        setNotification('Unable to retrieve phone directory data')
        setNotificationType('error')
        setTimeout(() => {setNotification(null)}, 5000)
      })
    }
    useEffect(hook, [])
    console.log('render', persons.length, 'persons')
  const addName = (event) => {
    event.preventDefault()
    const nameExists = persons.some(person => person.name === newName)
    if (nameExists)
    {
      if (window.confirm(`${newName} is already in the phonebook. Do you want to replace the old number with a new one?`))
      {
        console.log("Confirmation to update received")
        const updateTarget = persons.find(person => person.name === newName)
        console.log("Update target is ", updateTarget)
        updateTarget.number = newNumber
        personService.update(updateTarget.id, updateTarget)
        .then(updateTarget => {
          setNewName('')
          setNewNumber('')
          setNotification(`${updateTarget.name}'s phone number has been successfully updated.`)
          setNotificationType('success')
          setTimeout(() => {setNotification(null)}, 5000)
        })
        .catch(updateTarget => {
          setNotification(`${newName}'s phone number could not be updated because it has already been removed from the server.`)
          setNotificationType('error')
          setTimeout(() => {setNotification(null)}, 5000)
        })
        return
      }
      else
      {
        console.log("Update operation unconfirmed.")
        setNotification(`${newName}'s record was not updated.`)
        setNotificationType('error')
        setTimeout(() => {setNotification(null)}, 5000)
        return
      }
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
        setNotification(`Added ${returnedPerson.name}`)
        setNotificationType('success') 
        setTimeout(() => {
          setNotification(null)
        }, 5000)       
      })
      .catch(error => {
        setNotification(`Unable to save phone directory data for ${nameObject.name}`)
        setNotificationType('error')
        setTimeout(() => {setNotification(null)}, 5000)})
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
  
  const handleDelete = (id, targetName) => {
	console.log("We want to delete something with id of ", id)
	if (window.confirm(`Are you sure you want to delete ${targetName}?`))
	{
	personService
		.deleteEntry(id)
	.then(() => {
		setPersons(persons.filter(person => person.id !== id))
    setNotification(`${targetName} has been successfully deleted from the phonebook.`)
    setNotificationType('success')
    setTimeout(() => setNotification(null), 5000)
	})
	.catch(error => {
        setNotification(`Failed to delete ${targetName} from the phonebook. It may have already been removed from the server.`)
        setNotificationType('error')
        setPersons(persons.filter(person => person.id !== id))
        setTimeout (() => setNotification(null), 5000)
  })}
  	else
	{
		console.log("No delete confirmation obtained, aborting delete")
	}
  }
  return (
    <div>
      <Notification message={notificationMessage} type={notificationType}/>
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