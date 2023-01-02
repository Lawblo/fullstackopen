# 1c. Component State, Event Handlers

[[Home]](../README.md)

## Stateful Component

```javascript
import { useState } from 'react'

const App = () => {
  const [ counter, setCounter ] = useState(0)

  setTimeout(
    () => setCounter(counter + 1),
    1000
  )

  return (
    <div>{counter}</div>
  )
}

export default App
```

```useState``` return the current state and a function that rerenders the page
with the new state.

Calling a function that changes the state rerenders the page.  


## Event Handlers

Event handlers are registered to be called when specific events occur. In order
to work properly, event handlers needs to receive an argument evaluating to a
function to be executed when the specified event occurs. This means that it can 
not be a function call that evaluates to a value. It can however be a function call
that returns another function. The function call can be used in order to pass
arguments to the function to be called. 

