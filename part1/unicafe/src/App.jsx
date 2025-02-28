import { useState } from "react";

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const StatisticLine = (props) => {
  return (
    <tr><td>{props.text}</td><td>{props.value}</td></tr>
  )
}
const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad;
  const average = all ? (good - bad) / all : 0;
  const positive = all ? (good / all) * 100 : 0;
  if (all == 0)
    return (<><h1>statistics</h1>
    No feedback given</>);
  else
  {
  return (<><h1>statistics</h1>
  <table><tbody>
    <StatisticLine text="good" value={good} />
    <StatisticLine text="neutral" value={neutral} />
    <StatisticLine text="bad" value={bad} />
    <StatisticLine text="average" value={average} />
    <StatisticLine text="positive" value={positive} /></tbody></table>
    </>);
  }
}


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
  
  return (
    <>
    <h1>give feedback</h1>
      <Button handleClick={() => incGood(good, setGood)} text="good" />
      <Button handleClick={() => incNeutral(neutral, setNeutral)} text="neutral" />
      <Button handleClick={() => incBad(bad, setBad)} text="bad" />
    <Statistics good={good} neutral={neutral} bad={bad}/>
    </>
  );
};

export default App;
