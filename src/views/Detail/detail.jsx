import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchProductDetail,clearProductDetail,getSneakers} from "../../redux/actions/actions";
import style from "./Detail.module.css";
import BottomBar from "./bottomBar";
import Reviews from "../../componentes/Reviews/Reviews"
import { useParams } from 'react-router-dom';

const Detail = ({ brand }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedColors, setSelectedColors] = useState([]);
  const zapatilla = useSelector((state) => state?.product?.detail);
  const allSneakers = useSelector((state) => state.sneakers);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const intervalRef = useRef(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);


  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetail(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (zapatilla && zapatilla.image && zapatilla.image.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex < zapatilla.image.length - 1 ? prevIndex + 1 : 0
        );
      }, 3000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [zapatilla]);

  useEffect(() => {
    // Reiniciamos el índice de la imagen al cambiar la tarjeta
    setSelectedImageIndex(0);

    if (zapatilla && zapatilla.image && zapatilla.image.length > 1) {
      const intervalId = setInterval(() => {
        setSelectedImageIndex((prevIndex) =>
          prevIndex < zapatilla.image.length - 1 ? prevIndex + 1 : 0
        );
      }, 4000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [zapatilla]);

  const handlePrevImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : zapatilla.image.length - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex < zapatilla.image.length - 1 ? prevIndex + 1 : 0
    );
  };

  useEffect(() => {
    if (zapatilla && zapatilla.colors) {
      setSelectedColors(zapatilla.colors);
    }
  }, [zapatilla && zapatilla.colors]);

  let logoUrl;
  switch (brand) {
    case "NIKE":
      logoUrl = "https://d3sxshmncs10te.cloudfront.net/icon/free/svg/761696.svg?token=...";
      break;
    case "ADIDAS":
      logoUrl = "https://d3sxshmncs10te.cloudfront.net/icon/free/svg/7581614.svg?token=...";
      break;
    case "NEW BALANCE":
      logoUrl = "https://logos-world.net/wp-content/uploads/2020/09/New-Balance-Emblem.png";
      break;
    default:
      logoUrl = null;
  }

  useEffect(() => {
    return () => {
      dispatch(clearProductDetail());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSneakers());
  }, [dispatch]);

  useEffect(() => {
    if (!zapatilla) {
      dispatch(fetchProductDetail(id));
    }
  }, [dispatch, id, zapatilla]);
  
  if (!zapatilla) {
    return <div>Loading...</div>;
  }
  
  if (!zapatilla.name) {
    return <div>Datos no disponibles</div>;
  }
  
  const handleRatingChange = (value) => {
    setRating(value);
  };

  // Function to toggle comment form visibility
  const toggleCommentForm = () => {
    setCommentFormVisible(!isCommentFormVisible);
  };
  

  return (
    <div className={style.container}>
      <div className={style.sneakersListContainer}>
      <BottomBar
          allSneakers={allSneakers}
          onClickPrev={handlePrevImage}
          onClickNext={handleNextImage}
          />
        </div>
      <div className={style.detailContainer}>
        <div className={style.imagePreview}>
        <img src={zapatilla && zapatilla.image[selectedImageIndex]} alt={zapatilla.name} />
        </div>
        <div className={style.detailContent}>
          <br />
          <h2>{zapatilla && zapatilla.brand}</h2>
          <div className={style.nameContainer}>
            <h4>{zapatilla && zapatilla.name}</h4>
          </div>
          <div className={style.logoContainer}>
            {logoUrl && <img src={logoUrl} alt={`${brand} Logo`} />}
          </div>
          <br />
          <div className={style.price}>
            <h4>${zapatilla.price} USD</h4>
          </div>
          <h4>Colors:</h4>
          <div className={style.containerColors}>
        {selectedColors.map((selectedColor, index) => (
          <span key={index}>
            {selectedColor}
            {index < selectedColors.length - 1 && <span>&nbsp;</span>}
          </span>
        ))}
          </div>
          <h4>Sizes:</h4>
          <div className={style.sizesContainer}>
            <span>{zapatilla && zapatilla.size.join(", ")}</span>
          </div>
          <br />
          <h4>Gender:</h4>
          <div>
            <h4>{zapatilla && zapatilla.gender}</h4>
          </div>
        </div>
      </div>
          <div className={style.reviewContainer}>
          <Reviews productId={id} />
          </div>
      <div>
    </div>
  </div>
  );
};

export default Detail;