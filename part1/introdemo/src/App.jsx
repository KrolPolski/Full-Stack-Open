/*const Hello = (props) => {
  console.log(props);
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  );
}

const Footer = () => {
  return (
    <div>
      greeting app created by <a href='https://github.com/mluukkai'>mluukkai</a>
    </div>
  )
}*/
import { useState } from 'react'

const App = () => {
  const [ counter, setCounter ] = useState(0)
  console.log('rendering with counter value', counter);
  const Display = (props) => {
    return (
      <div>{props.counter}</div>
    )
  }
  const Button = (props) => {
    return (
      <button onClick={props.onClick}>
        {props.text}
      </button>
    )
  }
  const increaseByOne = () => {
    console.log('increasing, value before', counter);
    setCounter(counter + 1);
  }
  const decreaseByOne = () => {
    console.log('decreasing, value before', counter);
    setCounter(counter - 1);}
  const setToZero = () => {
    console.log('resetting to zero, value before', counter);
    setCounter(0);
  }
  return (
    <div>
      <Display counter={counter}/>
      <Button onClick={increaseByOne} text="plus" />
      <Button onClick={setToZero} text="zero"/> 
      <Button onClick={decreaseByOne} text="minus"/>
    </div>
    )
}

export default App;