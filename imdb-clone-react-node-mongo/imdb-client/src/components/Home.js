import React, { useEffect, useState } from "react";
import "./home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import data from "../api.json";
import { FaStar } from "react-icons/fa";
import Section from "./Section";
import axios from "axios";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect( () => {
    // setPopularMovies(data.results.slice(0, 5));

    fetch("http://localhost:8080/api/", {credentials: 'include'})
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPopularMovies(data.slice(0, 5));
      });
  }, []);

  return (
    <>
      <div className="poster">
        <Carousel
          showThumbs={false}
          autoPlay={true}
          transitionTime={3}
          infiniteLoop={true}
          showStatus={false}
        >
          {popularMovies.map((movie) => {
            return (
              <Link
              key={movie.id}
                style={{ textDecoration: "none", color: "white" }}
                to={`/movie/${movie.id}`}
              >
                <div className="posterImage" key={movie.id}>
                  <img
                    src={`https://image.tmdb.org/t/p/original${
                      movie && movie.backdrop_path
                    }`}
                    alt=""
                  />
                </div>
                <div className="posterImage__overlay">
                  <div className="posterImage__title">
                    {movie ? movie.original_title : ""}
                  </div>
                  <div className="posterImage__runtime">
                    {movie ? movie.release_date : ""}
                    <span className="posterImage__rating">
                      {/* <img src="./images/star.png" alt="star" /> */}
                      <FaStar /> {movie ? ` ${movie.rating}` : ""}
                    </span>
                  </div>
                  <div className="posterImage__description">
                    {movie ? movie.overview : ""}
                  </div>
                </div>
              </Link>
            );
          })}
        </Carousel>
        <div>
          <Section />
        </div>
      </div>
    </>
  );
};

export default Home;
