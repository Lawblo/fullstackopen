# 1 - Introduction to React

Initializing react app:

```bash
npx create-react-app [app-name]
```

Starting local webserver: 
```bash
npm start
```

By default the app runs on localhost port 3000 with the
adress http://localhost:3000

The code of the application resides in the *src* folder. 

## Basic app setup: 

### 'index.js':

```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
```

### 'App.js':

```javascript
const App = () => (
  <div>
    <p>Hello world</p>
  </div>
)

export default App
```
