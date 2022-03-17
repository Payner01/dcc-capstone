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


const MovieList = (props) => {

    const [centredModal, setCentredModal] = useState(false);
    const[movieSelected, setSelectedMovieBool] = useState(false)
    const [modalData, setModalData] = useState(null);
    const toggleShow = () => setCentredModal(!centredModal);

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
                            <MDBModal tabIndex='-1' show={centredModal} setShow={setCentredModal}>
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
                                    <div className='container-fluid bd-example-row'>
                                        <div className='row'>
                                            <div className='col-md-4' ><img style={{width: 300, height: 450}} src={modalData.posters.posters[0].link} alt="" /></div>
                                            <div className='col-md-4 ms-auto'><h2>{modalData.title}</h2></div>
                                        </div>
                                        <div className='row'>
                                            <div>{modalData.plot}</div>
                                            <div><iframe src={modalData.trailer.linkEmbed}></iframe></div>
                                        </div>
                                        
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
                        </MDBModal>
                        :null}
                        </>
            </div>
        </div>
        

    );
}
 
export default MovieList;