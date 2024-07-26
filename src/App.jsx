import react from 'react'
import {useEffect, useState} from 'react'
import "./App.css"
import SearchIcon from "./search.svg"
import MovieCard from "./MovieCard.jsx"

//54e20bf9

const API_URL = "http://www.omdbapi.com?apikey=54e20bf9"

const movie1 = {
    "Title": "Fighting, Flying and Driving: The Stunts of Spiderman 3",
    "Year": "2007",
    "imdbID": "tt1132238",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNTI3NDE1ZmEtMTRiMS00YTY4LTk0OGItNjY4YmI0MDM4OGM4XkEyXkFqcGdeQXVyODE2NDgwMzM@._V1_SX300.jpg"
}

export default function App(){

  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState(" ")
  
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json()
      
    setMovies(data.Search)
  }

  useEffect(() => {
    searchMovies("Spiderman")
  },[])

  function handleSearchChange(e){
    setSearchTerm(e.target.value)
  }
  function handleClick(){
    searchMovies(searchTerm)
  }

  return(
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input placeholder="Search for movies" value={searchTerm} onChange={handleSearchChange} />
        <img src={SearchIcon} alt="search" onClick={handleClick}/>
      </div>

      {movies?.length > 0
        ? (
          <div className="container">
            {movies.map((movie) => (
              <MovieCard movie={movie}/>
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No Movies Found</h2>
          </div>
        )
      }

    </div>
  )
}