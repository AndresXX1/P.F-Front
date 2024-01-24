import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getSneakers, searchBar } from "../../redux/actions/actions";
import Cards from "../../componentes/Cards/cards";
import Paginado from '../../componentes/Paginado/Paginado';
import styles from './Home.module.css';
import Filter from '../../componentes/Filter/filter';
import SearchBar from '../../componentes/SearchBar/searchBar';
import { rgba } from 'polished';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';


const Home = () => {
  const dispatch = useDispatch();
  const sneakers = useSelector((state) => state?.sneakers);
  const totalSneaker = useSelector((state) => state?.totalSneaker);
  const currentPage = useSelector((state) => state?.currentPage);
  const brand = useSelector((state) => state?.brandValue);
  const color = useSelector((state) => state?.colorValue);
  const size = useSelector((state) => state?.sizeValue);
  const price = useSelector((state) => state?.orderPrice);
  const searchState = useSelector((state) => state?.data); //  estado para los resultados de la búsqueda
  const pageSize = 8;
  const currentPageSearch = useSelector((state) => state?.page);
  
  useEffect(() => {
    if(searchState && searchState.length > 0){
      dispatch(searchBar(searchState,currentPageSearch, pageSize,price ));
    } else {
    dispatch(getSneakers(currentPage, pageSize, brand, color, size, price));
}}, [dispatch]);

  const setCurrentPage = (page) => {
    if(searchState && searchState.length > 0){
      dispatch(searchBar( searchState ,page, pageSize,price));
    } else {
    dispatch(getSneakers(page, pageSize, brand, color, size, price));}
  };


  
      
const RedAlert = ({ message }) => (
 <div style={{ backgroundColor: rgba(223, 51, 21, 0.8),
  padding: '10px',
   color: 'black',
    width: '50%',
     display: 'flex',
      justifyContent: 'center',
       alignItems: 'center',
        marginTop: '90px',
         boxShadow: '0px 6px 10px rgba(100, 51, 21, 0.8)' }}>
 <FontAwesomeIcon icon={faTimesCircle} style={{ marginRight: '10px' }}/>
 {message}
 <FontAwesomeIcon icon={faTimesCircle} style={{ marginLeft: '10px' }}/>
 </div>
);
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.filterComponent}>
          <div className={styles.searchBarComponent}>

          <SearchBar totalSneaker={totalSneaker} page={currentPage} pageSize={pageSize} setCurrentPage={setCurrentPage}></SearchBar>

          </div>
          <Filter totalSneaker={searchState ? searchState.length : totalSneaker} page={currentPage} pageSize={pageSize} setCurrentPage={setCurrentPage}></Filter>
        </div>
          <div className={styles.paginado}>

          <Paginado totalSneaker={totalSneaker} page={currentPageSearch >= 1 ?currentPageSearch: currentPage} pageSize={pageSize} setCurrentPage={setCurrentPage}/>

          </div>
        <div className={styles.cardsComponent}>
          <Cards sneakers={sneakers} />
          <div className={styles.cardsComponent}>
          {(sneakers && sneakers.length === 0) && 
 <RedAlert message="No se encontraron resultados. ¡Intenta con diferentes filtros!" />
}

      </div>
        </div>
      </div>
      <div className={styles.paginatedComponent}>
      </div>
    </div>
  );
};

export default Home;