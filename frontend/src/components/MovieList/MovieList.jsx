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
    MDBIcon,
    MDBBtnGroup,
    MDBSwitch,
  } from 'mdb-react-ui-kit';

import Reviews from '../Reviews/Reviews'
import { Tooltip } from 'react-bootstrap';




const MovieList = (props) => {

    const [user, token] = useAuth();

    const [centredModal, setCentredModal] = useState(false);
    const [trailerModal, setTrailerModal] = useState(false);
    const[movieSelected, setSelectedMovieBool] = useState(false);
    const [movieId, setmovieId] = useState(null);
    const [favMovie, setFavMovie] = useState(null);
    const [watchList, setWatchList] = useState(null);
    
    const toggleShow = () => setCentredModal(!centredModal);
    const toggleVideo = () => setTrailerModal(!trailerModal);
    

    console.log(movieId); // shows data of selected movie

    async function getMovieApi(movie) { //movie.id
        let test = movie.resultType || movie.year
        let test2 = movie.movie_id 
        console.log(movie, test, test2)

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
        setWatchList(movie.id)
        setFavMovie(movie.id);
        console.log(response.data);
        setCentredModal(movie);
        setSelectedMovieBool(true);
    }

//////////////////// Movie Favorites List ///////////////////////
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
        let response = await axios.delete(`http://127.0.0.1:8000/api/movies/deletemovie/${id}/`, { headers: {Authorization: 'Bearer ' + token}});
        console.log(response);
        setSelectedMovieBool(false);
        
        
        
    }
///////////////////// Movie Watch List//////////////////////
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
            setWatchList(response.data.id);

        } catch (ex) {
            console.log(ex.response);
        }
        
    }
    async function deleteWatchList(id){
        try {
        let response = await axios.delete(`http://127.0.0.1:8000/api/movies/deletewatchlist/${id}/`, { headers: {Authorization: 'Bearer ' + token}});
        console.log(response);
        setSelectedMovieBool(false);
        
        
        
        }catch (ex) {
            console.log(ex.response);
        }
    }

    
    
    return (  
        <div className={`container-fluid ${props.isPannel?"movie-pannel":"movie-list"}`}>
       
                <div className="row d-flex justify-content-start m-3">

                    {props.movies.slice(0,30).map((movie, index) => (
                            
                            <img onClick={() => getMovieApi(movie)} key={index} className="movie-poster image-fluid rounded" src={movie.image} alt='movie'></img>
                            
                    ))}
                    <>
                    {movieSelected?
                        <><MDBModal className='movie-modal' tabIndex='-1' show={centredModal} setShow={setCentredModal}>
                            <MDBModalDialog centered size='lg'>
                                <MDBModalContent className='modal-content'>
                                    <MDBModalHeader>
                                        <MDBModalTitle className='titles'>{movieId.title}</MDBModalTitle>
                                        <MDBBtn
                                            type='button'
                                            className='btn-close'
                                            color='none'
                                            onClick={toggleShow}
                                        ></MDBBtn>
                                    </MDBModalHeader>
                                    <MDBModalBody>
                                        <div className='container-fluid d-flex'>
                                            <div className='row'>
                                                <div className='col'>
                                                    <img className="modal-image" style={{ width: 300, height: 450 }} src={movieId.posters.posters[0].link} alt="" />
                                                        <div className='button-col'>
                                                            <MDBBtn title='Watch Trailer' onClick={toggleVideo}><MDBIcon fas icon="film"/></MDBBtn>
                                                            <MDBBtnGroup >
                                                                <MDBBtn title='Add to Favorites' onClick={submitFavMovie}><MDBIcon fas icon="star"/></MDBBtn>
                                                                <MDBBtn title='Remove Movie from Favorites' onClick={() => deleteFavMovie(favMovie)}><MDBIcon far icon="star"/></MDBBtn>
                                                            </MDBBtnGroup>
                                                            <MDBBtnGroup>
                                                                <MDBBtn title='Add to Watchlist' onClick={submitWatchList}><MDBIcon fas icon="heart"/></MDBBtn>
                                                                <MDBBtn title='Remove from Watchlist' onClick={() => deleteWatchList(watchList)}><MDBIcon far icon="heart"/></MDBBtn>
                                                            </MDBBtnGroup>
                                                </div>
                                                </div>
                                                <div className='col'>
                                                    <h2 className='movie-title'>{movieId.title}</h2>
                                                    <p className='movie-plot'>{movieId.plot}</p>
                                                    
                                                    <Reviews movie={movieId} />
                                                </div> 
                                            </div>
                                        </div>
                                    </MDBModalBody>
                                    <MDBModalFooter>
                                        <MDBBtn color='secondary' onClick={toggleShow}>
                                            Close
                                        </MDBBtn>
                                        
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
                                                    <div ><iframe className='video-player'style={{ width: 1280, height: 720 }}src={movieId.trailer.linkEmbed}></iframe></div>
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