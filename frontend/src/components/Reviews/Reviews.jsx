import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';


const Reviews = (props) => {

    const [user, token] = useAuth();
    const [movieReviews, setMovieReviews] = useState([]);

    

    async function getReviews(){
        let response = await axios.get(`http://127.0.0.1:8000/api/reviews/${props.movie.id}/reviews/`);
        setMovieReviews(response.data.reverse());
        console.log(response.data)
    }

    useEffect(() => {
        getReviews();
    }, [])

    return ( 

        <div>
            {movieReviews.map((review, index) => {
                return (
                    <div>
                        <p>{user.username}</p>
                        <p>{review.text}</p>
                    </div>                                  
                );
            })}
        </div>
     );
}
 
export default Reviews;