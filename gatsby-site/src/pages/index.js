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

  const clickHandler = () => {
    const movieTitle = document.getElementById("movieTitle").value
    setUrl(url + movieTitle)
    getSearchResults().then(movies => console.log(movies))
  }

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

  return (
    <>
      <Input type="text" id="movieTitle" placeholder="name" />
      <Button onClick={clickHandler}>search</Button>
      {/* {searchList} */}
    </>
  )
}

export default IndexPage
