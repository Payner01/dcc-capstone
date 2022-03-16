import React from 'react';
import './MovieList.css'


const MovieList = (props) => {

    


    return (  
        <div className="container-fluid movie-list">
                <div className="row">

                    {props.movies.slice(0, 25).map((movie, index) => (

                            <img key={index} className="movie-poster" src={movie.image} alt='movie'></img>

                    ))}
            </div>
        </div>
        

    );
}
 
export default MovieList;