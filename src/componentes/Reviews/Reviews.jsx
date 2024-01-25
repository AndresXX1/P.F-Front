import React, {useContext, useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Form from 'react-bootstrap/Form';
import style from "./Reviews.module.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { postReviews, fetchReviews } from '../../redux/actions/actions';
import {AuthContext} from "../AuthProvider/authProvider";

const BasicRating = () => {
  const [value, setValue] = useState(null);
  const [review, setReview] = useState('');
  const { id } = useParams();
  const dispatch = useDispatch();
  const { auth } = useContext(AuthContext);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  
  const idKey = id

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
       await dispatch(postReviews(idKey, value, review, auth?.token.name, auth?.token.imageUrl));
       setSubmitSuccess('Review posted successfully');
       setReview(''); // Limpiar el formulario
       setValue(null);
    } catch (error) {
       setSubmitError('Error posting review');
    }
    setSubmitting(false);
   };
  
  const handleChange = (e) => {
    const userInput = e.target.value;
    const words = userInput.split(' ').filter(word => word !== '');
    const truncatedWords = words.slice(0, 60);
    const truncatedText = truncatedWords.join(' ');
    setReview(truncatedText);
  };
  

  useEffect(() => {
    // Llama a la acción fetchReviews cuando el componente se monta
    dispatch(fetchReviews());
  }, [dispatch]);

  const allReviews = useSelector(state => state.reviews);
  
  const productReviews = allReviews.filter(review => review.productId === idKey);
  console.log("REVIEWS DEL PRODUCTO", productReviews)

  if (!auth){
  return (
    <>
      <div className={style.container}>
        <Form className={style.containerContent}>
          <Form.Group controlId="rating">
            <h4>PRODUCTS REVIEWS</h4>
            <br />
            <div className={style.userContent}>
              <h5>You must log in or create an account to post a review.</h5>
            </div>
            <br />
          </Form.Group>
        <div className={style.userReviewsContainer}>
          <div className={style.usersReviewsContent}>
            <div>
            <hr style={{ width: '1000px', display: 'flex' }} />
            <h4>OTHER REVIEWS</h4>
            {productReviews.length > 0 ? (
              productReviews.map((review) => (
                <div key={review.id} className={style.userReview}>
                  <div className={style.userDataReview}>
                  <h5>{review.name}</h5>
                  </div>
                    <div className={style.userContentReview}>
                    <Rating className={style.userRating} value={review.rating} readOnly />
                    <div className={style.reviewComment}>
                    <p>{review.content}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p style={{position:'relative', top:'14px', color:'#5d0c0c', padding:'4px', backgroundColor:'#df8a8aac', borderRadius:'2px', width:'180px', display:'flex', margin:'0 auto', marginBottom:'30px'}}>⛔ No reviews available</p>
            )}
          </div>
          </div>
        </div>
        </Form>
      </div>
    </>
  );

} else if (auth){
  return(
    <>
      <div className={style.container}>
        <Form className={style.containerContent}>
          <Form.Group controlId="rating">
            <h4>PRODUCTS REVIEWS</h4>
            <br />
            <div className={style.userContent}>
              {auth?.token?.imageUrl && (
                <img src={auth.token.imageUrl} style={{ borderRadius: "50%", height: '34px', width: '34px'}} alt="user-avatar" />
              )}
            <h4>{auth?.token.name}</h4>
            </div>
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
              cols="4"
              onChange={handleChange}
              placeholder="Write your appreciation of the product and your purchasing experience here"
            ></textarea>   
            <button variant="primary" type="submit" onClick={handleSubmit}>
              <h5>Send</h5>
            </button>
          </Form.Group>
          <div className={style.userReviewsContainer}>
          <div className={style.usersReviewsContent}>
            <hr style={{ width: '1000px'}} />
            <h4>OTHER REVIEWS</h4>

            {productReviews.length > 0 ? (
              productReviews.map((review) => (
                <div key={review.id} className={style.userReview}>
                  <div className={style.userDataReview}>
                    <div>
                    <img src={review.profileImage} alt="" />
                    </div>
                  <h5>{review.name}</h5>
                  </div>
                    <div className={style.userContentReview}>
                    <Rating className={style.userRating} value={review.rating} readOnly />
                    <div className={style.reviewComment}>
                    <p>{review.content}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p style={{position:'relative', top:'14px', color:'#5d0c0c', padding:'4px', backgroundColor:'#df8a8aac', borderRadius:'2px', width:'180px', display:'flex', margin:'0 auto', marginBottom:'30px'}}>⛔ No reviews available</p>
            )}
          </div>
          </div>
        </Form>
      </div>
  </>
  )
  }
  }
export default BasicRating;
