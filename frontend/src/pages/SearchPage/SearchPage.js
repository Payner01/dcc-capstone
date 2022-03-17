import axios from 'axios';
import React, { useEffect, useState } from 'react';
import keys from "../../API_Keys.json"
import MovieList from '../../components/MovieList/MovieList';
import SearchBar from '../../components/SerachBar/SearchBar';
import useAuth from "../../hooks/useAuth";



const SearchPage = (props) => {

    const [user, token] = useAuth();
    const [searchList, setSearchList] = useState([]);
    const[movieSelected, setSelectedMovieBool] = useState(false)

    // async function searchMovie(searchTerm){
    //     let response = await axios.get(`https://imdb-api.com/en/API/SearchAll/${keys.IMDb_APIKey}/${searchTerm}`)
    //     setSearchList(response.data.items)
    //     console.log(response.data.items)
    // }

    
        // const searchMovie = async (searchTerm) => {
        //   try {
        //     let response = await axios.get(`https://imdb-api.com/en/API/SearchAll/${keys.IMDb_APIKey}/${searchTerm}`, {
        //       headers: {
        //         Authorization: "Bearer " + token,
        //       },
        //     });
        //     setSearchList(response.data.items);
        //   } catch (error) {
        //     console.log(error.message);
        //   }
        // };

    
        
    function setSearchTerm(results) {
        setSearchList(results);
        setSelectedMovieBool(true);
    }
    

    return ( 

        <div>
            <SearchBar setSearch={setSearchTerm} />
            {/* <h1>{searchList.title}</h1> */}
            {movieSelected? 
            <MovieList movies={searchList} />
            : null}
        </div>


     );
}
 
export default SearchPage;