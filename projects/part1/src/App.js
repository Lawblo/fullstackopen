import { useState } from 'react'

const Button = (props) => {
    return (
        <button onClick={props.handleClick}>
            {props.text}
        </button>
    )
}
const Display = props => <div>{props.value}</div>

const App = (props) => {
    const [value, setValue] = useState(10)

    const setToValue = (newValue) => () => {
        console.log('value now', newValue)
        setValue(newValue)
    }

    const setToValueAlt = (newValue) => {
        console.log('value now', newValue)
        setValue(newValue)
    }

    return (
        <div>
            <Display value={value}/>
            <Button handleClick={() => setToValueAlt(1000)} text={1000}/>
        </div>
    )
}

export default App
