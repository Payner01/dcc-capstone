import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';


const Reviews = (props) => {

    const [user, token] = useAuth();
    // const [movieReviews, setMovieReviews] = useState([]);

    // console.log(props.movie.id)
    console.log(props.movieReviews)

    // async function getReviews(){
    //     let response = await axios.get(`http://127.0.0.1:8000/api/reviews/${props.movie.id}/reviews/`);
    //     setMovieReviews(response.data.reverse());
    //     console.log(response.data)
    // }

    // useEffect(() => {
    //     getReviews();
    // },[props.movie.id])
    

    return ( 

        <div>
            {props.movieReviews.map((review, index) => {
                return (
                    <div key={index}>
                        <p>{user.username}</p>
                        <p>{review.text}</p>
                    </div>                                  
                );
            })}
        </div>
     );
}
 
export default Reviews;