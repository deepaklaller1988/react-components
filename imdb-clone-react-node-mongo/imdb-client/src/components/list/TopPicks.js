import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../../App.css";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import AuthContext from "../../context/AuthContext";
import User from "../../context/User";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide: 5, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

function TopPicks(props) {
  const [popularMovies, setPopularMovies] = useState([]);
  // const [userInfo, setUserInfo] = useState();
  const {userInfo, getLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    async function getLoggedIn(){
      // const {data: res} = await axios.get("http://localhost:8080/api/user");
    if(User.isLoggedIn){
      console.log("first", )
      fetch(
        `http://localhost:8080/api/movies?category=${props.category}&id=${User.id}`, {credentials: 'include'}
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setPopularMovies(data)});
    } 
    else{
      fetch(
        `http://localhost:8080/api/movies?category=${props.category}`, {credentials: 'include'}
      )
        .then((res) => res.json())
        .then((data) => setPopularMovies(data));

    }
  }
    getLoggedIn();
  }, []);


  const addToWishlist = async (movieId) => {

    if(User.isLoggedIn){
    try {
      const data = {
        userId: User.id,
        movieId,
      };
      const url = "http://localhost:8080/api/add-to-wishlist";
      const { data: res } = await axios.post(url, data);
      if(res==="Already Added"){
        alert("Already Added to wishlist")
      }
    } catch (error) {
      console.log(error);
    }}
    else{
      alert("Login First")
    }
  };

  const removeFromWishlist = async (deleteId) => {
    const data = {
      userId: User.id,
      deleteId,
    };
   const url = `http://localhost:8080/api/movies/delete-from-wishlist`;
   const { data: res } = await axios.post(url, data);
   setPopularMovies(res);
  };

  if(props.category === "wishlist" && !User.isLoggedIn){
    return (
      <>
      <span className="d-inline mt-3">
          <p className="text-white-50 fw-semibold fs-5">
          <Link to="/login"> Sign In to access your Watchlist</Link>{" "}
           
          </p>
        </span>
      </>
    )
  }

  return (
    <div>
      <Carousel
        swipeable={false}
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        // autoPlay={this.props.deviceType !== "mobile" ? true : false}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        // deviceType={this.props.deviceType}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {popularMovies.length > 0 &&
          popularMovies.map((items) => {
            return (
              <div key={items.id}>
                <Card style={{ width: "20rem" }}>
                  <Card.Img
                    variant="top"
                    src={`https://image.tmdb.org/t/p/original${
                      items && items.poster_path
                    }`}
                  />
                  <Card.Body className="bg-black bg-gradient text-white">
                    <Card.Title
                      style={{
                        color: "#ffc107",
                      }}
                    >
                      {items.title.length > 25
                        ? `${items.title.slice(0, 23)}...`
                        : items.title}{" "}
                    </Card.Title>
                    <Card.Text>
                      {items.overview.length > 70
                        ? `${items.overview.slice(0, 66)}...`
                        : items.overview}
                    </Card.Text>
                    <Button
                      variant="outline-warning"
                      onClick={() => {props.category === "wishlist" ? removeFromWishlist(items._id) : addToWishlist(items._id);}}
                    >
                     {props.category === "wishlist" ? "Delete from Wishlist" : "Add to Wishlist"} 
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
      </Carousel>
    </div>
  );
}

export default TopPicks;
