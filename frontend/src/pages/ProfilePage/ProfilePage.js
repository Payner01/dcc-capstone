import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-bootstrap";
import MovieList from "../../components/MovieList/MovieList";
import useAuth from "../../hooks/useAuth";
import keys from "../../API_Keys.json";

const ProfilePage = () => {
  const [user, token] = useAuth();

  const [favMovies, setFavMovies] = useState([]);
  const [apiMovies, setApiMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState([]);
  const [watchList, setWatchList] = useState([]);

  let favMovieCall = `http://127.0.0.1:8000/api/movies/`;
  let watchListCall = `http://127.0.0.1:8000/api/movies/watchlist/`;

  console.log(favMovies)

  useEffect(() => {
    console.log("test use effect");

    getFavorites();
    getWatchList();

  }, [token]);

  async function getFavorites () {
    let response = await axios.get(favMovieCall,{ headers: {Authorization: 'Bearer ' + token}});

      setFavMovies(response.data)
      console.log(response.data)
  }

  async function getWatchList () {
    let response = await axios.get(watchListCall,{ headers: {Authorization: 'Bearer ' + token}});

      setWatchList(response.data)
      console.log(response.data)
  }






  return (
    <div className="profile-page">
      <h3>Favorites</h3>
      <MovieList movies={favMovies} />
      <h3>Watch List</h3>
      <MovieList movies={watchList} />
    </div>
  );
};

export default ProfilePage;
