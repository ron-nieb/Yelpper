import React, { useState } from "react";
import axios from "axios";

export default function Navbar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3000/hotels?q=${searchTerm}`);
      const results = response.data;
      setSearchResults(results);
      setSearchTerm("");
    } catch (error) {
      console.error("Error searching hotels:", error);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          Yelpper
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#reviews">
                Reviews
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Link
              </a>
            </li>
          </ul>
          <form
            className="navbar-form my-2 my-lg-0 d-flex pl-5"
            onSubmit={handleSearch}
          >
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="search-results">
          <div className="container">
            <div className="row">
              {searchResults.map((result) => (
                <div className="col-md-3" key={result.id}>
                  <div className="card mt-2">
                    <img
                      src={result.image}
                      alt={result.name}
                      className="card-img-top"
                      style={{width: '90%'}}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{result.name}</h5>
                      <p className="card-text">{result.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}