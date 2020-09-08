import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NoImage from "../images/noimage.png";
import fav16 from "../images/favicon16.png";
import fav32 from "../images/favicon32.png";
import { gsap } from "gsap";
import { debounce } from "lodash";
import { Helmet } from "react-helmet";

const Title = styled.p`
  font-family: Inter-Bold;
  font-size: 34px;
  color: white;
`;

const TitleContainer = styled.div`
  width: 50%;
  text-align: right;
  justify-self: center;
  align-self: center;
  margin: 20px 40px 0 0;
  opacity: 0.7;
  @media (max-width: 800px) {
    display: none;
  }
`;

const PageContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 60vh 30vh;
  grid-gap: 20px;
  width: 100%;
  height: 100vh;
  justify-items: center;
  padding-top: 20px;
  @media (max-width: 800px) {
    grid-template-rows: 60vh auto;
  }
`;

const SearchContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 15% 15% 70%;
  width: 90%;
  height: 100%;
  background-color: #483faf;
  align-self: center;
  border-radius: 20px;
  border: none;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  @media (max-width: 800px) {
  }
`;

const SearchBarWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  @media (max-width: 800px) {
    justify-content: center;
  }
`;

const SearchBar = styled.div`
  display: flex;
  flex-direction: row;
  width: 50%;
  height: 25px;
  margin: 20px 0 0 40px;
  align-self: flex-start;
  justify-self: flex-start;
  @media (max-width: 800px) {
    margin: 20px 0 0 0;
    width: 80%;
  }
`;

const SearchSubtitle = styled.div`
  color: white;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 25px;
  margin: 20px 0 20px 40px;
  font-family: Inter-SemiBold;
  opacity: 0.5;
  @media (max-width: 800px) {
    justify-content: center;
    margin: 20px 0 0 0;
    text-align: center;
    font-size: 14px;
  }
`;

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
  @media (max-width: 800px) {
    border-radius: 10px 10px 10px 10px;
  }
`;

const Button = styled.button`
  -webkit-appearance: none;
  box-sizing: content-box;
  font-family: Inter-Regular;
  font-size: 14px;
  text-align: center;
  border: none;
  height: 25px;
  width: 30%;
  border-radius: 0px 10px 10px 0px;
  transition: 0.2s;
  background-color: #d88e00;
  color: white;

  &:hover {
    transition: 0.2s;
    background-color: #f5c972;
  }

  @media (max-width: 800px) {
    border-radius: 10px 10px 10px 10px;
    width: 25%;
    margin-left: 10px;
  }
`;

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
`;

const MovieCardContainer = styled.div`
  display: grid;
  height: 90%;
  grid-template-rows: 60% 25% 15%;
  grid-gap: 0;
  margin-right: ${(props) => `${props.margin}`};
  color: ${(props) => `${props.color}`};
  justify-content: center;
  align-items: center;
  justify-items: center;
  @media (max-width: 500px) {
    height: 250px;
  }
`;

const MoviePoster = styled.img`
  height: 100%;
  width: auto;
  align-self: center;
`;

const MovieTitle = styled.p`
  width: 170px;
  font-family: Inter-SemiBold;
  font-size: 12px;
  text-align: center;
  align-self: center;
`;

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
    margin-bottom: 3px;
  }

  &:disabled {
    background-color: #6b6b6b;
    transition: 0.2s;
  }
`;

const NominationPanel = styled.div`
  display: grid;
  grid-template-columns: 15% 85%;
  width: 90%;
  height: 100%;
  border: 5px dashed #483faf;
  background-color: white;
  align-self: center;
  border-radius: 20px;
  padding-top: 20px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    margin-bottom: 30px;
  }
`;

const NomsContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  padding: 0 40px 0 40px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Remove = styled.button`
  font-family: Inter-Regular;
  font-size: 12px;
  color: #606060;
  border: none;
  background: none;
  @media (max-width: 800px) {
    margin: 0;
  }
`;

const NomHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 800px) {
    align-items: center;
    margin-bottom: 30px;
  }
`;

const NomHeader = styled.p`
  font-family: Inter-Bold;
  font-size: 18px;
  color: #606060;
  margin: 0 0 0 20px;
  @media (max-width: 800px) {
    margin: 0;
  }
`;

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
  @media (max-width: 800px) {
    width: 40%;
    margin: 20px 0 0 0;
  }
`;

