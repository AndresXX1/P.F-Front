import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./bottomBar.css";
import { useDispatch, useSelector } from "react-redux";
import { getSneakers, setSelectedSneakerIndex } from "../../redux/actions/actions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';


const BottomBar = ({ onClickPrev, onClickNext }) => {
 const history = useHistory();
 const dispatch = useDispatch();
 const [selectedSneakerId, setSelectedSneakerId] = useState(null);
 const allSneakers = useSelector((state) => state.sneakers);
 const [displayedSneakers, setDisplayedSneakers] = useState([]);
 const [currentIndex, setCurrentIndex] = useState(0);

 useEffect(() => {
    dispatch(getSneakers());
 }, [dispatch]);

 useEffect(() => {
    if (allSneakers.length > 0) {
      setDisplayedSneakers(allSneakers.slice(currentIndex, currentIndex + 6));
    }
 }, [allSneakers, currentIndex]);

 const handleClick = (sneaker) => {
    dispatch(setSelectedSneakerIndex(0));
    setSelectedSneakerId(sneaker.id);
    history.push(`/detail/${sneaker.id}`);
 };

 const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
 };

 const handleNext = () => {
    if (currentIndex < allSneakers.length - 6) {
      setCurrentIndex(currentIndex + 1);
    }
 };

 return (
    <div className="container">
      <div className="bottom-bar-container">
        <FontAwesomeIcon icon={faAngleUp} onClick={handlePrev} />
        {displayedSneakers.map((sneaker) => (
          <div
            key={sneaker.id}
            className="pokemon-button"
            onClick={() => handleClick(sneaker)}
          >
           {sneaker.image && Array.isArray(sneaker.image) && sneaker.image.length > 0 ? (
 
 sneaker.image[0].startsWith("http") || sneaker.image[0].startsWith("data:") ? (
 <img src={sneaker.image[0]} alt={sneaker.name} /> ) : 
 (<img src={sneaker.image[0]} alt={sneaker.name} />
   )) : sneaker.image && typeof sneaker.image === 'object' && sneaker.image.secure_url ? (
< img src={sneaker.image.secure_url} alt={sneaker.name} /> ) : ( <div>No hay imagen disponible</div>)}
 </div>
))}
        <FontAwesomeIcon icon={faAngleDown} onClick={handleNext} />
      </div>
    </div>
 );
};

export default BottomBar;