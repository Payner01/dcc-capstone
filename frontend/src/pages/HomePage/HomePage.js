import React from "react";
import { useEffect, useState } from "react";

import axios from "axios";
import useAuth from "../../hooks/useAuth";
import keys from "../../API_Keys.json"

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  const [user, token] = useAuth();
  const [cars, setCars] = useState([]);
  const [popMovies, setPopMovies] = useState([]);


  // useEffect(() => {
  //   const fetchCars = async () => {
  //     try {
  //       let response = await axios.get("http://127.0.0.1:8000/api/cars/", {
  //         headers: {
  //           Authorization: "Bearer " + token,
  //         },
  //       });
  //       setCars(response.data);
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };
  //   fetchCars();
  // }, [token]);

    useEffect(() => {
    const getPopularMovies = async () => {
      try {
        let response = await axios.get(`https://imdb-api.com/en/API/MostPopularMovies/${keys.IMDb_APIKey}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setPopMovies(response.data.items);
      } catch (error) {
        console.log(error.message);
      }
    };
    getPopularMovies();
  }, [token]);




  return (
    <div className="container">
      <h1>Home Page for {user.username}!</h1>
      {popMovies &&
        popMovies.map((movie) => (
          <p key={movie.id}>
            {movie.title}
          </p>
        ))}
    </div>
  );
};

export default HomePage;
