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

  let favMovieApi = `http://127.0.0.1:8000/api/movies/`;

  console.log(favMovies)

  useEffect(() => {
    console.log("test use effect");

    ////////// not efficient but it works for mvp ////////////////
    // change the add fav backend so it taked in movie poster and Id. 
    const getFavoriteMovies = async () => {
      console.log("get fav movies");
      try {
        let response = await axios.get(favMovieApi, {headers: { Authorization: "Bearer " + token },});
        // console.log(response.data);
        let tempArray = []
        for (const x of response.data) {
          const response = await axios.get(`https://imdb-api.com/en/API/Title/${keys.IMDb_APIKey}/${x.movie_id}`,{ headers: { Authorization: "Bearer " + token } });
          console.log(response.data);
          tempArray.push(response.data);
        }
        setFavMovies(tempArray)
        console.log("test");

      } catch (error) {
        console.log(error.message);
      } 
    };

    getFavoriteMovies();
    getWatchList();

  }, [token]);


  async function getWatchList () {
    let response = await axios.get(`http://127.0.0.1:8000/api/movies/watchlist/`,{ headers: {Authorization: 'Bearer ' + token}});

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
