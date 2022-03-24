import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import './ReviewList.css'
import { MDBIcon,MDBBtn } from 'mdb-react-ui-kit';


const Reviews = (props) => {

    const [user, token] = useAuth();
    
    console.log(props.movieReviews)

    
    

    return ( 

        <div>
            {props.movieReviews.map((review, index) => {
                return (
                    <div className="form-grid">
                        <div className="form-control" key={index}>
                            <h4 className="form-heading">{review.user.username}</h4>
                            <div className="post-content">{review.text}</div>
                                                   
                            <MDBIcon onClick={() => props.deleteReview(review.id)}fas icon="trash-alt" size='1x'/>
                            
                        </div>
                    </div>
                                                     
                );
            })}
        </div>
     );
}
 
export default Reviews;