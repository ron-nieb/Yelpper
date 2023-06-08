import React from 'react'

import "../css/home.css"
import Reviews from './Reviews';


export default function Home() {
    return (
        <>
            <div className="container-fluid">
                <div className='row'>
                    <div className='col-md-12'>
                    <div id='cover'>
                   
                   <div id="coverimg">
                       
                       <h1>The Perfect Hotel Reviews</h1>
                       <p>We have reviews from over 100000+ users</p>
                       <a href="#topreview" role="button" className="btn btn-warning btn-lg">Top Review</a>
                   </div>
                   
               </div>
                    </div>
                </div>
                <h1>Top Reviews</h1>
                {/* <Reviews /> */}
            </div>
        </>
    )
}