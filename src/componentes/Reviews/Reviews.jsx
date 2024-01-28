import React, { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import Form from 'react-bootstrap/Form';
import style from "./Reviews.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { postReviews, fetchReviews } from '../../redux/actions/actions';

const BasicRating = () => {
  const [value, setValue] = useState(null);
  const [review, setReview] = useState('');
  const { id } = useParams();
  const dispatch = useDispatch();

  const idKey = id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewData = {
      // Puedes asignar un valor predeterminado o generar un ID único para el usuario no registrado
      userId: 'unregistered_user', 
      productId: idKey,
      rating: value,
      content: review
    };
    console.log('Review data to send:', reviewData);
    dispatch(postReviews(reviewData.userId, reviewData.productId, reviewData.rating, reviewData.content));
  };

  const handleChange = (e) => {
    const userInput = e.target.value;
    const words = userInput.split(' ').filter(word => word !== '');
    const truncatedWords = words.slice(0, 60);
    const truncatedText = truncatedWords.join(' ');
    setReview(truncatedText);
  };

  const allReviews = useSelector(state => state.reviews);

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  const productReviews = allReviews.filter(review => review.productId === idKey);
  console.log("REVIEWS DEL PRODUCTO", productReviews);

  return (
    <>
      <div className={style.container}>
        <Form className={style.containerContent} onSubmit={handleSubmit}>
          <Form.Group controlId="rating">
            <h4>PRODUCTS REVIEWS</h4>
            <br />
            <div className={style.ratingContainer}>
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }} 
              />
              <span>{value}</span>
            </div>
          </Form.Group>
          <Form.Group controlId="review" className={style.container}>
            <textarea
              className="form-control"
              style={{ width: '400px' }}
              value={review}
              cols="800"
              onChange={handleChange}
              placeholder="Write your appreciation of the product and your purchasing experience here"
            ></textarea>   
            <button variant="primary" type="submit">
              <h5>Send</h5>
            </button>
          </Form.Group>
          {/* Resto del código para mostrar las reseñas */}
        </Form>
      </div>
    </>
  );
};

export default BasicRating;