import React from "react";
import { useEffect, useState } from "react";
import "react-bootstrap"
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import keys from "../../API_Keys.json";
import "./HomePage.css";
import MovieList from "../../components/MovieList/MovieList";


const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  const [user, token] = useAuth();
  const [cars, setCars] = useState([]);
  const [popMovies, setPopMovies] = useState([]);
  const [comingSoon, setComingSoon] = useState([]);
  const [boxOffice, setBoxOffice] = useState([]);

    console.log(user);


    useEffect(() => {
    const getPopularMovies = async () => {
      try {
        let response = await axios.get(`https://imdb-api.com/en/API/MostPopularMovies/${keys.IMDb_APIKey}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setPopMovies(response.data.items);
        console.log(response.data.items)
      } catch (error) {
        console.log(error.message);
      }
    };

    const getComingSoon = async () => {
      try {
        let response = await axios.get(`https://imdb-api.com/en/API/ComingSoon/${keys.IMDb_APIKey}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setComingSoon(response.data.items);
        console.log(response.data.items);
      } catch (error) {
        console.log(error.message);
      }
    };
    const getBoxOfficeAllTime = async () => {
      try {
        let response = await axios.get(`https://imdb-api.com/en/API/BoxOfficeAllTime/${keys.IMDb_APIKey}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setBoxOffice(response.data.items);
      } catch (error) {
        console.log(error.message);
      }
    };
    getComingSoon();
    getPopularMovies();
    getBoxOfficeAllTime();
  }, [token]);




  return (
    <div className="container-fluid movie-list">
      <br />
      <h1>Trending</h1>
      <div className="row">
        <MovieList movies={popMovies} />
      </div>
      
      <br />
      <h1>Coming Soon</h1>
      <div className="row">
        <MovieList movies={comingSoon} />
      </div>
      <br />
      <h1>Box Office All Time</h1>
      <div className="row">
        {/* <MovieList movies={boxOffice} /> */}
      </div>
      
      
    </div>
  );
};

export default HomePage;
