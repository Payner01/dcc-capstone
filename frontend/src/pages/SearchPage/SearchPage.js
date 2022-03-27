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

    

    
        
    function setSearchTerm(results) {
        setSearchList(results);
        setSelectedMovieBool(true);
    }
    

    return ( 

        <div>
            <SearchBar setSearch={setSearchTerm} />
            {/* <h1>{searchList.title}</h1> */}
            {movieSelected? 
            <MovieList movies={searchList} isPannel/>
            : null}
        </div>


     );
}
 
export default SearchPage;