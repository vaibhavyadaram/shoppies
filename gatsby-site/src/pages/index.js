import React, { useState, useRef, useEffect } from "react"
import styled from "styled-components"

const SearchBar = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  height: 25px;
  margin: 20px 0 0 0;
`

const Input = styled.input`
  -webkit-appearance: none;
  font-family: Inter-Regular;
  font-size: 14px;
  text-align: left;
  width: 90%;
  height: 100%;
  border-radius: 10px 0px 0px 10px;
  border: none;
  padding-left: 10px;
`

const Button = styled.button`
  -webkit-appearance: none;
  box-sizing: content-box;
  font-family: Inter-Regular;
  font-size: 14px;
  text-align: center;
  border: none;
  height: 25px;
  width: 10%;
  border-radius: 0px 10px 10px 0px;
`

const PageContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 10vh 45vh 45vh;
  width: 100%;
  justify-items: center;
`

const Title = styled.div`
  font-size: 30px;
  height: 100%;
  display: flex;
  justify-content: center;
  font-family: Inter-Bold;
`

const SearchContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 90%;
  height: 100%;
  background-color: #483faf;
  justify-items: center;
  align-self: center;
  border-radius: 25px;
`

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 0 0 0 100px;
  overflow-x: scroll;
  overflow-y: hidden;

  &::-webkit-scrollbar {
    display: none;
  }
`

const MovieCardContainer = styled.div`
  display: grid;
  grid-template-rows: 60% 20% 10% 10%;
  grid-gap: 0;
  width: 400px;
  margin: 0 50px 0 0;
  justify-content: center;
`

const MoviePoster = styled.img`
  height: 100%;
  width: auto;
  margin: 0;
`

const MovieTitle = styled.p`
  width: 100%;
  font-family: Inter-SemiBold;
  color: white;
  font-size: 14px;
  text-align: center;
  margin: 0;
`

const MovieYear = styled.p`
  font-family: Inter-Regular;
  color: white;
  font-size: 12px;
  text-align: center;
  margin: 0;
`

const IndexPage = () => {
  const url = "http://www.omdbapi.com/?i=tt3896198&apikey=e4f7e31a&s="
  const [searchResults, setSearchResults] = useState([])
  const [nomList, setNomList] = useState([])
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

  const removeNom = title => {
    if (nomList.includes(title)) {
      const titleIndex = nomList.indexOf(title)
      const newList = nomList
      console.log("before splice:" + newList)
      newList.splice(titleIndex, 1)
      console.log("after splice:" + newList)
      setNomList([...newList])
      console.log("nomList splice:" + nomList)
    }
  }

  useEffect(() => {
    console.log("useEffect: " + nomList)
  }, [nomList])

  const results = searchResults.map(movie => {
    if (nomList.includes(movie.Title) || nomList.length === 5) {
      return (
        <MovieCardContainer key={movie.Title}>
          <MoviePoster src={movie.Poster} />
          <MovieTitle>{movie.Title}</MovieTitle>
          <MovieYear>{movie.Year}</MovieYear>
          <Button disabled="disabled">select</Button>
        </MovieCardContainer>
      )
    } else
      return (
        <MovieCardContainer key={movie.Title}>
          <MoviePoster src={movie.Poster} />
          <MovieTitle>{movie.Title}</MovieTitle>
          <MovieYear>{movie.Year}</MovieYear>
          <Button onClick={() => addMovie(movie.Title)}>select</Button>
        </MovieCardContainer>
      )
  })

  const noms = movieList => {
    console.log("working!!")

    return (
      <>
        {movieList.map(movie => (
          <div key={movie}>
            <h4>{movie}</h4>
            <Button onClick={() => removeNom(movie)}>remove</Button>
          </div>
        ))}
      </>
    )
  }

  const link =
    "https://twitter.com/intent/tweet?text=My%20Shoppies%20picks%20are:%20" +
    nomList[0] +
    "%20" +
    nomList[1] +
    "%20" +
    nomList[2] +
    "%20" +
    nomList[3] +
    "%20" +
    nomList[4]

  return (
    <>
      <PageContainer>
        <Title>The Shoppies</Title>
        <SearchContainer>
          <SearchBar>
            <Input type="text" id="movieTitle" placeholder="Django Unchained" />
            <Button onClick={getSearchResults}>Search</Button>
          </SearchBar>
          <ResultsContainer>{results}</ResultsContainer>
        </SearchContainer>
      </PageContainer>

      <div></div>

      {noms(nomList)}
      {/* <a class="twitter-share-button" href={link} data-size="large">
        Tweet
      </a> */}
    </>
  )
}

export default IndexPage
