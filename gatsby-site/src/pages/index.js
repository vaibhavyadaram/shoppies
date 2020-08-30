import React, { useState } from "react"
import styled from "styled-components"

const Input = styled.input`
  font-family: Arial;
  font-weight: 700;
  font-size: 20px;
  margin: 0 0 20px 0;
  text-align: center;
`

const Button = styled.button`
  font-family: Arial;
  font-weight: 700;
  font-size: 20px;
  margin: 0 0 20px 0;
  text-align: center;
  height: 50px;
  width: 150px;
  border: none;
`

const IndexPage = () => {
  const url = "http://www.omdbapi.com/?i=tt3896198&apikey=e4f7e31a&s="
  const [searchResults, setSearchResults] = useState([])

  const getSearchResults = () => {
    const movieTitle = document.getElementById("movieTitle").value
    const movieList = fetch(url + movieTitle)
      .then(success => success.json())
      .then(movies => {
        return movies
      })
      .catch(err => {
        console.log(err)
      })
    setSearchResults([])
    displayResults(movieList)
  }

  const displayResults = movieList => {
    movieList.then(movies => {
      movies.Search.map(movie => {
        setSearchResults(searchResults => [...searchResults, movie.Title])
      })
    })
  }

  const results = searchResults.map(movie => {
    return (
      <>
        <h1>{movie}</h1>
        <Button>select</Button>
      </>
    )
  })

  return (
    <>
      <Input type="text" id="movieTitle" placeholder="name" />
      <Button onClick={getSearchResults}>search</Button>
      {results}
    </>
  )
}

export default IndexPage
