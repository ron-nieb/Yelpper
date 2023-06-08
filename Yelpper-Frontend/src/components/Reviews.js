import React, { useState, useEffect } from "react";
import axios from "axios";


export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [editReview, setEditReview] = useState(null);
  

  useEffect(() => {
    fetch(" http://localhost:3000/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  function ShowReviews(){
    return reviews.map((review) => (
        <div className="card" style={{ width: "18rem" }}>
          <img className="card-img-top" src={review.image} alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">{review.user}</h5>
            <p className="card-text">{review.review}</p>
            <button onClick={() => setEditReview(review)} className="btn btn-primary">Edit Review</button>
          </div>
        </div>
      ));

     
  }
  // Update an existing review
  const updateReview = async () => {
    try {
      await axios.put(
        `http://localhost:3000/reviews/${editReview.id}`,
        editReview
      );
      const updatedReviews = reviews.map((review) =>
        review.id === editReview.id ? editReview : review
      );
      setReviews(updatedReviews);
      setEditReview(null);
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  // Render edit review form
  const renderEditReviewForm = () => {
    return (
      <form onSubmit={updateReview}>
        <input
          type="text"
          value={editReview.user}
          onChange={(e) =>
            setEditReview({ ...editReview, user: e.target.value })
          }
          placeholder="User"
        />
        <input
          type="text"
          value={editReview.comment}
          onChange={(e) =>
            setEditReview({ ...editReview, comment: e.target.value })
          }
          placeholder="Comment"
        />
        <button type="submit">Update Review</button>
        <button onClick={() => setEditReview(null)}>Cancel</button>
      </form>
    );
  };
 <div>
      {ShowReviews()}
      {editReview ? renderEditReviewForm() : null}
  </div>
}
