import { useState } from "react";

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const incGood = (good) => {
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
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <Button handleClick={() => incGood(good)} text="good" />
      <Button handleClick={() => incNeutral()} text="neutral" />
      <Button handleClick={() => incBad()} text="bad" />
    </>
  );
};

export default App;
