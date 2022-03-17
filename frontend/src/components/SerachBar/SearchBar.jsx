import axios from 'axios';
import React, { useEffect, useState } from 'react';
import keys from "../../API_Keys.json"
import  Button  from 'react-bootstrap/Button';


const SearchBar = (props) => {

    const [searchTerm, setSearchTerm] = useState('');


    function handleSubmit(event) {
        event.preventDefault();
        searchMovie(searchTerm);
        
    }

    async function searchMovie(searchTerm){
        let response = await axios.get(`https://imdb-api.com/en/API/SearchMovie/${keys.IMDb_APIKey}/${searchTerm}`)
        console.log(response.data.results)
        props.setSearch(response.data.results);
    }

    return ( 
        <div className="form">
            <h1 className='form-header'>Search Movie Library</h1>
            <form className='searchbar' onSubmit={handleSubmit}>
                <input type="text"  placeholder="Search by Title" onChange={(event) => setSearchTerm(event.target.value)} />
                <Button className='custom-btn' variant="primary" size='sm' type="submit" >Search</Button>
            </form>
         </div>


     );
}
 
export default SearchBar;