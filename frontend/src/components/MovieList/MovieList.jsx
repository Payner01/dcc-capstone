import React, { useState } from 'react';
import './MovieList.css'

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

    console.log(modalData); // shows data of selected movie

    function toggleModal() {
        
        setCentredModal(!centredModal);
        // toggleShow();
        console.log(modalData);
    }

    function setData(movie) {
        setModalData(movie);
        setCentredModal(movie);
        setSelectedMovieBool(true)
        
    }

//    if(word == "Yes"){

//    }

//    word=="yes" ? console.log(true) : console.log(false)
    

    return (  
        <div className="container-fluid movie-list">
       
                <div className="row">

                    {props.movies.slice(0, 10).map((movie, index) => (
                            
                            <img onClick={() => setData(movie)} key={index} className="movie-poster" src={movie.image} alt='movie'></img>
                            
                            
                    ))}
                    {}
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
                                            <div className='col-md-4' ><img style={{width: 300, height: 450}} src={modalData.image} alt="" /></div>
                                            <div className='col-md-4 ms-auto'><h2>{modalData.title}</h2></div>
                                        </div>
                                        <div className='col-md-2'>{modalData.plot}</div>
                                    </div>
                                    </MDBModalBody>
                                    <MDBModalFooter>
                                    <MDBBtn color='secondary' onClick={toggleShow}>
                                        Close
                                    </MDBBtn>
                                    <MDBBtn>Save changes</MDBBtn>
                                    </MDBModalFooter>
                                    {/* <MDBModalHeader>
                                        <MDBModalTitle>{modalData.title}</MDBModalTitle>
                                        <MDBBtn className='btn-close' color='none' onClick={toggleModal}>????</MDBBtn>
                                    </MDBModalHeader>
                                    <MDBModalBody>
                                        <p>
                                        </p>
                                    </MDBModalBody>
                                    <MDBModalFooter>
                                        <MDBBtn color='secondary' onClick={toggleModal}>
                                            Close
                                        </MDBBtn>
                                        <MDBBtn>Save changes</MDBBtn>
                                    </MDBModalFooter> */}
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