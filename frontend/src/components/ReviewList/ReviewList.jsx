import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import './ReviewList.css'
import { MDBIcon,MDBBtn } from 'mdb-react-ui-kit';


const Reviews = (props) => {

    const [user, token] = useAuth();
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [reviewId, setReviewId] = useState(null);
    const [review, setReview] = useState([]);

    const [likeActive, setLikeActive] = useState(false);
    const [dislikeActive, setDislikeActive] = useState(false);

    
    console.log(props.movieReviews)
    console.log(user)
   

    // async function getLikesDislikes(id){
    //     try {
    //         let response = await axios.get(`http://127.0.0.1:8000/api/reviews/likesDislike/${id}`, { headers: {Authorization: 'Bearer ' + token}});
    //         // setLikes(response.data)
    //         console.log(response.data)
    //     } catch (ex) {d
    //         console.log(ex.response)
    //     }
    // }

    function handleLikeSubmit(review){
        setLikes(review.likes)
        
        setReview(review)
        addLike()
    }
    function handleDislikeSubmit(review){
        
        setDislikes(review.dislikes)
        setReview(review)
        addDislike()
    }

    async function setLikeDislikes(){
        try {
        let newReview = {
            user: user,
            movie_id: props.movieId,
            text: review.text,
            likes: likes,
            dislikes: dislikes
        }
         
            let response = await axios.put(`http://127.0.0.1:8000/api/reviews/likesDislike/${review.id}/`, newReview , { headers: {Authorization: 'Bearer ' + token}})
            console.log(response.data)
            props.getReviews();
        } catch (ex) {
            console.log(ex.response)
        }
    }

    function addLike(){
        if(likeActive){
            setLikeActive(false);
            setLikes(likes - 1);
        } else {
            setLikeActive(true);
            setLikes(likes + 1);
            if(dislikeActive){
                setDislikeActive(false);
                setLikes(likes + 1);
                setDislikes(dislikes - 1)
            }
        }
        // setLikeDislikes(review)
        
        
    }

    function addDislike(){
        if(dislikeActive){
            setDislikeActive(false);
            setDislikes(dislikes - 1);
        } else {
            setDislikeActive(true);
            setDislikes(dislikes + 1);
            if(likeActive){
                setLikeActive(false);
                setDislikes(dislikes + 1);
                setLikes(likes - 1);
            }
        }
    }

    useEffect(() => {
        setLikeDislikes(review);
    },[likes, dislikes])

    // function handleSubmit(reviewId) {
        
    //     let reviewLiked = {
    //         user: user,
    //         like_dislike: 'like',
    //         review_id: reviewId,
            
    //     }
        
    //     props.postLike(reviewLiked)

        
    // }

    return ( 

        <div>
            {props.movieReviews.map((review, index) => {
                return (
                    <div className="form-grid" key={index}>
                        <div className="form-control" >
                            <h4 className="form-heading">{review.user.username}</h4>
                            <div className="post-content">{review.text}</div>
                            <div className='post-actions'>
                            <MDBIcon onClick={() => {handleLikeSubmit(review)}}fas icon="thumbs-up" size='1x'/>
                            <h3>{review.likes}</h3>
                            
                            <MDBIcon onClick={() => {handleDislikeSubmit(review)}}fas icon="thumbs-down" size='1x'/>
                            <h3>{review.dislikes}</h3>
                            {user.id === review.user.id && 
                    
                            <MDBIcon onClick={() => props.deleteReview(review.id)}fas icon="trash-alt" size='1x'/>}
                            </div>
                            
                        </div>
                    </div>
                                                     
                );
            })}
        </div>
     );
}
 
export default Reviews;