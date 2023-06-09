import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  // Fetch all reviews
  const fetchReviews = async () => {
    try {
      const response = await axios.get("http://localhost:3000/reviews");
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

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

  // Delete a review
  const deleteReview = async (reviewId) => {
    try {
      await axios.delete(`http://localhost:3000/reviews/${reviewId}`);
      const filteredReviews = reviews.filter((review) => review.id !== reviewId);
      setReviews(filteredReviews);
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  // Render the reviews
  const renderReviews = () => {
    return reviews.map((review) => {
      return (
        <div className="col-md-4" key={review.id}>
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">{review.user}</h5>
              <p className="card-text">{review.comment}</p>
              <div className="d-flex justify-content-between">
                {review.editing ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const updatedReview = e.target.elements.review.value;
                      if (updatedReview) {
                        updateReview(review.id, {
                          ...review,
                          review: updatedReview,
                          editing: false,
                        });
                      }
                    }}
                  >
                    <input
                      type="text"
                      name="review"
                      defaultValue={review.review}
                      placeholder="Enter updated review"
                      className="form-control"
                    />
                    <button type="submit" className="btn btn-primary mt-2">
                      Update Review
                    </button>
                  </form>
                ) : (
                  <div>
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
                    <button
                      onClick={() => deleteReview(review.id)}
                      className="btn btn-danger"
                    >
                      Delete Review
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return <div className="row">{renderReviews()}</div>;
}