const Banner = styled.div`
  width: 500px;
  height: 100px;
  background-color: red;
  left: 0;
  right: 0;
  margin: 0px auto 0 auto;
  opacity: 0;
  display: none;
  position: absolute;
  z-index: 10;
  background-color: #483faf;
  border-radius: 15px;
  -webkit-box-shadow: 0px 0px 26px 3px rgba(0, 0, 0, 0.69);
  -moz-box-shadow: 0px 0px 26px 3px rgba(0, 0, 0, 0.69);
  box-shadow: 0px 0px 26px 3px rgba(0, 0, 0, 0.69);

  @media (max-width: 800px) {
    width: 90%;
    height: auto;
    padding: 0 0 30px 0;
  }
`;

const BannerContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 800px) {
    width: 80%;
    margin-left: 10%;
    height: auto;
    padding: 0 0 30px 0;
    text-align: center;
  }
`;

const BannerContent = styled.p`
  font-family: Inter-SemiBold;
  font-size: 22px;
  color: white;
`;

const Close = styled.button`
  font-family: Inter-Regular;
  font-size: 14px;
  color: white;
  background: none;
  border: none;
`;

const IndexPage = () => {
  const url =
    "https://www.omdbapi.com/?i=tt3896198&apikey=e4f7e31a&type=movie&s=";
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState(
    "Search for your favourite movies to nominate!"
  );
  const [nomList, setNomList] = useState([]);
  const [nomIDs, setNomIDs] = useState([]);
  const nominations = [];
  const [emptySearch, setEmptySearch] = useState();

  const submitSearch = debounce(() => {
    getSearchResults();
  }, 200);

  const getSearchResults = () => {
    const movieTitle = document.getElementById("movieTitle").value;
    setSearchTerm('Search results for: "' + movieTitle + '"');
    const movieList = fetch(url + movieTitle)
      .then((success) => success.json())
      .then((movies) => {
        return movies;
      })
      .catch((err) => {
        console.log(err);
      });
    displayResults(movieList);
  };

  const displayResults = (movieList) => {
    movieList.then((movies) => {
      if (movies.Search !== undefined) {
        setEmptySearch(false);
        setSearchResults(movies.Search);
      } else {
        setSearchTerm(
          "Hmmm, I couldn't find anything with that title! Try again!"
        );
        setEmptySearch(true);
      }
    });
  };

  const addMovie = (selectedMovie) => {
    nominations.push(selectedMovie.Title);
    setNomList((nominations) => [...nominations, selectedMovie]);
    setNomIDs([...nomIDs, selectedMovie.imdbID]);
  };

  const removeNom = (title) => {
    if (nomList.includes(title)) {
      const titleIndex = nomList.indexOf(title);
      const newList = nomList;
      newList.splice(titleIndex, 1);
      setNomList([...newList]);

      const idIndex = nomIDs.indexOf(title.imdbID);
      const newIDList = nomIDs;
      newIDList.splice(idIndex, 1);
      setNomIDs([...newIDList]);
    }
  };

  const clearAllHandler = () => {
    const emptyList = [];
    setNomList([...emptyList]);
    setNomIDs([...emptyList]);
  };

  const validatePoster = (poster) => {
    if (poster === "N/A") {
      return NoImage;
    } else {
      return poster;
    }
  };

  const results = searchResults.map((movie) => {
    if (emptySearch) {
      setSearchResults([]);
    }
    if (nomIDs.includes(movie.imdbID) || nomList.length === 5) {
      return (
        <MovieCardContainer
          className="searchContent"
          color="white"
          key={movie.imdbID}
        >
          <MoviePoster alt={movie.Title} src={validatePoster(movie.Poster)} />
          <MovieTitle>
            {movie.Title} ({movie.Year})
          </MovieTitle>
          <Select disabled="disabled">Nominate</Select>
        </MovieCardContainer>
      );
    } else
      return (
        <MovieCardContainer
          className="searchContent"
          color="white"
          key={movie.imdbID}
        >
          <MoviePoster alt={movie.Title} src={validatePoster(movie.Poster)} />
          <MovieTitle>
            {movie.Title} ({movie.Year})
          </MovieTitle>
          <Select onClick={() => addMovie(movie)}>Nominate</Select>
        </MovieCardContainer>
      );
  });

  const noms = (movieList) => {
    return (
      <>
        {movieList.map((movie) => (
          <MovieCardContainer
            className="NominationCard"
            color="#606060"
            key={movie.imdbID}
          >
            <MoviePoster alt={movie.Title} src={validatePoster(movie.Poster)} />
            <MovieTitle>
              {movie.Title} ({movie.Year})
            </MovieTitle>
            <Remove className="NominationCard" onClick={() => removeNom(movie)}>
              Remove
            </Remove>
          </MovieCardContainer>
        ))}
      </>
    );
  };

  const CloseBanner = () => {
    gsap.to("#Banner", {
      display: "none",
      marginTop: "0px",
      autoAlpha: 0,
      duration: 0.5,
    });
  };

  useEffect(() => {
    if (nomList.length > 4) {
      gsap.to("#Banner", {
        display: "block",
        marginTop: "50px",
        autoAlpha: 1,
        duration: 0.5,
      });
      gsap.to("#NominationPanel", {
        backgroundColor: "#483faf",
        border: "none",
        duration: 0.5,
      });
      gsap.to(".NominationCard", {
        color: "white",
        duration: 0.5,
      });
      gsap.to("#SearchContainer", {
        backgroundColor: "white",
        border: "5px dashed #483faf",
        duration: 0.5,
      });
      gsap.to(".searchContent", {
        color: "#606060",
        duration: 0.5,
      });
      gsap.to("#movieTitle", {
        backgroundColor: "#F1F1F1",
        duration: 0.5,
      });
      gsap.to("#Title", {
        color: "#606060",
        duration: 0.5,
        opacity: 1,
      });
    } else {
      gsap.to("#NominationPanel", {
        backgroundColor: "white",
        border: "5px dashed #483faf",
        duration: 0.5,
      });
      gsap.to(".NominationCard", {
        color: "#606060",
        duration: 0.5,
      });
      gsap.to("#SearchContainer", {
        backgroundColor: "#483faf",
        border: "none",
        duration: 0.5,
      });
      gsap.to(".searchContent", {
        color: "white",
        duration: 0.5,
      });
      gsap.to("#movieTitle", {
        backgroundColor: "white",
        duration: 0.5,
      });
      gsap.to("#Banner", {
        display: "none",
        marginTop: "0px",
        autoAlpha: 0,
        duration: 0.5,
      });
      gsap.to("#Title", {
        color: "white",
        duration: 0.5,
        opacity: 0.7,
      });
    }
  }, [nomList]);

  return (
    <>
      <Helmet
        link={[
          {
            rel: "icon",
            type: "image/png",
            sizes: "16x16",
            href: `${fav16}`,
          },
          {
            rel: "icon",
            type: "image/png",
            sizes: "32x32",
            href: `${fav32}`,
          },
          {
            rel: "stylesheet",
            href: "https://use.typekit.net/ggs2buq.css",
          },
        ]}
      >
        <title>The Shoppies</title>
      </Helmet>
      <Banner id="Banner">
        <BannerContentContainer>
          <BannerContent>You've nominated 5 movies! &#127881;</BannerContent>
          <Close onClick={CloseBanner}>Close</Close>
        </BannerContentContainer>
      </Banner>
      <PageContainer>
        <SearchContainer id="SearchContainer">
          <SearchBarWrapper>
            <SearchBar>
              <Input
                type="text"
                id="movieTitle"
                placeholder="Search for a movie"
                onKeyDown={submitSearch}
              />
              <Button onClick={getSearchResults}>Search</Button>
            </SearchBar>
            <TitleContainer>
              <Title id="Title">The Shoppies</Title>
            </TitleContainer>
          </SearchBarWrapper>
          <SearchSubtitle className="searchContent">
            {searchTerm}{" "}
          </SearchSubtitle>
          <ResultsContainer id="ResultsContainer">{results}</ResultsContainer>
        </SearchContainer>
        <NominationPanel id="NominationPanel">
          <NomHeaderContainer>
            <NomHeader className="NominationCard">Your Nominations</NomHeader>
            <ClearAll onClick={clearAllHandler}>Clear All</ClearAll>
          </NomHeaderContainer>
          <NomsContainer>{noms(nomList)}</NomsContainer>
        </NominationPanel>
      </PageContainer>
    </>
  );
};

export default IndexPage;
