const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  );
};
const Part = (props) => {
  return (
  <p>
    {props.part.name} {props.part.exercise}
  </p>);};

 const Content = (props) => { 
    return ( 
      <div>
        <Part part={props.part1} exercise={props.exercises} />
        <Part part={props.part2} exercise={props.exercises} />
        <Part part={props.part3} exercise={props.exercises} />
      </div>
    );
  };


  const Total = (props) => {
    console.log("Ex1: " + props.exercises1);
    return (
      <><p>Number of exercises {props.part1.exercises + props.part2.exercises + props.part3.exercises}</p></>
    );
  };
  
  return (
    <div>
      <Header course={course}/>
      <Content part1={part1} part2={part2} part3={part3} />
      <Total part1={part1} part2={part2} part3={part3} />
    </div>
  )
}

export default App