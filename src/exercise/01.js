// Simple Data-fetching
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'
// 🐨 you'll also need to get the fetchPokemon function from ../pokemon:
import {
  PokemonDataView,
  fetchPokemon,
  PokemonErrorBoundary,
  PokemonInfoFallback,
} from '../pokemon'
import {createResource} from '../utils'

// const createResource = promise => {
//   let status = 'pending'
//   let result = promise.then(
//     resolved => {
//       status = 'resolved'
//       result = resolved
//     },
//     rejected => {
//       status = 'rejected'
//       result = rejected
//     },
//   )

//   return {
//     read() {
//       if (status === 'pending' || status === 'rejected') {
//         throw result
//       }
//       return result
//     },
//   }
// }

// 🐨 create a variable called "pokemon" (using let)
// let pokemon

// We don't need the app to be mounted to know that we want to fetch the pokemon
// named "pikachu" so we can go ahead and do that right here.
// 🐨 assign a pokemonPromise variable to a call to fetchPokemon('pikachu')
// const handleSuccess = result => (pokemon = result)

// let pokemonError
// // const handleFailure = error => console.error(error)
// const handleFailure = error => {
//   console.error(error)
//   pokemonError = error
// }

// const pokemonPromise = fetchPokemon('pikachi').then(
//   handleSuccess,
//   handleFailure,
// )
// 🐨 when the promise resolves, assign the "pokemon" variable to the resolved value
// 💰 For example: somePromise.then(resolvedValue => (someValue = resolvedValue))

const pokemonName = 'pikachu'

const pokemonResource = createResource(fetchPokemon(pokemonName))

function PokemonInfo() {
  const pokemon = pokemonResource.read()
  // if there's an error, then throw it!
  // if (pokemonError) throw pokemonError
  // 🐨 if there's no pokemon yet, then throw the pokemonPromise
  // 💰 (no, for real. Like: `throw pokemonPromise`)
  // if (!pokemon) throw pokemonPromise
  // if the code gets it this far, then the pokemon variable is defined and
  // rendering can continue!
  return (
    <div>
      <div className="pokemon-info__img-wrapper">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <PokemonDataView pokemon={pokemon} />
    </div>
  )
}

function App() {
  return (
    <div className="pokemon-info-app">
      <div className="pokemon-info">
        {/* 🐨 Wrap the PokemonInfo component with a React.Suspense component with a fallback */}
        <React.Suspense fallback={<PokemonInfoFallback name={pokemonName} />}>
          <PokemonErrorBoundary>
            <PokemonInfo />
          </PokemonErrorBoundary>
        </React.Suspense>
      </div>
    </div>
  )
}

export default App
