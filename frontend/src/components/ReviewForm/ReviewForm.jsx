import axios from 'axios';
import React, {useState} from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap'
import useAuth from '../../hooks/useAuth';
import './ReviewForm.css'


const ReviewForm = (props) => {

    const [user, token] = useAuth();
    const [review, setReview] = useState('');
    

    

    function handleSubmit(event){
        event.preventDefault();
        let newReview = {
            user: user,
            text: review,
            movie_id: props.movie.id,
            likes: 0,
            dislikes: 0
            

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
        setReview('');
    }

    return ( 
            
        <Form  onSubmit={handleSubmit}>
            <Form.Group  className="review-form mb-3" controlId="formPlaintextPassword">
                <Form.Label column style={{ color: 'white'}}>Reviews</Form.Label>
                    <Col sm='11' className='review-column'>
                        <Row className='review-row'>
                            <Form.Control type="text" value={review} placeholder="Insert Review Here" onChange={(event) => setReview(event.target.value)} />
                            
                        </Row>
                        <Row>
                            <Button  type='submit'>submit</Button>
                        </Row>
                        
                    </Col>
                    
                </Form.Group>
            
        </Form>

     );
}
 
export default ReviewForm;