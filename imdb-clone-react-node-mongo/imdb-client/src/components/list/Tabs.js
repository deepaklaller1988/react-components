import axios from "axios";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { FaStar } from "react-icons/fa";
import Card from "react-bootstrap/Card";
import User from "../../context/User";

export default function Tabs(props) {
  const [watchlist, setWatchlist] = useState([]);
  const [userId, setUserId] = useState();

  useEffect(() => {
    async function getLoggedIn(){
      if(User.isLoggedIn){
        console.log("first", )
        fetch(
          `http://localhost:8080/api/movies?category=${props.category}&id=${User.id}`, {credentials: 'include'}
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data)
          setWatchlist(data)});
    } 
    }
    getLoggedIn()
  }, [props]);

  const addToWishlist = async (movieId) => {
    // let user = JSON.parse(localStorage.getItem("users"));
    try {
      const data = {
        userId: User.id,
        movieId,
      };
      const url = "http://localhost:8080/api/add-to-wishlist";
      const { data: res } = await axios.post(url, data);
      console.log(res);
      if(res==="Already Added"){
        alert("Already Added to wishlist")
      }
      // setPopularMovies(res)
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromWishlist = async (deleteId) => {

    const data = {
      userId: User.id,
      deleteId,
    };
   const url = `http://localhost:8080/api/movies/delete-from-wishlist`;
   const { data: res } = await axios.post(url, data);
  setWatchlist(res);
  };
  return (
    <div className="mt-5 ">
      <div className="mt-5 px-5 mb-5 d-flex gap-3 flex-row justify-content-around flex-wrap">
        {watchlist &&
          watchlist.map((items) => {
            return (
              <div className="mb-5" key={items.id}>
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
                    <FaStar /> {items.rating}
                    </Card.Text>
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
      </div>
    </div>
  );
}
