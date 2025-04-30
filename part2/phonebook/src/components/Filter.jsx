import Person from './Person'
const Filter = ({persons, newFilter}) => {
    const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
return (<div>{personsToShow.map((person) => (
          <Person key={person.key} person={person}/>
          ))}</div>)}

export default Filter