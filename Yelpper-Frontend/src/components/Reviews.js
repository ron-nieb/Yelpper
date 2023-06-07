import React  from "react";
import { useState,useEffect } from "react";


function Services() {
    const [reviews , setreviews] = useState([])
    const [showreviews, setShowreviews] = useState(false);


    useEffect(() => {
            fetch('http://localhost:3000/reviews')
            .then(res => res.json())
            .then(data => setreviews(data))
        }, []);
   
  

        const handleShowreviews = () => {
            
            return {
                reviews.map((review) =>{
                    <>
                    <div class="card" style="width: 18rem;">
                        <img class="card-img-top" src={review.image} alt="Card image cap"></img>
                            <div class="card-body">
                                <h5 class="card-title">{review.user}</h5>
                                <p class="card-text">{review.Review}}</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                    </div>
                </>
                })
            }
          }