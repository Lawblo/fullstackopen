import {useState} from 'react'

const Statistics = ({good, neutral, bad}) => {
    const all = (good + neutral + bad)
    const average = (good + bad * -1) / (good + bad + neutral)
    const positive = good / (good + neutral + bad)*100

    if (good || neutral || bad) {
        return (
            <div>
                <StatisticsLine text='good' value = {good}/>
                <StatisticsLine text='neutral' value = {neutral}/>
                <StatisticsLine text='bad' value = {bad}/>
                <StatisticsLine text='all' value = {all}/>
                <StatisticsLine text='average' value = {average}/>
                <StatisticsLine text='positive' value = {positive}/>
            </div>
        )
    }
    else {
        return (
            <div>
                <p>No feedback given</p>
            </div>
        )
    }
}

const Button = ({handleClick, text}) => {
    return (
        <button onClick={handleClick}> {text} </button>
    )
}
const StatisticsLine = ({text, value}) => {
    return (
        <p>{text}: {value}</p>
    )
}

const App = () => {

    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)


    return (
        <div>
            <h1>give feedback</h1>
            <Button handleClick={() => setGood(good + 1)} text='good'/>
            <Button handleClick={() => setNeutral(neutral + 1)} text='neutral'/>
            <Button handleClick={() => setBad(bad + 1)} text='bad'/>
            <h1>statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

export default App;
