import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-bootstrap";
import MovieList from "../../components/MovieList/MovieList";
import useAuth from "../../hooks/useAuth";
import './ProfilePage.css'


const ProfilePage = () => {
  const [user, token] = useAuth();

  const [favMovies, setFavMovies] = useState([]);
  const [watchList, setWatchList] = useState([]);

  let favMovieCall = `http://127.0.0.1:8000/api/movies/`;
  let watchListCall = `http://127.0.0.1:8000/api/movies/watchlist/`;

  console.log(favMovies)

  useEffect(() => {
    getFavorites();
    getWatchList();
  }, [token]);  

  async function getFavorites () {
    let response = await axios.get(favMovieCall,{ headers: {Authorization: 'Bearer ' + token}});
      setFavMovies(response.data)
      // console.log(response.data)
  }

  async function getWatchList () {
    let response = await axios.get(watchListCall,{ headers: {Authorization: 'Bearer ' + token}});
      setWatchList(response.data)
      // console.log(response.data)
  }


  return (
    <div className="container-fluid profile-page">
      <h1 className="profile-name">{user.first_name}'s Lists</h1>
      <div className="movie-lists">
        <h1>Favorites</h1>
        <MovieList getFavorites={getFavorites} movies={favMovies} /> 
        <h1>Watch List</h1>
        <MovieList getWatchList={getWatchList} movies={watchList} />
      </div>
    </div>
  );
};

export default ProfilePage;
