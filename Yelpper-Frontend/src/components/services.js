import React  from "react";
import { useState,useEffect } from "react";
import "../css/Services.css"




function Services() {
    const [reviews , setreviews] = useState([])
    const [showreviews, setShowreviews] = useState(false);

    const [hotels, sethotels] = useState([])
    const [showhotels, setShowhotels] = useState(false)
    

    const [periodicals, setPeriodicals] = useState([])
    const [showPeriodicals, setShowPeriodicals] = useState(false)



    useEffect(() => {
            fetch('http://localhost:3000/reviews')
            .then(res => res.json())
            .then(data => setreviews(data))
        }, []);
   
    useEffect(() => {
            fetch('http://localhost:3000/reviews')
            .then(res => res.json())
            .then(data => sethotels(data))
        }, []);

    useEffect(() => {
            fetch('http://localhost:3000/periodicals')
            .then(res => res.json())
            .then(data => setPeriodicals(data))
        }, []);

        const handleShowreviews = () => {
            setShowreviews(true);
            return (
                <>
                    <div class="card" style="width: 18rem;">
                        <img class="card-img-top" src={reviews.image} alt="Card image cap"></img>
                            <div class="card-body">
                                <h5 class="card-title">{reviews.user}</h5>
                                <p class="card-text">{reviews.Review}}</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                    </div>
                </>
            )
          };


        const handleReservereview = (reviewId) => {
            setShowreviews(false);
            showRegistrationForm(true);
          
            const updatedreviews = reviews.map((review) => {
              if (review.id === reviewId) {
                return {
                  ...review,
                  available_reviews: review.available_reviews - 1
                };
              }
              return review;
            });
            setreviews(updatedreviews);


          };

        function showRegistrationForm(show) {
            let form = document.getElementById("registration-form");
            form?.style.setProperty("display", show ? "block" : "none");
          }
    

        const handleShowhotels = () => {
            setShowhotels(true);
            setShowreviews(false);
            setShowPeriodicals(false);
        }

        const handleReserveSpace = () => {
          setShowhotels(false);
          if (isSpaceAvailable) {
            showRegistrationSpaceForm(true);
            setIsSpaceAvailable(false);
          } else {
            alert("Sorry! This space is already taken.");
          }
        };
        

        function showRegistrationSpaceForm(show) {
            let form = document.getElementById("space-form");
            form?.style.setProperty("display", show ? "block" : "none");
            
          }

        const handleShowPeriodicals = () => {
            setShowPeriodicals(true);
            setShowhotels(false);
            setShowreviews(false)
        }

        const handleReservePeriodical = () => {
            setShowPeriodicals(false);
            showPeriodicalsForm(true);
          };

        function showPeriodicalsForm(show) {
            let form = document.getElementById("periodicals-form");
            form?.style.setProperty("display", show ? "block" : "none");
          }

        
    
    return(
        <>
            <h1 className="Start">Services</h1>
            <div className="icons">
                <div className="icons-container">
                    <h3 className="container-header">Our reviews</h3>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOZexRYve7e39-JvKg3-wjMOPmbiKHW3vG1w&usqp=CAU" alt="reviews" className="image-icons" />
                    <br></br>
                    <p>Search for a review in our Library Collection and reserve one today</p>
                    <button onClick={handleShowreviews}>Our reviews</button>
                </div>
            <div className="icons-container">
                <h3 className="container-header">Our hotels</h3>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvzN9uZbNOmtVqKhIRY4Vlc1gd1fwhAo_ZeQ&usqp=CAU" alt="hotels" className="image-icons" />
                <br></br>
                <p>You can now review a physical space for you and/or your group</p>
                <button onClick={handleShowhotels}>Our hotels</button>
               
            </div>
                <div className="icons-container">
                    <h3 className="container-header">Our Periodicals</h3>
                    <img src="https://images.unsplash.com/photo-1523249322636-7defc1f0c35a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cGVyaW9kaWNhbHMlMjBib29rc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="hotels" className="image-icons" />
                    <br></br>
                    <p>Get indepth knowledge with our featured periodicals reviews</p>
                    <button onClick={handleShowPeriodicals}>Our Periodicals</button>     
                </div>
            </div>
            
            {showreviews && (
          <>
            <h1 className="content-header">Our reviews</h1>
            <div className="reviews-card">
                
              {reviews.map((review) => (
                
                <div className="review-item" key={review.id}>
                  <p className="review-title">Title: <span>{review.title}</span></p>
                  <img className="review-image" src={review.image} alt="my reviews" />
                  <p>Author: <span>{review.author}</span></p>
                  <p>Genre: <span>{review.genre}</span></p>
                  <p className="abstract">Abstract: <span>{review.abstract}</span></p>
                  <p>Language: <span>{review.language}</span></p>
                  <p>No Available: <span>{review.available_reviews}</span></p>
                  <button onClick={() => handleReservereview(review.id)} className="reserve-review">Reserve a review</button>


                </div>
                
              ))}
             
            </div> 
          </>
        )}
         
            <form id="registration-form" style={{display: 'none'}}>
                <label for="title">Title of review:</label>
                <input type="text" id="title" name="title" required/>

                <label for="author">Author:</label>
                <input type="text" id="author" name="author" required />

                <label for="publication_year">Publication Year:</label>
                <input type="number" id="publication_year" name="publication_year" required/>

                <label for="isbn">ISBN:</label>
                <input type="text" id="isbn" name="isbn"/>

                <label for="card_number">Library Card Number:</label>
                <input type="text" id="card_number" name="card_number" required />

                <label for="reviewing_date">Date of reviewing:</label>
                <input type="date" id="reviewing_date" name="reviewing_date" required />

                <label for="return_date">Expected Date of Return:</label>
                <input type="date" id="return_date" name="return_date" required />

                <label for="notes">Additional Notes/Comments:</label>
                <textarea id="notes" name="notes"></textarea>

                <button type="submit" onClick={() => {showRegistrationForm(false)
                alert('Your review has been reserved. Thank You!')
                }} >Submit</button>
            </form>

            
            {showhotels && (
          <>
            <h1 className="content-header">Our hotels</h1>
            <div className="reviews-card">
            {hotels.map(space => (
                <div className="review-item">
                    <img  className="review-image" src={space.image} alt="my reviews" />
                    <p>{space.space_type}</p>
                    <p>Location: {space.location}</p>
                    <p>Capacity: {space.capacity}</p>
                    <button onClick={handleReserveSpace} className="reserve-review">review a Space</button>
                </div>
            ))}
            </div>
        </>
            )}

                    <form id="space-form" style={{display: 'none'}}>
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" required/>

                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required/>

                    <label for="phone">Phone:</label>
                    <input type="tel" id="phone" name="phone" required/>

                    <label for="date">Date:</label>
                    <input type="date" id="date" name="date" required/>

                    <label for="start-time">Start Time:</label>
                    <input type="time" id="start-time" name="start-time" required/>

                    <label for="end-time">End Time:</label>
                    <input type="time" id="end-time" name="end-time" required/>

                    <label for="num-people">Number of People:</label>
                    <input type="number" id="num-people" name="num-people" required/>

                    <button type="submit" value='review' onClick={() => {showRegistrationSpaceForm(false)
                alert('Your Space has been reserved. Thank You!')
                }} >Submit</button>
                    </form >

            
                {showPeriodicals && (
          <>
          <h1 className="content-header">Periodicals</h1>
          <div className="reviews-card">
            {periodicals.map(periodical => (
                <div className="review-item">
                    <img  className="review-image" src={periodical.image} alt="my reviews" />
                    <p>Title: {periodical.title}</p>
                    <p>Editor: {periodical.editor}</p>
                    <p  className="abstract">Description: {periodical.description}</p>
                    <p>Genre: {periodical.genre}</p>
                    <button onClick={handleReservePeriodical} className="reserve-review">Reserve a review</button>
                </div>
                
            ))}
            </div>
            </>
            )}
            <form id="periodicals-form" style={{display: 'none'}}>
                <label for="title">Title of review:</label>
                <input type="text" id="title" name="title" required/>

                <label for="author">Author:</label>
                <input type="text" id="author" name="author" required />

                <label for="publication_year">Publication Year:</label>
                <input type="number" id="publication_year" name="publication_year" required/>

                <label for="isbn">ISBN:</label>
                <input type="text" id="isbn" name="isbn"/>

                <label for="card_number">Library Card Number:</label>
                <input type="text" id="card_number" name="card_number" required />

                <label for="reviewing_date">Date of reviewing:</label>
                <input type="date" id="reviewing_date" name="reviewing_date" required />

                <label for="return_date">Expected Date of Return:</label>
                <input type="date" id="return_date" name="return_date" required />

                <label for="notes">Additional Notes/Comments:</label>
                <textarea id="notes" name="notes"></textarea>

                <button type="submit" onClick={() => {showRegistrationForm(false)
                alert('Your Periodical-review has been reserved. Thank You!')
                }} >Submit</button>
            </form>
            
        </>    
    )
    
            }

export default Services;