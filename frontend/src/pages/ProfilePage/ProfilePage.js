import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-bootstrap'
import MovieList from "../../components/MovieList/MovieList";
import useAuth from "../../hooks/useAuth";
import keys from "../../API_Keys.json";

const ProfilePage = () => {

    const [user, token] = useAuth();

    const [favMovies, setFavMovies] = useState([]);
    const [apiMovies, setApiMovies] = useState([]);

    // const jsonString = JSON.stringify(Object.assign({}, favMovies))
    console.log(favMovies.movie_id)
    // favMovies.forEach(function (e) {
    //     setApiMovies(e);
    // })

    useEffect(() => {
        const getFavoriteMovies = async () => {
          try {
            let response = await axios.get(`http://127.0.0.1:8000/api/movies/`, {headers: {Authorization: "Bearer " + token},});
            console.log(response)
            // response.data.map((movie) => (setFavMovies(movie)))
            // response.data.forEach(function (e) {
            //     setFavMovies(e)
            // })
            setFavMovies(response.data[0].movie_id);
            // console.log(favMovies);
            getMovieDetails();

          } catch (error) {
            console.log(error.message);
          }
        };
        // async function getMovieDetails() {
        //     let response = await axios.get(`https://imdb-api.com/en/API/Title/${keys.IMDb_APIKey}/${favMovies.movie_id}/Posters,Trailer`)
        //     console.log(response.data.items)
        //     setApiMovies(response.data.items)
        // }
        const getMovieDetails = async () => {
            try {
              let response = await axios.get(`https://imdb-api.com/en/API/Title/${keys.IMDb_APIKey}/${favMovies}/Posters`, {
                headers: {
                  Authorization: "Bearer " + token,
                },
              });
              setApiMovies(response.data.items);
            } catch (error) {
              console.log(error.message);
            }
          };
        getFavoriteMovies();
        // getMovieDetails()
      }, [token]);



    return ( 
        <div className='profile-page'>
            <h3>PROFILE</h3>
            {/* <MovieList movies={apiMovies}/> */}
        </div>


     );
}
 
export default ProfilePage;