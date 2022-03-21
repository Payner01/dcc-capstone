import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';


const Reviews = (props) => {

    const [user, token] = useAuth();
    
    console.log(props.movieReviews)

    
    

    return ( 

        <div>
            {props.movieReviews.map((review, index) => {
                return (
                    <div key={index}>
                        <p>{review.user.username}</p>
                        <p>{review.text}</p>
                    </div>                                  
                );
            })}
        </div>
     );
}
 
export default Reviews;