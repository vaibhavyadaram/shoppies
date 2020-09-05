import React, { useState } from "react"
import styled from "styled-components"
import NoImage from "../images/noimage.png"

const PageContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 60vh 30vh;
  grid-gap: 20px;
  width: 100%;
  height: 100vh;
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
  opacity: 0.5;
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
  grid-template-rows: 60% 25% 15%;
  grid-gap: 0;
  margin-right: ${props => `${props.margin}`};
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
  color: ${props => `${props.color}`};
  font-size: 12px;
  text-align: center;
  align-self: center;
`

const MovieYear = styled.p`
  font-family: Inter-Regular;
  color: ${props => `${props.color}`};
  font-size: 12px;
  text-align: center;
  align-self: center;
`

const Select = styled.button`
  padding: 10px 15px 10px 15px;
  background-color: #d88e00;
  color: white;
  font-family: Inter-SemiBold;
  font-size: 12px;
  -webkit-appearance: none;
  box-sizing: content-box;
  border: none;
  transition: 0.2s;
  border-radius: 3px;

  &:hover {
    background-color: #f5c972;
    transition: 0.2s;
  }

  &:disabled {
    background-color: #6b6b6b;
    transition: 0.2s;
  }
`

const NominationPanel = styled.div`
  display: grid;
  grid-template-columns: 15% 85%;
  width: 90%;
  height: 100%;
  border: 5px dotted #483faf;
  background-color: white;
  align-self: center;
  border-radius: 20px;
  padding-top: 20px;
`

const NomsContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  padding: 0 0 0 0;
  &::-webkit-scrollbar {
    display: none;
  }
`

const Remove = styled.button`
  font-family: Inter-Regular;
  font-size: 12px;
  color: #606060;
  border: none;
  background: none;
`

const NomHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const NomHeader = styled.p`
  font-family: Inter-Bold;
  font-size: 18px;
  color: #606060;
  margin: 0 0 0 20px;
`

const TweetButton = styled.a`
  width: 80%;
  margin: 20px 0 0 20px;
  background-color: #00acee;
  color: white;
  border: none;
  font-family: Inter-SemiBold;
  font-size: 14px;
  transition: 0.2s;
  text-align: center;
  text-decoration: none;
  padding: 10px 0 10px 0;
  border-radius: 3px;
  &:hover {
    opacity: 0.5;
    transition: 0.2s;
  }
`

const ClearAll = styled.button`
  width: 80%;
  margin: 20px 0 0 20px;
  background-color: #606060;
  color: white;
  border: none;
  font-family: Inter-SemiBold;
  font-size: 14px;
  transition: 0.2s;
  text-align: center;
  text-decoration: none;
  padding: 10px 0 10px 0;
  border-radius: 3px;
  &:hover {
    opacity: 0.5;
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
  const [nomIDs, setNomIDs] = useState([])
  const nominations = []
  const idList = []
  const [emptySearch, setEmptySearch] = useState()
  const [disableTweet, setDisableTweet] = useState("disabled")

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
    setNomIDs([...nomIDs, selectedMovie.imdbID])
  }

  const removeNom = title => {
    if (nomList.includes(title)) {
      const titleIndex = nomList.indexOf(title)
      const newList = nomList
      newList.splice(titleIndex, 1)
      setNomList([...newList])

      const idIndex = nomIDs.indexOf(title.imdbID)
      const newIDList = nomIDs
      newIDList.splice(idIndex, 1)
      setNomIDs([...newIDList])
    }
  }

  const clearAllHandler = () => {
    const emptyList = []
    setNomList([...emptyList])
    setNomIDs([...emptyList])
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
    if (nomIDs.includes(movie.imdbID) || nomList.length === 5) {
      return (
        <MovieCardContainer key={movie.imdbID}>
          <MoviePoster src={isMoviePosterValid(movie.Poster)} />
          <MovieTitle color="white">
            {movie.Title} ({movie.Year})
          </MovieTitle>
          <Select disabled="disabled">Nominate</Select>
        </MovieCardContainer>
      )
    } else
      return (
        <MovieCardContainer key={movie.imdbID}>
          <MoviePoster src={isMoviePosterValid(movie.Poster)} />
          <MovieTitle color="white">
            {movie.Title} ({movie.Year})
          </MovieTitle>
          <Select onClick={() => addMovie(movie)}>Nominate</Select>
        </MovieCardContainer>
      )
  })

  const noms = movieList => {
    return (
      <>
        {movieList.map(movie => (
          <MovieCardContainer key={movie.imdbID}>
            <MoviePoster src={isMoviePosterValid(movie.Poster)} />
            <MovieTitle color="#606060">
              {movie.Title} ({movie.Year})
            </MovieTitle>
            <Remove onClick={() => removeNom(movie)}>Remove</Remove>
          </MovieCardContainer>
        ))}
      </>
    )
  }

  return (
    <>
      <PageContainer>
        <SearchContainer>
          <SearchBarWrapper>
            <SearchBar>
              <Input
                type="text"
                id="movieTitle"
                placeholder="Search for a movie"
              />
              <Button onClick={getSearchResults}>Search</Button>
            </SearchBar>
          </SearchBarWrapper>
          <SearchSubtitle>{searchTerm} </SearchSubtitle>
          <ResultsContainer>{results}</ResultsContainer>
        </SearchContainer>
        <NominationPanel>
          <NomHeaderContainer>
            <NomHeader>Your Nominations</NomHeader>
            <ClearAll onClick={clearAllHandler}>Clear All</ClearAll>
          </NomHeaderContainer>
          <NomsContainer>{noms(nomList)}</NomsContainer>
        </NominationPanel>
      </PageContainer>
    </>
  )
}

export default IndexPage
