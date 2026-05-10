import React, { useEffect,useState } from 'react'
import Search from './components/Search'
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';
import { useDebounce } from 'react-use';
import { getTrendingMovies, updateSearchCount } from './appwrite';

const API_BASE_URL = 'https://api.themoviedb.org/3'; //

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {  // options for fetch request
  method: 'GET',  // method of the request
  headers: {
    accept: 'application/json', // accept json response
    Authorization: `Bearer ${API_KEY}` // used to authenticate the request with the API key.
  }
}

const App = () => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(''); // state to store the debounced search term
  const [searchTerm, setSearchTerm] = useState(''); 
  const [movieList, setMovieList] = useState([]); // state to store the list of movies fetched from the API
  const [errorMessage, setErrorMessage] = useState(''); // state to store error message if fetch request fails
  const [isLoading, setIsLoading] = useState(false); // state to track loading status of the fetch request
  const [trendingMovies, setTrendingMovies] = useState([]); // state to store the list of trending movies fetched from the database

  useDebounce(()=>setDebouncedSearchTerm(searchTerm),500,[searchTerm]); // debounce the search term with a delay of 500ms to avoid making too many fetch requests while the user is typing

  const fetchMovies = async (query = '') => {
    setIsLoading(true); // set loading status to true when fetch request starts
    setErrorMessage(""); // clear any previous error messages before making a new fetch request

    try {
      const endpoint = query
      ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`; // endpoint to fetch movies sorted by popularity in descending order

      const response = await fetch(endpoint, API_OPTIONS); // make fetch request to the endpoint with the specified options

      if(!response.ok) {
        throw new Error("Failed to fetch movies"); // throw error if response is not ok
      }

      const data = await response.json(); // parse the response as json

      if(data.Response === "False") {
        setErrorMessage(data.Error || "Failed to fetch movies. Please try again later."); // set error message if response is not successful  
        setMovieList([]); // clear movie list if response is not successful
        return; // exit the function if response is not successful
      }

      setMovieList(data.results || []);

      if(query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]); // update search count in the database for the search term and the first movie result
      }

    } catch (error) {
      console.error(`Error fetching movies: ${error}`); // log error if fetch request fails
      setErrorMessage('Failed to fetch movies. Please try again later.'); // set error message if fetch request fails

    } finally {
      setIsLoading(false); // set loading status to false when fetch request is complete (whether it succeeded or failed)
    }
  }

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies(); // fetch trending movies from the database

      setTrendingMovies(movies); // update the trendingMovies state with the fetched movies
    } catch (error) {
      console.error(`Error fetching trending movies: ${error}`); // log error if fetch request fails
    }
  }

  useEffect(() => {
    fetchMovies(searchTerm); // call the fetchMovies function when the component mounts
  },[debouncedSearchTerm]); // run only when it loads for the first time

  useEffect(() => {
    loadTrendingMovies(); // call the loadTrendingMovies function when the component mounts
  },[]); // run only when it loads for the first time

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1> Find <span className='text-gradient'>Movies</span> You'll Enjoy Without The Hassle </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> {/* Pass searchTerm and setSearchTerm as props to the Search component */}
        </header>

        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>

            <ul>
              {trendingMovies.map((movie, index)=>(
                <li key={movie.$id} className="trending-movie">
                  <p>{index+1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>

          </section>)}

        <section className="all-movies">
          <h2> All Movies </h2>

          {isLoading ? (
            <Spinner /> // show spinner while loading
          ) : errorMessage ? (
            <p className = "text-red-500"> {errorMessage} </p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie}/> // render MovieCard component for each movie in the movieList
              ))}
            </ul>
          )}
        </section>

      </div>
    </main>
  )
}

export default App
