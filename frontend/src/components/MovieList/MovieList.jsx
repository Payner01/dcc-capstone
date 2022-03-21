import React, { useState } from 'react';
import './MovieList.css'
import keys from "../../API_Keys.json"
import axios from 'axios';

import { MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
  } from 'mdb-react-ui-kit';
import ReviewForm from '../ReviewForm/ReviewForm';
import Reviews from '../Reviews/Reviews'


const MovieList = (props) => {


    const [centredModal, setCentredModal] = useState(false);
    const [trailerModal, setTrailerModal] = useState(false);
    const[movieSelected, setSelectedMovieBool] = useState(false)
    const [modalData, setModalData] = useState(null);
    const toggleShow = () => setCentredModal(!centredModal);
    const toggleVideo = () => setTrailerModal(!trailerModal)

    // console.log(modalData); // shows data of selected movie

    async function getMovieDetails(movie) {
        let response = await axios.get(`https://imdb-api.com/en/API/Title/${keys.IMDb_APIKey}/${movie.id}/FullActor,FullCast,Posters,Images,Trailer,Ratings`)
        setModalData(response.data);
        console.log(response.data);
        setCentredModal(movie);
        setSelectedMovieBool(true);
        
    }

    

//    word=="yes" ? console.log(true) : console.log(false)
    
    return (  
        <div className="container-fluid movie-list">
       
                <div className="row">

                    {props.movies.slice(0, 20).map((movie, index) => (
                            
                            <img onClick={() => getMovieDetails(movie)} key={index} className="movie-poster" src={movie.image} alt='movie'></img>
                               
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
                                                    <img style={{ width: 300, height: 450 }} src={modalData.posters.posters[0].link} alt="" />
                                                    
                                                </div>
                                                <div className='col'>
                                                    <h2 className='movie-title'>{modalData.title}</h2>
                                                    <p className='movie-plot'>{modalData.plot}</p>
                                                    <ReviewForm movie={modalData}/>
                                                    <Reviews movie={modalData}/>
                                                </div>
                                            </div>
                                            <MDBBtn onClick={toggleVideo}>trailer</MDBBtn>
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
                                            <MDBModalTitle>{modalData.title}</MDBModalTitle>
                                            <MDBBtn
                                                type='button'
                                                className='btn-close'
                                                color='none'
                                                onClick={toggleVideo}
                                            ></MDBBtn>
                                        </MDBModalHeader>
                                        <MDBModalBody>
                                            <div className='video-modal'>
                                                    <div className='video-player'><iframe style={{ width: 1280, height: 720 }}src={modalData.trailer.linkEmbed}></iframe></div>
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