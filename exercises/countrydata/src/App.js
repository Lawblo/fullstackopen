import axios from 'axios'
import { useEffect, useState } from 'react';

const DisplayCountries = ({countries, filter}) => {
  if (!countries.length) return <></>
  

  const filteredCountries = countries.filter(country => {
    const countryName = country.name.common
    return (countryName
      .toLowerCase()
      .includes(filter))
  })

  if (filteredCountries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }
  else if (filteredCountries.length > 1) {
    return (
      <div>
        {filteredCountries.map(country => {
          const countryName = country.name.common
          return (
            <div key={countryName}>
              <DisplayCountry country={country} showComponent={false}/>
            </div>
          )
        })}
        
      </div>
    )
  }
  else if (filteredCountries.length < 1) {
    return <p>No matches</p>
  }
  else {
    return (<DisplayCountry country={filteredCountries[0]} showComponent={true}/>)
  }
}

const DisplayCountry = ({country, showComponent }) => {
  const [state, setState] = useState(showComponent)

  const handleButtonClick = () => {
    setState(!state)
  }
  if (!state) return(
    <>
    {country.name.common}
    <button onClick={handleButtonClick}>show</button>
    </>
  ) 

  const languages = Object.values(country.languages)
  return (
    <div>
      <h1>{country.name.common}</h1>
      <button onClick={handleButtonClick}>hide</button>
      <p>capital: {country.capital}</p>
      <p>area: {country.area}</p>
      <p>population: {country.population}</p>
      <h2>languages: </h2>
      <ul>
        {languages.map(language => {
            return (
              <li key={country + language}>
                {language}
              </li>
            )
        })}
      </ul>
      <img src={country.flags.png}/>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState({})
  const [filter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value.toLowerCase())
  }

  return (
    <div>
      <form onChange={handleFilterChange}>
        find countries
        <input />
      </form>
      <DisplayCountries countries={countries} filter={filter}/>
    </div>
  )
}

export default App;
