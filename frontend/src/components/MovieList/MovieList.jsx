import React, { useState } from 'react';
import './MovieList.css'
import MovieInfo from "../../components/MovieInfo/MovieInfo";
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
    const [modalData, setModalData] = useState(null);
    // const toggleShow = () => setCentredModal(!centredModal);

    console.log(modalData); // shows data of selected movie

    function toggleModal() {
        setCentredModal(!centredModal);
        // toggleShow();
        console.log(modalData);
    }

    function setData(movie) {
        setModalData(movie)
    }

    return (  
        <div className="container-fluid movie-list">
                <div className="row">

                    {props.movies.slice(0, 10).map((movie, index) => (
                            
                            <img onClick={() => {setData(movie); setCentredModal(!centredModal);}} key={index} className="movie-poster" src={movie.image} alt='movie'></img>
                            
                            
                    ))}
                    <>
                            <MDBModal tabIndex='-1' show={centredModal} setShow={setCentredModal}>
                            <MDBModalDialog centered>
                                <MDBModalContent>
                                    <MDBModalHeader>
                                        <MDBModalTitle></MDBModalTitle>
                                        <MDBBtn className='btn-close' color='none' onClick={toggleModal}></MDBBtn>
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
                                    </MDBModalFooter>
                                </MDBModalContent>
                            </MDBModalDialog>
                        </MDBModal>
                        </>
            </div>
        </div>
        

    );
}
 
export default MovieList;