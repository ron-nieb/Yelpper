import React, { useState, useEffect } from "react";
import axios from "axios";
import Reviews from "./Reviews";

export default function Hotel() {
  const [hotels, setHotels] = useState([]);
  const [newHotel, setNewHotel] = useState({ name: "", location: "", amenities: [] });
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [newReview, setNewReview] = useState({ user: "", comment: "" });

  useEffect(() => {
    fetchHotels();
  }, []);

  // Fetch hotels from the server
  const fetchHotels = async () => {
    try {
      const response = await axios.get("http://localhost:3000/hotels");
      setHotels(response.data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  // Add a new hotel
  const addHotel = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/hotels",
        newHotel
      );
      setHotels([...hotels, response.data]);
      setNewHotel({ name: "", location: "", amenities: [] });
    } catch (error) {
      console.error("Error adding hotel:", error);
    }
  };

  // Add a new review for a hotel
  const addReview = async (hotelId) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/reviews`,
        {
          ...newReview,
          hotelId: hotelId,
        }
      );
      const updatedHotels = hotels.map((hotel) => {
        if (hotel.id === hotelId) {
          return {
            ...hotel,
            reviews: [...hotel.reviews, response.data],
          };
        }
        return hotel;
      });
      setHotels(updatedHotels);
      setNewReview({ user: "", comment: "" });
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  // Render hotels list
  const renderHotels = () => {
    return hotels.map((hotel) => (
      <div key={hotel.id} className="card" style={{ width: "18rem" }}>
        <img className="card-img-top" src={hotel.image} alt="Hotel" />
        <div className="card-body">
          <h5 className="card-title">{hotel.name}</h5>
          <p className="card-text">{hotel.location}</p>
          <button
            onClick={() => setSelectedHotel(hotel)}
            className="btn btn-primary"
          >
            Add Review
          </button>
          {selectedHotel && selectedHotel.id === hotel.id && renderAddReviewForm(hotel.id)}
        </div>
      </div>
    ));
  };

  // Render add review form
  const renderAddReviewForm = (hotelId) => {
    return (
      <form onSubmit={() => addReview(hotelId)}>
        <input
          type="text"
          value={newReview.user}
          onChange={(e) => setNewReview({ ...newReview, user: e.target.value })}
          placeholder="User"
        />
        <input
          type="text"
          value={newReview.comment}
          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
          placeholder="Comment"
        />
        <button type="submit">Add Review</button>
      </form>
    );
  };

  // Render add hotel form
  const renderAddHotelForm = () => {
    const amenities = ["Wi-Fi", "Parking", "Swimming Pool", "Gym", "Restaurant"];

    const handleAmenityChange = (amenity) => {
      const isChecked = newHotel.amenities.includes(amenity);
      const updatedAmenities = isChecked
        ? newHotel.amenities.filter((a) => a !== amenity)
        : [...newHotel.amenities, amenity];
      setNewHotel({ ...newHotel, amenities: updatedAmenities });
    };

    return (
      <form onSubmit={addHotel}>
        <input
          type="text"
          value={newHotel.name}
          onChange={(e) => setNewHotel({ ...newHotel, name: e.target.value })}
          placeholder="Hotel Name"
        />
        <input
          type="text"
          value={newHotel.location}
          onChange={(e) => setNewHotel({ ...newHotel, location: e.target.value })}
          placeholder="Hotel Location"
        />
        <input
          type="text"
          value={newHotel.description}
          onChange={(e) => setNewHotel({ ...newHotel, description: e.target.value })}
          placeholder="Hotel Description"
        />
        <input
          type="text"
          value={newHotel.image}
          onChange={(e) => setNewHotel({ ...newHotel, image: e.target.value })}
          placeholder="Hotel Image URL"
        />
        <div>
          <p>Amenities:</p>
          {amenities.map((amenity) => (
            <label key={amenity}>
              <input
                type="checkbox"
                checked={newHotel.amenities.includes(amenity)}
                onChange={() => handleAmenityChange(amenity)}
              />
              {amenity}
            </label>
          ))}
        </div>
        <button type="submit">Add Hotel</button>
      </form>
    );
  };

  return (
    <div>
      {renderHotels()}
      {renderAddHotelForm()}
    </div>
  );
}