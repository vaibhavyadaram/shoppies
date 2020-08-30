import React, { useState, useRef } from "react"
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
  const [nomList, setNomList] = useState([])
  let buttonRef = useRef()
  const nominations = []

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
    displayResults(movieList)
  }

  const displayResults = movieList => {
    movieList.then(movies => {
      setSearchResults(movies.Search)
    })
  }

  const addMovie = selectedMovie => {
    nominations.push(selectedMovie)
    setNomList(nominations => [...nominations, selectedMovie])
  }

  const results = searchResults.map(movie => {
    if (nomList.includes(movie.Title) || nomList.length == 5) {
      return (
        <>
          <h1>{movie.Title}</h1>
          <h6>{movie.Year}</h6>
          <Button
            ref={buttonRef}
            disabled="disabled"
            onClick={() => addMovie(movie.Title)}
          >
            select
          </Button>
        </>
      )
    } else
      return (
        <>
          <h1>{movie.Title}</h1>
          <h6>{movie.Year}</h6>
          <Button ref={buttonRef} onClick={() => addMovie(movie.Title)}>
            select
          </Button>
        </>
      )
  })

  const removeNom = title => {
    //remove title from nomList array
  }

  const noms = nomList.map(movie => {
    return (
      <>
        <h4>{movie}</h4>
        <Button onClick={() => removeNom(movie)}>remove</Button>
      </>
    )
  })

  return (
    <>
      <Input type="text" id="movieTitle" placeholder="name" />
      <Button onClick={getSearchResults}>search</Button>
      {results}
      {noms}
    </>
  )
}

export default IndexPage
