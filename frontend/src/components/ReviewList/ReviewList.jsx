import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import './ReviewList.css'
import { MDBIcon,MDBBtn } from 'mdb-react-ui-kit';


const Reviews = (props) => {

    const [user, token] = useAuth();
    
    console.log(props.movieReviews)

    function handleSubmit(reviewId) {
        
        let reviewLiked = {
            user: user,
            like_dislike: 'like',
            review_id: reviewId,
            
        }
        
        props.postLike(reviewLiked)

        
    }
    

    return ( 

        <div>
            {props.movieReviews.map((review, index) => {
                return (
                    <div className="form-grid" key={index}>
                        <div className="form-control" >
                            <h4 className="form-heading">{review.user.username}</h4>
                            <div className="post-content">{review.text}</div>
                            <div className='post-actions'>
                            <MDBIcon onClick={() => {handleSubmit(review.id)}}fas icon="thumbs-up" size='1x'/>
                            {user.id === review.user.id && 
                                <MDBIcon onClick={() => props.deleteReview(review.id)}fas icon="trash-alt" size='1x'/>
                            }                      
                            
                            </div>
                            
                        </div>
                    </div>
                                                     
                );
            })}
        </div>
     );
}
 
export default Reviews;