import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function Home() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [action, setAction] = useState([]);
  const [anime, setAnime] = useState([]);
  const [horror, setHorror] = useState([]);
  const [drama, setDrama] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const resultsRef = useRef(null);

  const getMovies = async (query) => {
    try {
      const response = await axios.get(`https://imdb.iamidiotareyoutoo.com/search?q=${query}`);
      setMovies(response.data.description);
      setIsSearching(true);
      scrollToResults();
    } catch (error) {
      if (query.length === 0) {
        Swal.fire({
          icon: 'question',
          title: 'Type something in the search field :(',
          confirmButtonText: 'OK',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      }
    }
  };

  const fetchGenreMovies = async (genre, setState) => {
    try {
      const response = await axios.get(`https://imdb.iamidiotareyoutoo.com/search?q=${genre}`);
      setState(response.data.description);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: `Failed to load data for ${genre}`,
        text: 'Something went wrong!',
      });
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchButtonClick = () => {
    if (search.trim() === '') {
      setIsSearching(false);
    }
    getMovies(search);
  };

  const scrollToResults = () => {
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      getMovies(search);
    }
  };

  useEffect(() => {
    fetchGenreMovies('avengers', setAction);
    fetchGenreMovies('mobile suit gundam', setAnime);
    fetchGenreMovies('horror', setHorror);
    fetchGenreMovies('The Spirealm', setDrama);
  }, []);

  return (
    <>
      <div className="container-title">
          <div className="overlay">
            <h1>Movie</h1>
            <div className="search-bar">
              <input
                type="search"
                placeholder="Search here..."
                onChange={handleSearch}
                onKeyDown={handleKeyDown}
                value={search}
                style={{ width: '40%', height: '30px' }}
              />
              <button onClick={handleSearchButtonClick}>Search</button>
            </div>
          </div>
        </div>

      <div className="movie-container" ref={resultsRef}>
        {isSearching && movies.map((movie) => (
          <Link to={`/movie/${movie['#IMDB_ID']}`} state={{ movie }} key={movie['#IMDB_ID']}>
            <div className="movie">
              <img
                src={movie['#IMG_POSTER']}
                alt={movie['#TITLE']}
              />
              <div className="movie-details-overlay">
                <p>Rating: 4.5 ⭐</p>
                <p>{movie['#AKA']}</p> <br />
                <p>{movie['#ACTORS']}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {!isSearching && (
        <>
          <h2>Top Action</h2>
          <p>Avengers is a superhero team that appears in comic books published by Marvel Comics. Created by writer Stan Lee and artist Jack Kirby, they first appeared in "The Avengers" #1 in 1963.</p>
          <div className="movie-container">
            {action.map((movie) => (
              <Link to={`/movie/${movie['#IMDB_ID']}`} state={{ movie }} key={movie['#IMDB_ID']}>
                <div className="movie">
                  <img
                    src={movie['#IMG_POSTER']}
                    alt={movie['#TITLE']}
                  />
                  <div className="movie-details-overlay">
                    <p>Rating: 4.5 ⭐</p>
                    <p>{movie['#AKA']}</p> <br />
                    <p>{movie['#ACTORS']}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <h2>Top Anime</h2>
          <p>Mobile Suit Gundam is a Japanese media franchise and media franchise based on the Gundam franchise.</p>
          <div className="movie-container">
            {anime.map((movie) => (
              <Link to={`/movie/${movie['#IMDB_ID']}`} state={{ movie }} key={movie['#IMDB_ID']}>
                <div className="movie">
                  <img
                    src={movie['#IMG_POSTER']}
                    alt={movie['#TITLE']}
                  />
                  <div className="movie-details-overlay">
                    <p>Rating: 4.5 ⭐</p>
                    <p>{movie['#AKA']}</p> <br />
                    <p>{movie['#ACTORS']}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <h2>Top Horror</h2>
          <p>Horror is a genre of fiction which is intended to scare and frighten the audience.</p>
          <div className="movie-container">
            {horror.map((movie) => (
              <Link to={`/movie/${movie['#IMDB_ID']}`} state={{ movie }} key={movie['#IMDB_ID']}>
                <div className="movie">
                  <img
                    src={movie['#IMG_POSTER']}
                    alt={movie['#TITLE']}
                  />
                  <div className="movie-details-overlay">
                    <p>Rating: 4.5 ⭐</p>
                    <p>{movie['#AKA']}</p> <br />
                    <p>{movie['#ACTORS']}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <h2>Top Drama</h2>
          <p>Drama is a genre of fiction which focuses on the emotional and psychological aspects of a story.</p>
          <div className="movie-container">
            {drama.map((movie) => (
              <Link to={`/movie/${movie['#IMDB_ID']}`} state={{ movie }} key={movie['#IMDB_ID']}>
                <div className="movie">
                  <img
                    src={movie['#IMG_POSTER']}
                    alt={movie['#TITLE']}
                  />
                  <div className="movie-details-overlay">
                    <p>Rating: 4.5 ⭐</p>
                    <p>{movie['#AKA']}</p> <br />
                    <p>{movie['#ACTORS']}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default Home;
