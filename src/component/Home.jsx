import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Banner from '../assets/avengers-infinity-war-banner-4k-4c-1920x1080.jpg';

function Home() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [action, setAction] = useState([]);
  const [anime, setAnime] = useState([]);
  const [horror, setHorror] = useState([]);
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
          title: 'Search Something Please 😞',
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
    fetchGenreMovies('persona 3', setAnime);
    fetchGenreMovies('horror', setHorror);
  }, []);

  return (
    <>
      <div className="container-title">
        <div className="banner">
          <img src={Banner} alt="" />
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
            <h2>Avengers: Endgame (2019).</h2>
            <p>
              The Avengers are a team of superheroes appearing in comic books published by Marvel Comics. Created by writer Stan Lee and artist Jack Kirby, they first appeared in "The Avengers" #1 in 1963. The original team consisted of Iron Man, Thor, Hulk, Ant-Man, and Wasp. Over the years, the roster has included numerous other characters such as Captain America, Black Widow, Hawkeye, Vision, Scarlet Witch, and many others.
            </p>
            <button>Continue Watch</button>
          </div>
        </div>
      </div>

      <div className="movie-container" ref={resultsRef}>
        {isSearching && movies.map((movie) => (
          <div key={movie['#IMDB_ID']}>
            <img
              style={{ width: '90%', height: '90%', borderRadius: '10px' }}
              src={movie['#IMG_POSTER']}
              alt={movie['#TITLE']}
            />
            <div className="text-movie">
              <h4>{movie['#AKA']}</h4>
              <h5 style={{ fontSize: '12px', color: '#bbb' }}>{movie['#ACTORS']}</h5>
            </div>
          </div>
        ))}
      </div>

      {!isSearching && (
        <>
        <h2>Top Action</h2>
        <p>Avengers is a superhero team that appears in comic books published by Marvel Comics. Created by writer Stan Lee and artist Jack Kirby, they first appeared in "The Avengers" #1 in 1963.</p>
          <div className="movie-container">
            {action.map((movie) => (
              <div key={movie['#IMDB_ID']}>
                <img
                  style={{ width: '90%', height: '90%', borderRadius: '10px' }}
                  src={movie['#IMG_POSTER']}
                  alt={movie['#TITLE']}
                />
                <div className="text-movie">
                  <h4>{movie['#AKA']}</h4>
                  <h5 style={{ fontSize: '12px', color: '#bbb' }}>{movie['#ACTORS']}</h5>
                </div>
              </div>
            ))}
          </div>

          <h2>Top Anime</h2>
          <p>Persona 3 is a Japanese role-playing video game franchise created by Atlus. It is the first game in the Persona series, and is known for its unique character design and storylines.</p>
          <div className="movie-container">
            {anime.map((movie) => (
              <div key={movie['#IMDB_ID']}>
                <img
                  style={{ width: '90%', height: '90%', borderRadius: '10px' }}
                  src={movie['#IMG_POSTER']}
                  alt={movie['#TITLE']}
                />
                <div className="text-movie">
                  <h4>{movie['#AKA']}</h4>
                  <h5 style={{ fontSize: '12px', color: '#bbb' }}>{movie['#ACTORS']}</h5>
                </div>
              </div>
            ))}
          </div>

          <h2>Top Horror</h2>
          <p>Horror is a genre of fiction which is intended to scare and frighten the audience.</p>
          <div className="movie-container">
            {horror.map((movie) => (
              <div key={movie['#IMDB_ID']}>
                <img
                  style={{ width: '90%', height: '90%', borderRadius: '10px' }}
                  src={movie['#IMG_POSTER']}
                  alt={movie['#TITLE']}
                />
                <div className="text-movie">
                  <h4>{movie['#AKA']}</h4>
                  <h5 style={{ fontSize: '12px', color: '#bbb' }}>{movie['#ACTORS']}</h5>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default Home;
