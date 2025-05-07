import Person from './Person'
const Filter = ({persons, newFilter, handleDelete}) => {
    const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
return (<div>{personsToShow.map((person) => (
          <Person key={person.key} person={person} handleDelete={handleDelete}/>
          ))}</div>)}

export default Filter