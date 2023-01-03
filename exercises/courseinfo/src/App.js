const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            }, 
            {
                name: 'State of components',
                exercises: 14
            }
        ]
    }

    return (
        <>
            <Header name={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>

        </>
    )
}

const Header = (props) => {
    return (
        <div>
            <h1>{props.name}</h1>
        </div>
    )
}

const Content = (props) => {
    return (
        <div>
            <p>{props.parts[0].name} {props.parts[0].exercises}</p>
            <p>{props.parts[1].name} {props.parts[1].exercises}</p>
            <p>{props.parts[2].name} {props.parts[2].exercises}</p>
        </div>
    )
}

const Total = (props) => {
    return (
        <div>
            <p>Number of exercises: {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
        </div>
    )
}
export default App

