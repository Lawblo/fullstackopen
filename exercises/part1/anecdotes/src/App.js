import { useState } from "react";

const Button = ({handleClicks, text}) => (
    <button onClick={handleClicks}> {text} </button>
)

const DisplayAnecdote = ({anecdote}) => {
    return (<p>{anecdote}</p>)
} 

const DisplayScore = ({score}) => {
    return (
        <p> has {score} votes</p>
    )
}

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
    ]

    const [selected, setSelected] = useState(0)
    const [scores, setScores] = useState(new Array(anecdotes.length).fill(0))


    const changeAnecdote = () => {
        setSelected(Math.floor(Math.random()* anecdotes.length))
    }

    const castVote = () => {
        const copy = [...scores]
        copy[selected] += 1
        setScores(copy)
    }
    return (
        <div>
        <DisplayAnecdote anecdote={anecdotes[selected]} />
        <DisplayScore score={scores[selected]} />
        <Button handleClicks={() => castVote()} text='vote'/>
        <Button handleClicks={() => changeAnecdote()} text='next anecdote'/>
        </div>
    )
}


export default App;
