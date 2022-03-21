import axios from 'axios';
import React, {useState} from 'react';
import { Form, Col, Button } from 'react-bootstrap'
import useAuth from '../../hooks/useAuth';


const ReviewForm = (props) => {

    const [user, token] = useAuth();
    const [review, setReview] = useState('');
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0); 

    

    function handleSubmit(event){
        event.preventDefault();
        let newReview = {
            user: user,
            text: review,
            movie_id: props.movie.id,
            likes: likes,
            dislikes: dislikes

        }
        postReview(newReview);
        
        
    }

    

    async function postReview(review){
        console.log(review)
        try {
            let response = await axios.post(`http://127.0.0.1:8000/api/reviews/`, review, { headers: {Authorization: 'Bearer ' + token}});// add video string to path
            console.log(response);
            console.log(response.data);

        } catch (ex) {
            console.log(ex.response);
        }
        props.getReviews();
        
    }

    return ( 
            
        <Form onSubmit={handleSubmit}>
            { token &&
            <React.Fragment>
            <Form.Label column sm="2"></Form.Label>
            </React.Fragment>
            }
            { !token &&
            <React.Fragment>
            <Form.Label column sm="2">Sign in To Comment!</Form.Label>
            </React.Fragment>
            }
            <Form.Group  className="mb-3" controlId="formPlaintextPassword">
                <Form.Label column sm="2">Reviews</Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Insert Review Here" onChange={(event) => setReview(event.target.value)} />
                    </Col>
                </Form.Group>
            <Button type='submit'>submit</Button>
        </Form>

     );
}
 
export default ReviewForm;