import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import ReviewForm from '../ReviewForm/ReviewForm';
import ReviewList from '../ReviewList/ReviewList';
import './Reviews.css'

const Reviews = (props) => {

    const [user, token] = useAuth();
    const [movieReviews, setMovieReviews] = useState([]);
    const [likes, setLikes] =useState([])
    

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

    ////////////// Likes Section in progress //////////////////
    // async function postLike(review){
    //     getPostLikes();
    //     console.log(review.review_id)
    //     if (likes.some(data => data.user.id === review.user.user_id && data.review_id === review.review_id)){
    //     }else {
    //         console.log(likes)
    //         try {
                
    //             let response = await axios.post(`http://127.0.0.1:8000/api/reviews/likesDislike/`,  review, { headers: {Authorization: 'Bearer ' + token}});
    //             console.log(response)
    //         } catch (ex) {
    //             console.log(ex.response)
    //         }
    //     } 
    // }  

    async function getLikesDislikes(id){
        try {
            let response = await axios.get(`http://127.0.0.1:8000/api/reviews/likesDislike/${id}`, { headers: {Authorization: 'Bearer ' + token}});
            // setLikes(response.data)
            console.log(response.data)
        } catch (ex) {
            console.log(ex.response)
        }
    }



    useEffect(() => {
        getReviews();

    },[props.movie.id])
    

    return ( 
        <div className='review-section'>
            <ReviewForm movie={props.movie} getReviews={getReviews} />
            <ReviewList movieId={props.movie.id} movieReviews={movieReviews} getReviews={getReviews} deleteReview={deleteReview}/>
        </div>
     );
}
 
export default Reviews;