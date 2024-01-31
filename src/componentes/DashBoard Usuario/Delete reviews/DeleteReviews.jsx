import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./DeleteReviews.module.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteReviewAction } from "../../../redux/actions/actions";

const DeleteReview = () => {
  const [localReviews, setLocalReviews] = useState([]);
  const dispatch = useDispatch();
  const deleteReviewError = useSelector((state) => state.deleteReviewError);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:3000/reviews");
        setLocalReviews(response.data);
      } catch (error) {
        console.error("Error al obtener reseñas", error);
      }
    };

    fetchReviews();
  }, []);

  const handleDelete = async (reviewId) => {
    const confirmation = window.confirm("¿Seguro que quieres eliminar esta revisión?");
    if (!confirmation) {
      return;
    }

    try {
      // Dispatch de la acción para eliminar la revisión
      dispatch(deleteReviewAction(reviewId));
      console.log("DELETE ENVIADO: ", reviewId)
    } catch (error) {
      console.error("Error al eliminar la reseña", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerContent}>
        <div className={styles.titleReviews}>
          <h2>REVIEWS CONTROL PANEL</h2>
        </div>
        <div className={styles.reviewContainer}>
          <ul className={styles.reviewContent}>
            {localReviews.map((review) => (
              <li key={review.id} className={styles.individualReview}>
                <div>
                  {review.productId && (
                    <div>
                      <img src={review.productId.image} alt="Product" />
                    </div>
                  )}
                </div>
                <h5>
                  {review.name} {review.surName}
                </h5>
                <span>⭐{review.rating}</span>
                <div className={styles.userReviewContent}>
                  <p>{review.content}</p>
                </div>
                <div>
                  <button onClick={() => handleDelete(review.id)}>
                    <p>Delete</p>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {deleteReviewError && (
          <div className={styles.error}>
            Error al eliminar la revisión: {deleteReviewError.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteReview;
