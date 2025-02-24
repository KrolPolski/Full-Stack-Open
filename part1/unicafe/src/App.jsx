import { useState } from "react";

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  
  const incGood = () => {
    console.log("Good Event handler fires, before: ", good);
    setGood(good + 1);
  };
  const incNeutral = () => {
    console.log("Neutral Event handler fires, before: ", neutral);
    setNeutral(neutral + 1);
  };
  const incBad = () => {
    console.log("Bad Event handler fires, before: ", bad);
    setBad(bad + 1);
  };
  const all = good + neutral + bad;
  const average = all ? (good - bad) / all : 0;
  const positive = all ? (good / all) * 100 : 0;
  return (
    <>
    <h1>give feedback</h1>
      <Button handleClick={() => incGood(good, setGood)} text="good" />
      <Button handleClick={() => incNeutral(neutral, setNeutral)} text="neutral" />
      <Button handleClick={() => incBad(bad, setBad)} text="bad" />
    <h1>statistics</h1>
    <p>good {good}</p>
    <p>neutral {neutral}</p>
    <p>bad {bad}</p>
    <p>all {all}</p>
    <p>average {average}</p>
    <p>positive {positive}%</p>
    </>
  );
};

export default App;
