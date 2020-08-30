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
  const [searchUrl, setUrl] = useState()
  const [searchResults, setSearchResults] = useState([])

  //get search term from input
  const clickHandler = () => {
    const movieTitle = document.getElementById("movieTitle").value
    setUrl(url + movieTitle)
    displayResults()
  }

  //fetch search results
  const getSearchResults = () => {
    const movieList = fetch(searchUrl)
      .then(success => success.json())
      .then(movies => {
        return movies
      })
      .catch(err => {
        console.log(err)
      })

    return movieList
  }

  //display search results
  const displayResults = () => {
    getSearchResults().then(movies => {
      movies.Search.map(movie => {
        setSearchResults(searchResults => [...searchResults, movie.Title])
        console.log("worked!")
      })
    })
    console.log("worked x2!")
  }

  return (
    <>
      <Input type="text" id="movieTitle" placeholder="name" />
      <Button onClick={clickHandler}>search</Button>
      {searchResults.map(movie => {
        return (
          <>
            <h1>{movie}</h1>
            <Button>select</Button>
          </>
        )
      })}
    </>
  )
}

export default IndexPage
