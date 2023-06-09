import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Hotel() {
  const [hotels, setHotels] = useState([]);
  const [newHotel, setNewHotel] = useState({ name: '', location: '', amenities: [] });
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [newReview, setNewReview] = useState({ user: '', comment: '' });

  useEffect(() => {
    fetchHotels();
  }, []);

  // Fetch hotels from the server
  const fetchHotels = async () => {
    try {
      const response = await axios.get('http://localhost:3000/hotels');
      setHotels(response.data);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };

  // Add a new hotel
  const addHotel = async () => {
    try {
      const response = await axios.post('http://localhost:3000/hotels', newHotel);
      setHotels([...hotels, response.data]);
      setNewHotel({ name: '', location: '', amenities: [] });
    } catch (error) {
      console.error('Error adding hotel:', error);
    }
  };

  // Add a new review for a hotel
  const addReview = async (hotelId) => {
    try {
      const response = await axios.post(`http://localhost:3000/reviews`, {
        ...newReview,
        hotelId: hotelId,
      });

      const updatedHotels = hotels.map((hotel) => {
        if (hotel.id === hotelId) {
          const reviews = hotel.reviews || []; // Handle undefined or non-array reviews
          return {
            ...hotel,
            reviews: [...reviews, response.data],
          };
        }
        return hotel;
      });

      setHotels(updatedHotels);
      setNewReview({ user: '', comment: '' });

      toast.success('Review has been saved'); // Display a success toast notification
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  // Render hotels list
  const renderHotels = () => {
    return hotels.map((hotel) => (
      <div key={hotel.id} className="col-md-4 mb-4">
        <div className="card">
          <img src={hotel.image} className="card-img-top" alt={hotel.name} />
          <div className="card-body">
            <h5 className="card-title">{hotel.name}</h5>
            <p className="card-text">{hotel.location}</p>
            <button onClick={() => setSelectedHotel(hotel)} className="btn btn-primary">
              Add Review
            </button>
            {selectedHotel && selectedHotel.id === hotel.id && renderAddReviewForm(hotel.id)}
          </div>
        </div>
      </div>
    ));
  };

  // Render add review form
  const renderAddReviewForm = (hotelId) => {
    return (
      <form onSubmit={() => addReview(hotelId)}>
        <div className="form-group">
          <label htmlFor="user">User</label>
          <input
            type="text"
            className="form-control"
            id="user"
            value={newReview.user}
            onChange={(e) => setNewReview({ ...newReview, user: e.target.value })}
            placeholder="Enter user"
          />
        </div>
        <div className="form-group">
          <label htmlFor="comment">Comment</label>
          <input
            type="text"
            className="form-control"
            id="comment"
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            placeholder="Enter comment"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Review
        </button>
      </form>
    );
  };

  // Render add hotel form
  const renderAddHotelForm = () => {
    const amenities = ['Wi-Fi', 'Parking', 'Swimming Pool', 'Gym', 'Restaurant'];

    const handleAmenityChange = (amenity) => {
      const isChecked = newHotel.amenities.includes(amenity);
      const updatedAmenities = isChecked
        ? newHotel.amenities.filter((a) => a !== amenity)
        : [...newHotel.amenities, amenity];
      setNewHotel({ ...newHotel, amenities: updatedAmenities });
    };

    return (
      <form onSubmit={addHotel}>
        <div className="form-group">
          <label htmlFor="name">Hotel Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={newHotel.name}
            onChange={(e) => setNewHotel({ ...newHotel, name: e.target.value })}
            placeholder="Enter hotel name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Hotel Location</label>
          <input
            type="text"
            className="form-control"
            id="location"
            value={newHotel.location}
            onChange={(e) => setNewHotel({ ...newHotel, location: e.target.value })}
            placeholder="Enter hotel location"
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Hotel Image URL</label>
          <input
            type="text"
            className="form-control"
            id="image"
            value={newHotel.image}
            onChange={(e) => setNewHotel({ ...newHotel, image: e.target.value })}
            placeholder="Enter hotel image URL"
          />
        </div>
        <div className="form-group">
          <p>Amenities:</p>
          {amenities.map((amenity) => (
            <label key={amenity} className="mr-3">
              <input
                type="checkbox"
                checked={newHotel.amenities.includes(amenity)}
                onChange={() => handleAmenityChange(amenity)}
              />
              {amenity}
            </label>
          ))}
        </div>
        <button type="submit" className="btn btn-primary">
          Add Hotel
        </button>
      </form>
    );
  };

  return (
    <div>
      <div className="container">
        <div className="row">{renderHotels()}</div>
      </div>
      <div className="container mt-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Add Hotel</h5>
            {renderAddHotelForm()}
          </div>
        </div>
      </div>
      <ToastContainer /> {/* Add ToastContainer to display toast notifications */}
    </div>
  );
}