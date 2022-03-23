import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import ReviewForm from '../ReviewForm/ReviewForm';
import ReviewList from '../ReviewList/ReviewList';

const Reviews = (props) => {

    const [user, token] = useAuth();
    const [movieReviews, setMovieReviews] = useState([]);

    console.log(props.movie.id)
    console.log(props.movieReviews)

    async function getReviews(){
        let response = await axios.get(`http://127.0.0.1:8000/api/reviews/${props.movie.id}/reviews/`, { headers: {Authorization: 'Bearer ' + token}});
        setMovieReviews(response.data.reverse());
        console.log(response.data)
    }
    async function deleteReview(id){
        try {
        let response = await axios.delete(`http://127.0.0.1:8000/api/reviews/delete/${id}/`, { headers: {Authorization: 'Bearer ' + token}});
        console.log(response);
        getReviews();
        
        }catch (ex) {
            console.log(ex.response);
        }
    }

    useEffect(() => {
        getReviews();
    },[props.movie.id])
    

    return ( 
        <div>
            <ReviewForm movie={props.movie} getReviews={getReviews} />
            <ReviewList movieReviews={movieReviews} deleteReview={deleteReview}/>
        </div>
     );
}
 
export default Reviews;