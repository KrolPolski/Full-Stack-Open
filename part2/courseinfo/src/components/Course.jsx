const Course = (props) => {
    const course = props.course
    const Header = (props) => {
    return (
      <h1>{props.course.name}</h1>
    );
  };
  const Part = (props) => {
    return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>);};
  
   const Content = ({parts}) => { 
      return ( 
        <div>
          {parts.map((part, index) => <Part key={index} part={part}  />
          )}
        </div>
      );
    };
  
  
    const Total = ({parts}) => {
      //console.log("Ex1: " + props.parts[0].exercises);
      const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);
      return (
        <><p>Number of exercises {totalExercises}</p></>
      );
    };
  
    return (
      <div>
        <Header course={course}/>
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }

  export default Course