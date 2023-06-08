import React from 'react'

import "../css/home.css"
import Reviews from './Reviews';
import Hotel from './Hotel';

export default function Home() {
    return (
        <>
            <div className="container-fluid">
                <div className='row'>
                    <div className='col-md-12'>
                    <div id='cover'>
                   
                   <div id="coverimg">
                       
                       <h1>The Perfect Restaurant Reviews</h1>
                       <p>We have reviews from over 100000+ users</p>
                       <a href="#topreview" role="button" className="btn btn-warning btn-lg">Top Review</a>
                   </div>
                   
               </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-12'>
                    <h1>Top Reviews</h1>
                    <Reviews />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-12'>
                    <h1>Top Restaurant</h1>
                    <Hotel />
                    </div>
                </div>

            </div>
        </>
    )
}