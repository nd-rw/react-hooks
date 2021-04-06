// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import { PokemonForm, fetchPokemon, PokemonDataView, PokemonInfoFallback } from '../pokemon'

function PokemonInfo({ pokemonName }) {


  // 🐨 Have state for the pokemon (null)
  const [state, setState] = React.useState({
    status: 'idle',
    pokemon: null,
    error: null,
  })
  const { status, pokemon, error } = state


  React.useEffect(() => {
    if (pokemonName === '') {
      return
    } else {
      // this resets the result to show the loading/no pokemon value after consecutive searches
      setState({
        status: 'idle',
        pokemon: null,
        error: null,
      });

      fetchPokemon(pokemonName).then(pokemonData => {
        setState(
          {
            status: 'resolved',
            pokemon: pokemonData,
            error: null
          }
        )
      }).catch(error => setState({
        status: 'rejected',
        pokemon: null,
        error: error,
      }))
    }
  }, [pokemonName])

  const ErrorMesssage = ({ error }) => {
    return <div role="alert">
      There was an error: <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
      <pre style={{ whiteSpace: 'normal' }}>Status: {status}</pre>
    </div>
  }

  const Info = () => {
    if (error) {
      return <ErrorMesssage error={error} />
    }
    if (pokemonName !== '' && pokemon !== null) {
      return <PokemonDataView pokemon={pokemon} />
    }
    else if (pokemonName !== '' && pokemon === null) {
      return <PokemonInfoFallback name={pokemonName} />
    }
    else if (pokemonName === '' && pokemon === null) {
      return <>Submit a pokemon</>
    }
  }

  return <Info />
}


function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
