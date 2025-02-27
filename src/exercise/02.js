// useEffect: persistent state
// 💯 custom hook
// http://localhost:3000/isolated/final/02.extra-3.js

import * as React from 'react'

function useLocalStorageState(key, defaultValue = '') {
  console.log(defaultValue);
  const [state, setState] = React.useState(
    () => window.localStorage.getItem(key) || JSON.stringify(defaultValue),
  )

  React.useEffect(() => {
    window.localStorage.setItem(key, state)
  }, [key, state])

  return [state, setState]
}

function Greeting({ initialName = '' }) {
  const [name, setName] = useLocalStorageState('name', { bah: 2, bong: 4 })
  console.log(name);

  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
