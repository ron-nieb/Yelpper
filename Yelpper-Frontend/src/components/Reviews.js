import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  // Update an existing review
  const updateReview = async (reviewId, updatedReview) => {
    try {
      await axios.put(`http://localhost:3000/reviews/${reviewId}`, updatedReview);
      const updatedReviews = reviews.map((review) =>
        review.id === reviewId ? updatedReview : review
      );
      setReviews(updatedReviews);
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  return (
    <div>
      {reviews.map((review) => (
        <div className="card" style={{ width: "18rem" }} key={review.id}>
          <img className="card-img-top" src={review.image} alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">{review.user}</h5>
            <p className="card-text">{review.review}</p>
            {review.editing ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const updatedReview = e.target.elements.review.value;
                  if (updatedReview) {
                    updateReview(review.id, { ...review, review: updatedReview, editing: false });
                  }
                }}
              >
                <input
                  type="text"
                  name="review"
                  defaultValue={review.review}
                  placeholder="Enter updated review"
                />
                <button type="submit">Update Review</button>
              </form>
            ) : (
              <button
                onClick={() => {
                  const updatedReviews = reviews.map((r) =>
                    r.id === review.id ? { ...r, editing: true } : { ...r, editing: false }
                  );
                  setReviews(updatedReviews);
                }}
                className="btn btn-primary"
              >
                Edit Review
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}