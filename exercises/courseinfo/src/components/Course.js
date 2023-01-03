const DisplayParts = ({parts}) => (
    parts.map(part => <Part key={part.id} part={part} />)
)

const Part = ({part}) => <p>{part.name} {part.exercises}</p>

const TotalExercises = ({ parts }) => {
    const totalNum = parts.reduce(
        (previous, part) => previous + (part.exercises), 0
    )

    return (
        <p><strong>total of {totalNum} exercises</strong></p>
    )
}

const Course = ({course}) => {
    return (
        <div>
            <h1>{course.name}</h1>
            <DisplayParts parts={course.parts}/>
            <TotalExercises parts={course.parts}/>
        </div>
    )
}

export default Course
