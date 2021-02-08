// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'


function Greeting({ intialName = 'Joshua' }) { //setting default value for initialName
  const [name, setName] = React.useState(intialName);

  function handleChange(event) {
    setName(event.target.value);
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" value={name} />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting /> // could pass initialName here instead if you want
}

export default App
