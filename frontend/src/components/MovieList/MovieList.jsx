import React, { useState,useEffect } from 'react';
import './MovieList.css'
import keys from "../../API_Keys.json"
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

import { MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
  } from 'mdb-react-ui-kit';

import Reviews from '../Reviews/Reviews'




const MovieList = (props) => {

    const [user, token] = useAuth();

    const [centredModal, setCentredModal] = useState(false);
    const [trailerModal, setTrailerModal] = useState(false);
    const[movieSelected, setSelectedMovieBool] = useState(false);
    const [movieId, setmovieId] = useState(null);
    const [favMovie, setFavMovie] = useState(null);
    
    const toggleShow = () => setCentredModal(!centredModal);
    const toggleVideo = () => setTrailerModal(!trailerModal);
    

    console.log(movieId); // shows data of selected movie

    async function getMovieApi(movie) { //movie.id
        let test = movie.resultType
        let test2 = movie.movie_id 
        console.log(test, test2)
        let response = null
        if (test !== undefined) {
            response = await axios.get(`https://imdb-api.com/en/API/Title/${keys.IMDb_APIKey}/${movie.id}/Posters,Trailer`)
            console.log(response.data)
        }
        else {
            response = await axios.get(`https://imdb-api.com/en/API/Title/${keys.IMDb_APIKey}/${movie.movie_id}/Posters,Trailer`)
            console.log(response.data)
        }
          // took out Full Actor, Ratings to limit api calls add if want to display in future. 
        setmovieId(response.data);
        console.log(response.data);
        setCentredModal(movie);
        setSelectedMovieBool(true);
    }

    function submitFavMovie(event){
        event.preventDefault();
        let favMovie = {
            user: user,
            movie_id: movieId.id,
            image: movieId.image,
            title: movieId.title
        }
        addMovieToFav(favMovie)
    }

    async function addMovieToFav(favMovie){
        console.log(favMovie)
        try {
            let response = await axios.post(`http://127.0.0.1:8000/api/movies/`,favMovie, { headers: {Authorization: 'Bearer ' + token}});
            console.log(response);
            console.log(response.data);
            setFavMovie(response.data.id);


        } catch (ex) {
            console.log(ex.response);
        }
        
    }
    async function deleteFavMovie(id){
        try {
        let response = await axios.delete(`http://127.0.0.1:8000/api/movies/deletemovie/${id}/`, { headers: {Authorization: 'Bearer ' + token}});
        console.log(response);
        
        
        }catch (ex) {
            console.log(ex.response);
        }
    }

    function submitWatchList(event){
        event.preventDefault();
        let favMovie = {
            user: user,
            movie_id: movieId.id,
            image: movieId.image,
            title: movieId.title
        }
        addMovieToWatch(favMovie)
    }

    async function addMovieToWatch(watchList){
        
        try {
            let response = await axios.post(`http://127.0.0.1:8000/api/movies/watchlist/`,watchList, { headers: {Authorization: 'Bearer ' + token}});
            console.log(response);
            console.log(response.data);

        } catch (ex) {
            console.log(ex.response);
        }
        
    }


    
    return (  
        <div className="container-fluid movie-list">
       
                <div className="row">

                    {props.movies.map((movie, index) => (
                            
                            <img onClick={() => getMovieApi(movie)} key={index} className="movie-poster w-100 hover-shadow" src={movie.image} alt='movie'></img>
                               
                    ))}
                    <>
                    {movieSelected?
                        <><MDBModal tabIndex='-1' show={centredModal} setShow={setCentredModal}>
                            <MDBModalDialog centered size='lg'>
                                <MDBModalContent>
                                    <MDBModalHeader>
                                        <MDBModalTitle>Grids in modals</MDBModalTitle>
                                        <MDBBtn
                                            type='button'
                                            className='btn-close'
                                            color='none'
                                            onClick={toggleShow}
                                        ></MDBBtn>
                                    </MDBModalHeader>
                                    <MDBModalBody>
                                        <div className='container-fluid '>
                                            <div className='row'>
                                                <div className='col'>
                                                    <img style={{ width: 300, height: 450 }} src={movieId.posters.posters[0].link} alt="" />
                                                    
                                                </div>
                                                <div className='col'>
                                                    <h2 className='movie-title'>{movieId.title}</h2>
                                                    <p className='movie-plot'>{movieId.plot}</p>
                                                    
                                                    <Reviews movie={movieId} />
                                                </div>
                                            </div>
                                            <MDBBtn onClick={toggleVideo}>trailer</MDBBtn>
                                            <MDBBtn onClick={submitFavMovie}>Add to Favorites</MDBBtn>
                                            <MDBBtn onClick={() => deleteFavMovie(favMovie)}>REmove Favorite Movie</MDBBtn>
                                            <MDBBtn onClick={submitWatchList}>Add to Watch List</MDBBtn>
                                        </div>
                                    </MDBModalBody>
                                    <MDBModalFooter>
                                        <MDBBtn color='secondary' onClick={toggleShow}>
                                            Close
                                        </MDBBtn>
                                        <MDBBtn>Save changes</MDBBtn>
                                    </MDBModalFooter>
                                </MDBModalContent>
                            </MDBModalDialog>
                        </MDBModal><MDBModal tabIndex='-1' show={trailerModal} setShow={setTrailerModal}>
                                <MDBModalDialog centered size='xl'>
                                    <MDBModalContent>
                                        <MDBModalHeader>
                                            <MDBModalTitle>{movieId.title}</MDBModalTitle>
                                            <MDBBtn
                                                type='button'
                                                className='btn-close'
                                                color='none'
                                                onClick={toggleVideo}
                                            ></MDBBtn>
                                        </MDBModalHeader>
                                        <MDBModalBody>
                                            <div className='video-modal'>
                                                    <div className='video-player'><iframe style={{ width: 1280, height: 720 }}src={movieId.trailer.linkEmbed}></iframe></div>
                                                </div>
                                        </MDBModalBody>
                                        <MDBModalFooter>
                                            <MDBBtn color='secondary' onClick={toggleVideo}>
                                                Close
                                            </MDBBtn>
                                            
                                        </MDBModalFooter>
                                    </MDBModalContent>
                                </MDBModalDialog>
                            </MDBModal></>
                        :null}
                        </>
            </div>
        </div>
        

    );
}
 
export default MovieList;