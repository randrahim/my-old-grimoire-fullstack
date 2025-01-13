import * as PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styles from "./BookRatingForm.module.css";
import { generateStarsInputs, displayStars } from "../../../lib/functions";
import { APP_ROUTES } from "../../../utils/constants";
import { useUser } from "../../../lib/customHooks";
import { rateBook } from "../../../lib/common";

function BookRatingForm({ rating, setRating, userId, setBook, id, userRated }) {
  const { connectedUser, auth } = useUser();
  const navigate = useNavigate();
  const { register, formState, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {
      rating: 0,
    },
  });
  useEffect(() => {
    if (formState.dirtyFields.rating) {
      const rate = document.querySelector('input[name="rating"]:checked').value;
      setRating(parseInt(rate, 10));
      formState.dirtyFields.rating = false;
    }
  }, [formState]);
  const onSubmit = async () => {
    if (!connectedUser || !auth) {
      navigate(APP_ROUTES.SIGN_IN);
      return;
    }

    try {
      const updatedBook = await rateBook(id, userId, rating);
      if (updatedBook) {
        // Update the book state with the new data
        setBook({ ...updatedBook, id: updatedBook._id });
      } else {
        alert("Failed to update the rating. Please try again.");
      }
    } catch (error) {
      console.error("Error in rating submission:", error);
      alert("An error occurred. Please try again later.");
    }
  };
  return (
    <div className={styles.BookRatingForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>{rating > 0 ? "Your Rating" : "Rate this book"}</p>
        <div className={styles.Stars}>
          {!userRated
            ? generateStarsInputs(rating, register)
            : displayStars(rating)}
        </div>
        {!userRated ? <button type="submit">Confirm</button> : null}
      </form>
    </div>
  );
}

BookRatingForm.propTypes = {
  rating: PropTypes.number.isRequired,
  setRating: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  setBook: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  userRated: PropTypes.bool.isRequired,
};

export default BookRatingForm;
