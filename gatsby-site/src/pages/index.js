import React, { useState, useRef, useEffect } from "react"
import styled from "styled-components"
import NoImage from "../images/noimage.png"

const PageContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 10vh 50vh 40vh;
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
  grid-template-rows: 15% 15% 70%;
  width: 90%;
  height: 100%;
  background-color: #483faf;
  align-self: center;
  border-radius: 20px;
`

const SearchBarWrapper = styled.div`
  width: 100%;
  display: flex;

  justify-content: center;
`

const SearchBar = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  height: 25px;
  margin: 20px 0 0 0;
`

const SearchSubtitle = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 25px;
  margin: 20px 0 20px 40px;
  font-family: Inter-SemiBold;
  color: white;
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
  outline: none;
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
  outline: none;
  transition: 0.2s;
  background-color: #d88e00;
  color: white;

  &:hover {
    transition: 0.2s;
    background-color: #f5c972;
  }
`

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  padding: 0 40px 0 40px;
  &::-webkit-scrollbar {
    display: none;
  }
`

const MovieCardContainer = styled.div`
  display: grid;
  height: 90%;
  grid-template-rows: 60% 15% 10% 15%;
  grid-gap: 0;
  margin: 0 35px 0 0;
  justify-content: center;
  align-items: center;
  justify-items: center;
`

const MoviePoster = styled.img`
  height: 100%;
  width: auto;
  align-self: center;
`

const MovieTitle = styled.p`
  width: 170px;
  font-family: Inter-SemiBold;
  color: white;
  font-size: 12px;
  text-align: center;
  align-self: center;
`

const MovieYear = styled.p`
  font-family: Inter-Regular;
  color: white;
  font-size: 12px;
  text-align: center;
  align-self: center;
`

const Select = styled.button`
  width: 120px;
  height: 100%;
  background-color: #d88e00;
  color: white;
  font-family: Inter-SemiBold;
  font-size: 12px;
  -webkit-appearance: none;
  box-sizing: content-box;
  border: none;
  transition: 0.2s;

  &:hover {
    background-color: #f5c972;
    transition: 0.2s;
  }

  &:disabled {
    background-color: #6b6b6b;
    transition: 0.2s;
  }
`

const IndexPage = () => {
  const url =
    "http://www.omdbapi.com/?i=tt3896198&apikey=e4f7e31a&type=movie&s="
  const [searchResults, setSearchResults] = useState([])
  const [searchTerm, setSearchTerm] = useState(
    "Search for your favourite movies to nominate!"
  )
  const [nomList, setNomList] = useState([])
  const nominations = []
  const [emptySearch, setEmptySearch] = useState()

  const getSearchResults = () => {
    const movieTitle = document.getElementById("movieTitle").value
    setSearchTerm("Search results for: " + movieTitle)
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
      if (movies.Search != undefined) {
        setEmptySearch(false)
        setSearchResults(movies.Search)
      } else {
        setSearchTerm(
          "Hmmm, I couldn't find anything with that title! Try again!"
        )
        setEmptySearch(true)
      }
    })
  }

  const addMovie = selectedMovie => {
    nominations.push(selectedMovie.Title)
    setNomList(nominations => [...nominations, selectedMovie])
  }

  const removeNom = title => {
    if (nomList.includes(title)) {
      const titleIndex = nomList.indexOf(title)
      const newList = nomList
      newList.splice(titleIndex, 1)
      setNomList([...newList])
    }
  }

  const isMoviePosterValid = poster => {
    if (poster == "N/A") {
      return NoImage
    } else {
      return poster
    }
  }

  const results = searchResults.map(movie => {
    if (emptySearch) {
      setSearchResults([])
    }
    if (nomList.includes(movie) || nomList.length === 5) {
      return (
        <MovieCardContainer key={movie.imdbID}>
          <MoviePoster src={isMoviePosterValid(movie.Poster)} />
          <MovieTitle>{movie.Title}</MovieTitle>
          <MovieYear>{movie.Year}</MovieYear>
          <Select disabled="disabled">Nominate</Select>
        </MovieCardContainer>
      )
    } else
      return (
        <MovieCardContainer key={movie.imdbID}>
          <MoviePoster src={isMoviePosterValid(movie.Poster)} />
          <MovieTitle>{movie.Title}</MovieTitle>
          <MovieYear>{movie.Year}</MovieYear>
          <Select onClick={() => addMovie(movie)}>Nominate</Select>
        </MovieCardContainer>
      )
  })

  const noms = movieList => {
    return (
      <>
        {movieList.map(movie => (
          <div key={movie.imdbID}>
            <h4>{movie.Title}</h4>
            <Button onClick={() => removeNom(movie)}>remove</Button>
          </div>
        ))}
      </>
    )
  }

  // const link =
  //   "https://twitter.com/intent/tweet?text=My%20Shoppies%20picks%20are:%20" +
  //   nomList[0] +
  //   "%20" +
  //   nomList[1] +
  //   "%20" +
  //   nomList[2] +
  //   "%20" +
  //   nomList[3] +
  //   "%20" +
  //   nomList[4]

  return (
    <>
      <PageContainer>
        <Title>The Shoppies</Title>
        <SearchContainer>
          <SearchBarWrapper>
            <SearchBar>
              <Input
                type="text"
                id="movieTitle"
                placeholder="Django Unchained"
              />
              <Button onClick={getSearchResults}>Search</Button>
            </SearchBar>
          </SearchBarWrapper>
          <SearchSubtitle>{searchTerm} </SearchSubtitle>
          <ResultsContainer>{results}</ResultsContainer>
        </SearchContainer>
      </PageContainer>
      <div></div>
      {noms(nomList)}
    </>
  )
}

export default IndexPage
