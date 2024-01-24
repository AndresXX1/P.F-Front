import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSneakers, searchBar, resetSearch } from '../../redux/actions/actions';
import style from "./SearchBar.module.css";

const SearchBar = ({page, pageSize}) => {
 const dispatch = useDispatch();
 const [search, setSearch] = useState("");
 const totalSneaker = useSelector((state) => state?.totalSneaker);

 const fetchData = (term) => {
   if (term) {
     dispatch(searchBar(term));
   } else {
     dispatch(getSneakers(page, pageSize));
   }
 };

 const handleChange = (event) => {
   const searchTerm = event.target.value;
   setSearch(searchTerm);
   fetchData(searchTerm);
 };

 useEffect(() => {
   fetchData(search);
 }, [search, dispatch]);

 const handleReset = () => {
   setSearch("");
   dispatch(resetSearch());
   fetchData();
 };

 return (
   <div className={style.container}>
     <form className={style.containerForm} onSubmit={(e) => e.preventDefault()}>
       <input
         type="text"
         value={search}
         onChange={handleChange}
         placeholder="Search"
       />
       <img type="submit" src="src\assets\searchbar-loupe.png" alt="" className={style.buttonImg} onClick={handleReset} />
     </form>
    
   </div>
 );
};

export default SearchBar;